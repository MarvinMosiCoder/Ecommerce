import { cookies } from 'next/headers'
import { supabaseServer } from '@/lib/supabase'


export default async function CartPage() {
const cartId = cookies().get('cart_id')?.value
const supabase = supabaseServer()
if (!cartId) return <div>Your cart is empty.</div>


const { data: items } = await supabase
.from('cart_items')
.select('id, qty, product:products(id,title,price_cents,image_url)')
.eq('cart_id', cartId)


const total = items?.reduce((s, it) => s + it.qty * it.product.price_cents, 0) ?? 0


return (
<main className="space-y-4">
{(items?.length ?? 0) === 0 ? <div>Empty.</div> : items!.map(it => (
<div key={it.id} className="flex items-center gap-4 border rounded-2xl p-3">
{/* eslint-disable-next-line @next/next/no-img-element */}
{it.product.image_url && <img src={it.product.image_url} alt="" className="w-16 h-16 object-cover rounded-xl" />}
<div className="flex-1">
<div className="font-medium">{it.product.title}</div>
<div className="text-sm opacity-70">${'{'}(it.product.price_cents/100).toFixed(2){'}'} × {it.qty}</div>
</div>
</div>
))}
<div className="text-right text-lg font-semibold">Total: ${'{'}(total/100).toFixed(2){'}'}</div>
<a className="inline-block px-4 py-2 rounded-xl border" href="/checkout">Checkout</a>
</main>
)
}