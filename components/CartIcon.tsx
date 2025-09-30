"use client"
import useStore from '@/store';
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'

const CartIcon = () => {
  const { items } = useStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    const currentCount = items?.length || 0;
    if (currentCount > prevCountRef.current) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    prevCountRef.current = currentCount;
  }, [items?.length]);

  const itemCount = items?.length || 0;
  const hasItems = itemCount > 0;

  return (
    <Link 
      href={"/cart"} 
      className="group relative p-2 rounded-xl hover:bg-blue-50 transition-all duration-300"
    >
      {/* Cart icon container */}
      <div className="relative">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-shop-royal-blue/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
        
        {/* Shopping bag icon */}
        <ShoppingBag 
          className={`w-6 h-6 relative z-10 text-gray-700 group-hover:text-shop-royal-blue transition-all duration-300 ${
            isAnimating ? 'animate-bounce' : ''
          } ${hasItems ? 'group-hover:scale-110' : 'group-hover:scale-105'}`}
        />

        {/* Ripple effect when item added */}
        {isAnimating && (
          <>
            <span className="absolute inset-0 rounded-full bg-shop-royal-blue/30 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-shop-royal-blue/20 animate-ping" style={{animationDelay: '0.2s'}} />
          </>
        )}
      </div>

      {/* Item count badge */}
      {hasItems && (
        <span 
          className={`absolute -top-0.5 -right-0.5 z-20 ${
            isAnimating ? 'animate-bounce' : ''
          }`}
        >
          <span className="relative flex items-center justify-center">
            {/* Pulsing background ring */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-shop-royal-blue/40 animate-ping" />
            
            {/* Badge with gradient */}
            <span className="relative inline-flex items-center justify-center bg-gradient-to-br from-shop-btn-dark-blue to-shop-royal-blue text-white min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-bold shadow-lg ring-2 ring-white">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          </span>
        </span>
      )}

      {/* Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30">
        <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
          {hasItems ? `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in cart` : 'Your cart is empty'}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45" />
        </div>
      </div>

      {/* New item indicator */}
      {isAnimating && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full shadow-lg z-20">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 animate-ping" />
        </div>
      )}
    </Link>
  )
}

export default CartIcon