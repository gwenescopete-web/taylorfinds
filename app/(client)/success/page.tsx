"use client"

import useStore from '@/store'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Home, Package, ShoppingBag, Gift } from 'lucide-react'
import Link from 'next/link'

const SuccessPageContent = () => {
    const {resetCart} = useStore()
    const searchParams = useSearchParams()
    const session_id = searchParams.get("session_id")
    const orderNumber = searchParams.get("orderNumber")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if(session_id){
            resetCart()
        }
    },[session_id, resetCart])
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        {mounted && (
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 0.1}}
                transition={{duration: 1}}
                className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl">
                </motion.div>
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-indigo-200 to-pink-200 rounded-full blur-3xl">
                </motion.div>
            </motion.div>
        )}

        <motion.div 
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5}}
        className="bg-white/80 backdrop-blur-xl rounded-3xl flex flex-col gap-6 shadow-2xl p-8 max-w-2xl w-full text-center relative z-10 border border-white/20">
            


            {/* Success icon with animated rings */}
            <div className="relative mx-auto mb-2">
                <motion.div
                    initial={{scale:0, rotate: -180}}
                    animate={{scale: 1, rotate: 0}}
                    transition={{delay: 0.2, type: "spring", stiffness: 200, damping: 15}}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl relative z-10">
                        <Check className="text-white w-12 h-12 stroke-[3]" />
                </motion.div>
                
                {/* Animated rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{
                            scale: [0.8, 1.5, 2],
                            opacity: [0.5, 0.2, 0]
                        }}
                        transition={{
                            duration: 2,
                            delay: 0.3 + i * 0.3,
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                        className="absolute inset-0 rounded-full border-4 border-green-400">
                    </motion.div>
                ))}
            </div>

            <motion.h1 
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3}}
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Order Confirmed! 🎉
            </motion.h1>
            
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.4}}
                className="text-gray-600 text-lg">
                Your order has been successfully placed
            </motion.p>

            <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-4 text-left border border-blue-100">
                <div className="flex items-start gap-3">
                    <Gift className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">
                        Thank you for your purchase! We&apos;re excited to get your order ready. You&apos;ll receive a confirmation email with tracking details shortly.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-blue-200">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Order Number</p>
                        <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {orderNumber}
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6}}
                className="pt-4">
                <p className="text-sm text-gray-500 mb-4">What would you like to do next?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link
                     href="/"
                     className="group relative overflow-hidden flex items-center justify-center px-6 py-4 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <Home className="w-5 h-5 mr-2 relative z-10" />
                        <span className="relative z-10">Home</span>
                    </Link>
                    <Link
                     href="/orders"
                     className="group relative overflow-hidden flex items-center justify-center px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <Package className="w-5 h-5 mr-2 relative z-10" />
                        <span className="relative z-10">My Orders</span>
                    </Link>
                    <Link
                     href="/shop"
                     className="group relative overflow-hidden flex items-center justify-center px-6 py-4 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <ShoppingBag className="w-5 h-5 mr-2 relative z-10" />
                        <span className="relative z-10">Continue Shopping</span>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    </div>
  )
}

const SuccessPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    )
}

export default SuccessPage