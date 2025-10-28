'use client'
import { useTransition } from 'react'


export default function AddToCart({ productId }: { productId: number }) {
const [pending, start] = useTransition()
return (
<button
onClick={() => start(async () => {
await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId, action: 'add', qty: 1 }) })
})}
className="px-4 py-2 rounded-xl border"
disabled={pending}
>{pending ? 'Adding…' : 'Add to Cart'}</button>
)
}