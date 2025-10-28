import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseServer } from '@/lib/supabase-client'
import { randomUUID } from 'node:crypto'


type Body = { productId: number; action: 'add'|'remove'; qty?: number }


export async function POST(req: Request) {
const { productId, action, qty = 1 } = await req.json() as Body
const cookieStore = cookies()
let cartId = cookieStore.get('cart_id')?.value
const supabase = supabaseServer()
const { data: { user } } = await supabase.auth.getUser()


if (!cartId) {
cartId = randomUUID()
await supabase.from('carts').insert({ id: cartId, user_id: user?.id ?? null })
cookieStore.set('cart_id', cartId, { httpOnly: true, path: '/', maxAge: 60*60*24*30 })
}


if (action === 'add') {
// upsert cart item
const { data: existing } = await supabase.from('cart_items').select('*').eq('cart_id', cartId).eq('product_id', productId).maybeSingle()
if (existing) {
await supabase.from('cart_items').update({ qty: existing.qty + qty }).eq('id', existing.id)
} else {
await supabase.from('cart_items').insert({ cart_id: cartId, product_id: productId, qty })
}
} else if (action === 'remove') {
await supabase.from('cart_items').delete().eq('cart_id', cartId).eq('product_id', productId)
}


return NextResponse.json({ ok: true })
}