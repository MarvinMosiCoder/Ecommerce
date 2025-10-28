'use client'
import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-client'

const supabase = createSupabaseBrowserClient()


export default function LoginPage() {
const [email, setEmail] = useState('')
const [sent, setSent] = useState(false)
return (
<div className="max-w-sm mx-auto space-y-4">
<h1 className="text-xl font-semibold">Log in</h1>
<input className="w-full border rounded-xl p-2" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
<button
className="w-full border rounded-xl p-2"
onClick={async ()=>{ await createSupabaseBrowserClient().auth.signInWithOtp({ email }); setSent(true) }}
>Send magic link</button>
{sent && <p className="text-sm">Check your email.</p>}
</div>
)
}