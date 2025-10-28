import { cookies } from 'next/headers'
import { supabaseServer } from '@/lib/supabase'


export default async function CheckoutPage() {
const supabase = supabaseServer()
const { data: { user } } = await supabase.auth.getUser()
if (!user) return <div>Please log in to checkout.</div>


const cartId = cookies().get('cart_id')?.value
if (!cartId) return <div>No items.</div>


const { data: items } = await supabase
.from('cart_items')
.select('qty, product:products(id,title,price_cents)')
.eq('cart_id', cartId)


const total = items?.reduce((s, it) => s + it.qty * it.product.price_cents, 0) ?? 0


async function placeOrder() {
'use server'
const supabase = supabaseServer()
const { data: { user } } = await supabase.auth.getUser()
const cookieStore = cookies()
const cartId = cookieStore.get('cart_id')?.value
if (!user || !cartId) return
const { data: items } = await supabase
.from('cart_items')
.select('qty, product:products(id,title,price_cents)')
.eq('cart_id', cartId)


const total = items?.reduce((s, it) => s + it.qty * it.product.price_cents, 0) ?? 0


const { data: order } = await supabase
.from('orders')
.insert({ user_id: user.id, total_cents: total, status: 'pending' })
.select()
.single()


if (order && items) {
await supabase.from('order_items').insert(items.map(it => ({
order_id: order.id,
product_id: it.product.id,
title: it.product.title,
price_cents: it.product.price_cents,
qty: it.qty
})))
await supabase.from('cart_items').delete().eq('cart_id', cartId)
}
}


return (
<form action={placeOrder} className="space-y-4">
<div>Total: ${'{'}(total/100).toFixed(2){'}'}</div>
<button className="px-4 py-2 rounded-xl border">Place Order</button>
<p className="text-sm opacity-70">(Payment gateway can be added later with Stripe.)</p>
</form>
)
}