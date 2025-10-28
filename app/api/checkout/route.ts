import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'


export async function POST() {
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = supabaseServer()
const { data: { user } } = await supabase.auth.getUser()
if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
// 1) Load cart items + build line_items
// 2) Create order with status=pending
// 3) Create checkout session with success/cancel urls
// 4) Return session.url
return NextResponse.json({ todo: true })
}