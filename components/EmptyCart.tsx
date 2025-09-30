"use client"

import { ShoppingCart, Sparkles, ArrowRight, TrendingUp, Gift } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { emptyCart } from "@/images";
import Image from "next/image";

export default function EmptyCart() {
    return (
        <div className="min-h-[70vh] py-10 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl"
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full space-y-8 border border-gray-100"
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-bl-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-tr-full blur-2xl" />

                {/* Image section */}
                <div className="relative">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 3, -3, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative w-56 h-56 mx-auto"
                    >
                        <Image
                            src={emptyCart}
                            alt="Empty shopping cart"
                            layout="fill"
                            objectFit="contain"
                            className="drop-shadow-2xl"
                        />
                        
                        {/* Floating shopping cart icon */}
                        <motion.div
                            animate={{ 
                                x: [0, -15, 15, 0],
                                y: [0, -10, 10, 0],
                                rotate: [0, -10, 10, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3 shadow-xl"
                        >
                            <ShoppingCart size={28} className="text-white" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                            />
                        </motion.div>

                        {/* Floating sparkles */}
                        <motion.div
                            animate={{ 
                                y: [0, -20, 0],
                                rotate: [0, 360],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute top-8 -left-4"
                        >
                            <Sparkles className="text-yellow-400 w-6 h-6" fill="currentColor" />
                        </motion.div>
                        <motion.div
                            animate={{ 
                                y: [0, -15, 0],
                                rotate: [0, -360],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-12 -right-2"
                        >
                            <Sparkles className="text-pink-400 w-5 h-5" fill="currentColor" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Text content */}
                <div className="relative text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                            Your Cart is Empty
                        </h2>
                    </motion.div>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-600 leading-relaxed"
                    >
                        It looks like you haven&apos;t added anything to your cart yet.
                        Let&apos;s change that and find some amazing products for you!
                    </motion.p>
                </div>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3 relative"
                >
                    <Link 
                        href="/"
                        className="group relative block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 rounded-2xl text-base font-bold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        
                        <span className="relative flex items-center justify-center gap-2">
                            Start Shopping
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </Link>

                    <Link 
                        href="/deals"
                        className="group relative block bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-4 rounded-2xl text-base font-bold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        
                        <span className="relative flex items-center justify-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            View Hot Deals
                        </span>
                    </Link>
                </motion.div>

                {/* Feature badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200"
                >
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="font-medium">Free Shipping</span>
                    </div>
                    <div className="w-px h-8 bg-gray-300" />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Gift className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">Special Offers</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}