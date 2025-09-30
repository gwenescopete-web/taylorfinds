import React from 'react'
import { Title } from './ui/text'
import Link from 'next/link'
import Image from 'next/image'
import { banner_2} from '@/images'
import { ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'

const HomeBanner = () => {
  return (
    <div className="relative py-16 md:py-12 bg-gradient-to-br from-shop-bubbles via-blue-50 to-indigo-100 rounded-3xl px-10 lg:px-24 overflow-hidden shadow-xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}} />
      </div>

      {/* Decorative sparkles */}
      <div className="absolute top-8 right-1/4 opacity-60 animate-bounce" style={{animationDuration: '3s'}}>
        <Sparkles className="text-yellow-400 w-6 h-6" fill="currentColor" />
      </div>
      <div className="absolute bottom-12 left-1/3 opacity-50 animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
        <Sparkles className="text-pink-400 w-5 h-5" fill="currentColor" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {/* Content Section */}
        <div className="space-y-7 flex-1 z-10">
          {/* Decorative badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-200">
            <ShoppingBag className="w-4 h-4 text-shop-midnight-blue" />
            <span className="text-xs font-semibold text-shop-midnight-blue tracking-wide">
              PREMIUM SHOPPING EXPERIENCE
            </span>
          </div>

          {/* Main Title */}
          <div className="relative">
            <Title className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-shop-midnight-blue via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                &quot;WHERE YOUR CART
              </span>
              <br/>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-shop-midnight-blue via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  MEETS YOUR HEART.&quot;
                </span>
                {/* Underline decoration */}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </span>
            </Title>
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed">
            Discover amazing deals and shop with confidence. Your perfect purchase is just a click away.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link 
              href={"/shop"} 
              className="group relative bg-gradient-to-r from-shop-btn-dark-blue to-shop-midnight-blue text-white px-8 py-4 rounded-2xl text-base font-bold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative flex items-center gap-2">
                SHOP NOW
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            {/* Secondary link */}
            <Link 
              href={"/deals"} 
              className="group text-shop-midnight-blue font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              View Hot Deals
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-3 h-3 text-white" fill="currentColor" />
              </div>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Free Shipping</p>
                <p className="text-sm font-bold text-gray-800">On Orders ₱1000</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Secure Payment</p>
                <p className="text-sm font-bold text-gray-800">100% Protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex-1 flex justify-center md:justify-end z-10">
          <div className="relative group">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500 scale-75 group-hover:scale-100" />
            
            {/* Image container */}
            <div className="relative">
              <Image 
                src={banner_2} 
                alt="banner_2" 
                className="hidden md:inline-flex w-80 lg:w-96 drop-shadow-2xl transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
              />
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce" style={{animationDuration: '2s'}}>
                <p className="text-xs font-bold">HOT</p>
                <p className="text-lg font-black">50% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
    </div>
  )
}

export default HomeBanner