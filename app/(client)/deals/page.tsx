import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { getDealProducts } from '@/sanity/queries'
import { Flame, TrendingDown, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const DealPage = async() => {
    const products = await getDealProducts();
    
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-16">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <Container className="relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-full shadow-lg mb-6 animate-bounce">
                        <Flame className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wider">Limited Time Only</span>
                        <Sparkles className="w-5 h-5" />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 mb-4 tracking-tight">
                        Hot Deals of the Week
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Unbeatable prices on your favorite products. Grab them before they&apos;re gone!
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                            <TrendingDown className="w-5 h-5 text-red-500" />
                            <span className="text-sm font-semibold text-gray-700">Up to 70% OFF</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                            <Clock className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-semibold text-gray-700">Ends in 3 Days</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm font-semibold text-gray-700">{products?.length || 0} Deals Available</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center mb-12">
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
                    <Flame className="w-8 h-8 text-red-500 mx-4 animate-pulse" />
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                    {products?.map((product) => (
                        <div 
                            key={product?._id}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                        >
                            {/* Hot Deal Badge */}
                            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                <Flame className="w-3 h-3" />
                                <span>HOT</span>
                            </div>
                            
                            {/* Glow Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {(!products || products.length === 0) && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-6">
                            <Flame className="w-12 h-12 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Deals Available</h3>
                        <p className="text-gray-600">Check back soon for amazing offers!</p>
                    </div>
                )}

                {/* Call to Action Banner */}
                <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-8 lg:p-12 text-white shadow-2xl">
                    <div className="relative z-10 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Don&apos;t Miss Out!
                        </h2>
                        <p className="text-lg mb-6 opacity-90">
                            These deals won&apos;t last forever. Shop now and save big on premium products.
                        </p>
                        <Link 
                            href="/deals"
                            className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            Shop All Deals
                        </Link>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </Container>
        </div>
    )
}

export default DealPage