// lib/supabase-server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options) => {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // cookies() is read-only in some contexts
          }
        },
        remove: (name: string) => {
          try {
            cookieStore.delete(name)
          } catch {
            // safe no-op
          }
        },
      },
    }
  )

  return supabase
}
