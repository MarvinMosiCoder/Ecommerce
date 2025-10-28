// app/page.tsx (Server Component)
import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function Page() {
  const supabase = await createSupabaseServerClient() // <-- await

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products?.map((p) => (
        <a key={p.id} href={`/product/${p.id}`} className="border rounded-2xl p-4">
          {p.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover rounded-xl" />
          )}
          <div className="mt-3 font-semibold">{p.title}</div>
          <div className="text-sm opacity-70">${(p.price_cents / 100).toFixed(2)}</div>
        </a>
      ))}
    </main>
  )
}
