// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'


export const supabaseClient = () =>
createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


export const supabaseServer = () => {
    const cookieStore = cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name: string) => cookieStore.get(name)?.value,
                set: (name: string, value: string, options: CookieOptions) => {
                    cookieStore.set({ name, value, ...options })
                },
                remove: (name: string, options: CookieOptions) => {
                    cookieStore.set({ name, value: '', ...options })
                }
            }
        }
    )
}