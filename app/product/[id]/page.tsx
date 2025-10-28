import { supabaseServer } from '@/lib/supabase'
import AddToCart from '@/components/AddToCart'


export default async function ProductPage({ params }: { params: { id: string } }) {
const supabase = supabaseServer()
const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single()
if (!product) return <div>Not found</div>
return (
<main className="grid md:grid-cols-2 gap-8">
{/* eslint-disable-next-line @next/next/no-img-element */}
{product.image_url && <img src={product.image_url} alt={product.title} className="w-full rounded-2xl" />}
<div>
<h1 className="text-2xl font-bold">{product.title}</h1>
<p className="opacity-80 my-4">{product.description}</p>
<div className="text-xl font-semibold mb-4">${'{'}(product.price_cents/100).toFixed(2){'}'}</div>
<AddToCart productId={product.id} />
</div>
</main>
)
}