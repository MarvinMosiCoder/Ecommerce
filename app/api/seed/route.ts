import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'


export async function POST() {
const supabase = supabaseServer()
await supabase.from('categories').upsert([{ id: 1, name: 'T‑Shirts' }, { id: 2, name: 'Mugs' }])
await supabase.from('products').upsert([
{ id: 1, title: 'Logo Tee', description: 'Soft cotton', price_cents: 1900, image_url: 'https://picsum.photos/seed/t/800/600', category_id: 1 },
{ id: 2, title: 'Coffee Mug', description: '11oz ceramic', price_cents: 1200, image_url: 'https://picsum.photos/seed/m/800/600', category_id: 2 }
])
return NextResponse.json({ ok: true })
}