"use client"
import { Category, Product } from '@/sanity.types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { client } from '@/sanity/lib/client';
import { AnimatePresence, motion } from 'motion/react'
import { Loader2, ChevronRight, Grid3x3, Package } from 'lucide-react';
import NoProductAvailable from './NoProductAvailable';
import ProductCard from './ProductCard';

interface Props {
    categories: Category[];
    slug: string
}

const CategoryProducts = ({categories, slug}:Props) => {
    const [currentSlug, setCurrentSlug] = useState(slug);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleCategoryChange = (newSlug: string) => {
        if (newSlug === currentSlug) return;
        setCurrentSlug(newSlug);
        router.push(`/category/${newSlug}`, { scroll: false })
    }

    const fetchProducts = async (categorySlug:string) => {
        setLoading(true)
        try {
            const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc) {..., "categories": categories[]->title}`;
            const data = await client.fetch(query, { categorySlug });
            setProducts(data)
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchProducts(currentSlug)
    },[currentSlug])

    const currentCategory = categories?.find(cat => cat?.slug?.current === currentSlug);

    return (
        <div className="py-8">
            {/* Header with category info */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-shop-midnight-blue rounded-lg">
                        <Grid3x3 className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {currentCategory?.title || 'All Products'}
                    </h2>
                </div>
                {currentCategory?.description && (
                    <p className="text-gray-600 text-sm ml-11">
                        {currentCategory.description}
                    </p>
                )}
                {!loading && products?.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 ml-11">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700">
                            {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-6">
                {/* Sidebar Categories */}
                <div className="w-full lg:w-64 lg:sticky lg:top-24">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Sidebar header */}
                        <div className="bg-gradient-to-r from-shop-midnight-blue to-blue-700 p-4">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                <Grid3x3 className="w-5 h-5" />
                                Categories
                            </h3>
                        </div>

                        {/* Category list */}
                        <div className="divide-y divide-gray-200">
                            {categories?.map((item, index)=>(
                                <motion.div
                                    key={item?._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Button 
                                        onClick={()=>handleCategoryChange(item?.slug?.current as string)} 
                                        className={`w-full bg-transparent border-0 rounded-none shadow-none font-semibold text-left justify-between group relative overflow-hidden transition-all duration-300 h-auto py-4 px-5 ${
                                            item?.slug?.current === currentSlug 
                                                ? "bg-gradient-to-r from-shop-midnight-blue to-blue-700 text-white" 
                                                : "text-gray-700 hover:bg-blue-50"
                                        }`}
                                    >
                                        {/* Active indicator bar */}
                                        {item?.slug?.current === currentSlug && (
                                            <motion.div
                                                layoutId="activeCategory"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        {/* Hover background */}
                                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                            item?.slug?.current === currentSlug && "hidden"
                                        }`} />

                                        <span className="relative flex items-center gap-3 capitalize text-base">
                                            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                item?.slug?.current === currentSlug 
                                                    ? "bg-white scale-100" 
                                                    : "bg-shop-midnight-blue/30 scale-75 group-hover:scale-100"
                                            }`} />
                                            {item?.title}
                                        </span>

                                        <ChevronRight 
                                            className={`relative w-5 h-5 transition-all duration-300 ${
                                                item?.slug?.current === currentSlug 
                                                    ? "translate-x-0 opacity-100" 
                                                    : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                            }`}
                                        />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1 w-full">
                    {loading ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20 min-h-96 space-y-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-blue-300"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-shop-royal-blue/20 rounded-full blur-2xl animate-pulse" />
                                <Loader2 className="w-16 h-16 text-shop-royal-blue animate-spin relative" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-gray-800">Loading Products...</p>
                                <p className="text-sm text-gray-600">Please wait while we fetch the latest items</p>
                            </div>
                            {/* Loading skeleton */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl px-8">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl p-4 space-y-3 animate-pulse">
                                        <div className="h-40 bg-gray-200 rounded-lg" />
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : products?.length > 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                        >
                            <AnimatePresence mode="popLayout">
                                {products?.map((product:Product, index:number)=>(
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        layout
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <NoProductAvailable selectedTab={currentSlug} classname="mt-0 w-full" />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoryProducts