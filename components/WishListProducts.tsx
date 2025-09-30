"use client"

import useStore from '@/store'
import React, { useState } from 'react'
import Container from './Container'
import { Heart, X, ShoppingBag, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Product } from '@/sanity.types'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PriceFormatter from './PriceFormatter'
import AddToCartButton from './AddToCartButton'

const WishListProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(7)
    const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore()
    
    const loadMore = () => {
        setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length))
    }
    
    const handleResetWishlist = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset your wishlist?"
        )
        if (confirmReset) {
            resetFavorite()
            toast.success("Wishlist reset successfully")
        }
    }

    return (
        <Container>
            {favoriteProduct?.length > 0 ? (
                <div className="space-y-6">
                    {/* Header Stats */}
                    <div className="bg-gradient-to-r from-shop-light-bg/50 to-shop-royal-blue/5 rounded-xl p-6 border border-shop-light-bg shadow-sm">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Heart className="h-8 w-8 text-shop-royal-blue fill-shop-royal-blue" />
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-shop-btn-dark-blue text-white text-xs rounded-full flex items-center justify-center font-semibold">
                                        {favoriteProduct.length}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-darkColor">My Wishlist</h2>
                                    <p className="text-sm text-lightColor">
                                        {favoriteProduct.length} {favoriteProduct.length === 1 ? 'item' : 'items'} saved
                                    </p>
                                </div>
                            </div>
                            
                            <Button 
                                onClick={handleResetWishlist} 
                                variant="destructive"
                                className="group flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                            >
                                <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                                Clear All
                            </Button>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-shop-light-bg/30 to-shop-royal-blue/5 border-b-2 border-shop-royal-blue/20">
                                        <th className="p-4 text-left text-xs font-bold text-darkColor/80 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="p-4 text-left text-xs font-bold text-darkColor/80 uppercase tracking-wider hidden md:table-cell">
                                            Category
                                        </th>
                                        <th className="p-4 text-left text-xs font-bold text-darkColor/80 uppercase tracking-wider hidden lg:table-cell">
                                            Type
                                        </th>
                                        <th className="p-4 text-left text-xs font-bold text-darkColor/80 uppercase tracking-wider hidden lg:table-cell">
                                            Status
                                        </th>
                                        <th className="p-4 text-left text-xs font-bold text-darkColor/80 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="p-4 text-center text-xs font-bold text-darkColor/80 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favoriteProduct?.slice(0, visibleProducts)?.map((product: Product, index) => (
                                        <tr 
                                            key={product?._id} 
                                            className="group border-b border-gray-100 hover:bg-shop-light-bg/20 transition-all duration-200"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            {/* Product Info */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => {
                                                            removeFromFavorite(product?._id)
                                                            toast.success("Removed from wishlist")
                                                        }}
                                                        className="flex-shrink-0 p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-110"
                                                        aria-label="Remove from wishlist"
                                                    >
                                                        <X size={18} />
                                                    </button>

                                                    {/* Product Image */}
                                                    {product?.images && (
                                                        <Link 
                                                            href={`/product/${product?.slug?.current}`}
                                                            className="relative flex-shrink-0 border-2 border-transparent hover:border-shop-royal-blue/30 rounded-lg overflow-hidden group/image transition-all duration-300 shadow-sm hover:shadow-md"
                                                        >
                                                            <Image
                                                                src={urlFor(product?.images[0]).url()}
                                                                alt={product?.name || "product"}
                                                                width={80}
                                                                height={80}
                                                                className="h-20 w-20 object-contain group-hover/image:scale-110 transition-transform duration-300"
                                                            />
                                                        </Link>
                                                    )}

                                                    {/* Product Name */}
                                                    <Link 
                                                        href={`/product/${product?.slug?.current}`}
                                                        className="flex-1 min-w-0"
                                                    >
                                                        <p className="font-semibold text-darkColor line-clamp-2 hover:text-shop-royal-blue transition-colors">
                                                            {product?.name}
                                                        </p>
                                                    </Link>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="p-4 hidden md:table-cell">
                                                {product?.categories && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {product.categories.slice(0, 2).map((cat, idx) => (
                                                            <span 
                                                                key={idx}
                                                                className="px-2 py-1 bg-shop-light-bg/50 text-xs font-medium text-darkColor rounded-full"
                                                            >
                                                                {cat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Type */}
                                            <td className="p-4 capitalize text-sm text-lightColor hidden lg:table-cell">
                                                {product?.variant || "—"}
                                            </td>

                                            {/* Stock Status */}
                                            <td className="p-4 hidden lg:table-cell">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                                    (product?.stock as number) > 0
                                                        ? "bg-green-50 text-green-700 border border-green-200"
                                                        : "bg-red-50 text-red-700 border border-red-200"
                                                }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${
                                                        (product?.stock as number) > 0 ? "bg-green-500" : "bg-red-500"
                                                    }`} />
                                                    {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="p-4">
                                                <div className="font-bold text-shop-btn-dark-blue">
                                                    <PriceFormatter amount={product?.price} />
                                                </div>
                                            </td>

                                            {/* Add to Cart */}
                                            <td className="p-4">
                                                <AddToCartButton 
                                                    product={product} 
                                                    className="w-full md:w-auto shadow-sm hover:shadow-md transition-shadow" 
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Load More/Less Buttons */}
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        {visibleProducts < favoriteProduct?.length && (
                            <Button 
                                onClick={loadMore}
                                variant="outline"
                                className="group flex items-center gap-2 px-6 shadow-sm hover:shadow-md hover:border-shop-royal-blue transition-all"
                            >
                                Load More
                                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                            </Button>
                        )}
                        {visibleProducts > 7 && (
                            <Button 
                                onClick={() => setVisibleProducts(7)} 
                                variant="outline"
                                className="group flex items-center gap-2 px-6 shadow-sm hover:shadow-md hover:border-shop-royal-blue transition-all"
                            >
                                Show Less
                                <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                // Empty State
                <div className="flex min-h-[500px] flex-col items-center justify-center px-4 text-center">
                    <div className="relative mb-8">
                        {/* Animated Background Rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-32 w-32 rounded-full bg-shop-royal-blue/5 animate-pulse" />
                            <div className="absolute h-24 w-24 rounded-full bg-shop-royal-blue/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </div>
                        
                        {/* Heart Icon */}
                        <div className="relative z-10 p-8 rounded-full bg-gradient-to-br from-shop-light-bg/50 to-shop-royal-blue/10 shadow-lg">
                            <Heart
                                className="h-16 w-16 text-shop-royal-blue"
                                strokeWidth={1.5}
                            />
                        </div>
                        
                        {/* Ping Animation */}
                        <div className="absolute -top-2 -right-2 h-6 w-6 animate-ping rounded-full bg-shop-royal-blue/30" />
                    </div>

                    <div className="space-y-3 mb-8 max-w-md">
                        <h2 className="text-3xl font-bold tracking-tight text-darkColor">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-base text-lightColor leading-relaxed">
                            Start adding items you love to your wishlist and keep track of products you want to purchase later.
                        </p>
                    </div>

                    <Button 
                        asChild 
                        size="lg"
                        className="group shadow-lg hover:shadow-xl transition-all"
                    >
                        <Link href="/shop" className="flex items-center gap-2">
                            <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                            Start Shopping
                        </Link>
                    </Button>
                </div>
            )}
        </Container>
    )
}

export default WishListProducts;