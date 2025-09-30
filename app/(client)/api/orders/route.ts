import { getMyOrders } from '@/sanity/queries'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json([])
    }

    const orders = await getMyOrders(userId)
    return NextResponse.json(orders || [])
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json([])
  }
}