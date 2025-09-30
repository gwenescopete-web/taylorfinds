"use client"

import { Package } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const OrdersIcon = ({ userId }: { userId: string | null }) => {
  const [orderCount, setOrderCount] = useState(0)

  useEffect(() => {
    if (userId) {
      // Fetch orders count
      fetch(`/api/orders?userId=${userId}`)
        .then(res => res.json())
        .then(data => setOrderCount(data.length || 0))
        .catch(() => setOrderCount(0))
    }
  }, [userId])

  return (
    <Link href="/orders" className="group relative hover:text-shop-royal-blue hoverEffect">
      <Package className="w-6 h-6" />
      {orderCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-shop-btn-dark-blue text-white h-4 w-4 rounded-full text-[10px] font-semibold flex items-center justify-center">
          {orderCount}
        </span>
      )}
    </Link>
  )
}

export default OrdersIcon