"use client"

import { Loader2, Search, X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Product } from '@/sanity.types'
import PriceView from './PriceView'
import AddToCartButton from './AddToCartButton'

const SearchBar = () => {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const fetchProducts = useCallback(async() => {
    if(!search){
      setProducts([])
      return
    }
    setLoading(true)
    try{
      const query = '*[_type == "product" && name match $search] | order(name asc)'
      const params ={ search: `${search}*` }
      const response = await client.fetch(query, params)
      setProducts(response)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts()
    }, 300)
    return () => clearTimeout(debounceTimer)
  }, [search, fetchProducts])

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5 h-5 hover:text-shop-royal-blue hoverEffect" />
      </DialogTrigger>
      <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-br from-white to-slate-50">
        <DialogHeader>
          <DialogTitle className="mb-1 text-2xl font-bold bg-gradient-to-r from-shop-midnight-blue to-shop-royal-blue bg-clip-text text-transparent">
            SEARCH YOUR FAVORITE ITEM HERE
          </DialogTitle>
          <div className="relative">
              <Input 
                placeholder="Search your product here..." 
                className="flex-1 rounded-lg py-6 pl-4 pr-24 border-2 border-slate-200 focus:border-shop-royal-blue transition-all shadow-sm" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <X onClick={()=>setSearch("")} className="w-4 h-4 absolute top-4 right-14 hover:text-red-600 hoverEffect cursor-pointer"/>
              )}
              <button type="button" className={`absolute right-1 top-1 bottom-1 w-12 flex items-center justify-center rounded-lg transition-all duration-200 ${search ? "bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue text-white shadow-md hover:shadow-lg" : "bg-slate-100 text-slate-400"}`}>
                <Search className="w-5 h-5"/>
              </button>
            </div>
        </DialogHeader>
        <div className="w-full h-full overflow-y-scroll border-2 border-slate-200 rounded-xl bg-white shadow-inner">
          <div>
            {loading ? (
              <p className="flex items-center justify-center px-6 py-10 gap-2 text-center text-shop-midnight-blue font-semibold"> 
                <Loader2 className="w-5 h-5 animate-spin"/>  
                Searching on progress...
              </p>
            ) : products.length ? (
              products?.map((product: Product) => (
                <div key={product?._id} className="bg-white hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 overflow-hidden border-b last:border-b-0 transition-all duration-200">
                  <div className="flex items-center p-3">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 border-2 border-slate-200 rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-all"
                      onClick={() => setShowSearch(false)}
                      >
                        {product?.images && (
                          <Image 
                            width={200}
                            height={200}
                            src={urlFor(product?.images[0]).url()} 
                            alt="productImage"
                            className="object-cover w-full h-full group-hover:scale-110 hoverEffect"/>
                        )}
                    </Link>
                    <div className="px-4 py-2 flex-grow">
                      <Link
                        href={`/product/${product?.slug?.current}`}
                        onClick={() => setShowSearch(false)}>
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1 hover:text-shop-royal-blue transition-colors">
                          {product?.name}
                        </h3>
                      </Link>
                      <PriceView 
                        price={product?.price}
                        discount={product?.discount}
                        className="md:text-lg"/>
                  </div>
                  <div className="w-60 mt-1">
                    <AddToCartButton 
                      product={product}/>
                  </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 font-semibold tracking-wide">
                {search && !loading ? (
                <div className="space-y-2">
                  <p className="text-slate-600">No results found for</p>
                  <p className="text-xl font-bold text-red-600 underline decoration-wavy">{search}</p>
                </div>
              ): (
                <div className="text-emerald-600 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8"/>
                  </div>
                  <p className="text-lg">Search your favorite products here</p>
                </div>
              )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar;