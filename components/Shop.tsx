"use client"

import { BRANDS_QUERYResult, Category, Product } from '@/sanity.types'
import React, { useEffect, useState } from 'react'
import Container from './Container'
import { Title } from './ui/text'
import CategoryList from './shop/CategoryList'
import BrandList from './shop/BrandList'
import PriceList from './shop/PriceList'
import { useSearchParams } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { Loader2, RefreshCcw } from 'lucide-react'
import NoProductAvailable from './NoProductAvailable'
import ProductCard from './ProductCard'

interface Props {
    categories: Category[]
    brands: BRANDS_QUERYResult
}

const Shop = ({ categories, brands }:Props) => {
    const searchParams = useSearchParams()
    const brandParams = searchParams?.get("brand") 
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null)
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                let minPrice = 0
                let maxPrice = 10000
                if (selectedPrice) {
                    const [min, max] = selectedPrice.split("-").map(Number)
                    minPrice = min
                    maxPrice = max
                }
                const query = '*[_type == "product" && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id)) && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id)) && price >= $minPrice && price <= $maxPrice] | order(name asc) {...,"categories": categories[]->title}'
                const data = await client.fetch(query, {selectedCategory, selectedBrand, minPrice, maxPrice}, {next: {revalidate: 0}})
                setProducts(data)
            } catch (error) {
                console.log("Shop product fetching Error",error)
            } finally {
                setLoading(false)
            }
        }
        
        fetchProducts()
    }, [selectedCategory, selectedBrand, selectedPrice])
    
  return (
    <div className="border-t bg-gradient-to-br from-slate-50 to-white">
        <Container className="mt-5">
            <div className="sticky top-0 z-10 mb-5 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                    <Title className="text-lg uppercase tracking-wide bg-gradient-to-r from-shop-midnight-blue to-shop-royal-blue bg-clip-text text-transparent">
                        THIS IS WHERE YOUR CART MEETS YOUR HEART
                    </Title>
                    {(selectedCategory !== null ||
                      selectedBrand !== null ||
                      selectedPrice !== null) && (
                      <button onClick={() => {
                        setSelectedCategory(null)
                        setSelectedBrand(null)
                        setSelectedPrice(null)
                      }} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg">
                          <RefreshCcw className="w-4 h-4" />
                          Reset Filters
                      </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 border-t-2 border-t-shop-midnight-blue/30">
                <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r-2 border-r-shop-midnight-blue/30 scrollbar-hide bg-white rounded-lg shadow-sm p-4">
                    <CategoryList 
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    <BrandList
                        brands={brands}
                        selectedBrand={selectedBrand}
                        setSelectedBrand={setSelectedBrand}
                    />
                    <PriceList
                        setSelectedPrice={setSelectedPrice}
                        selectedPrice={selectedPrice}
                    />
                </div>
                <div className="flex-1 pt-5">
                    <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
                        {loading ? (
                            <div className="p-20 flex flex-col gap-3 items-center justify-center bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border-2 border-slate-200">
                                <div className="relative">
                                    <Loader2 className="w-12 h-12 text-shop-midnight-blue animate-spin" />
                                    <div className="absolute inset-0 w-12 h-12 bg-shop-royal-blue/20 rounded-full animate-ping"></div>
                                </div>
                                <p className="font-semibold tracking-wide text-base text-slate-700">
                                    Product is loading...
                                </p>
                            </div>
                        ) : products?.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                                {products?.map((product)=>(
                                    <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                                ) : (
                                    <NoProductAvailable classname="bg-gradient-to-br from-white to-slate-50 mt-0 rounded-xl shadow-lg border-2 border-slate-200" />
                                )}
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Shop;