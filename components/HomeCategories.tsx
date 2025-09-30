import React from 'react'
import { Title } from './ui/text'
import { Category } from '@/sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const HomeCategories = ({categories}:{categories: Category []}) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 border border-shop-midnight-blue/20 my-10 md:my-20 p-6 lg:p-8 rounded-xl shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <Title className="text-shop-midnight-blue">POPULAR CATEGORIES</Title>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {categories?.map((category)=> (
                <Link 
                    key={category?._id}
                    href={`/category/${category?.slug?.current}`}
                    className="group"
                >
                    <div className="bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 p-5 rounded-lg border border-gray-200 hover:border-shop-royal-blue transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-center gap-4">
                            {category?.image && (
                                <div className="relative overflow-hidden rounded-lg bg-white border-2 border-shop-royal-blue/20 group-hover:border-shop-royal-blue transition-all duration-300 w-20 h-20 flex-shrink-0 shadow-sm">
                                    <Image 
                                        src={urlFor(category?.image).url()} 
                                        alt={category?.title || "category"} 
                                        width={500} 
                                        height={500} 
                                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300" 
                                    />
                                </div>
                            )}
                            <div className="flex-1 space-y-1.5">
                                <h3 className="text-base font-bold text-gray-900 group-hover:text-shop-royal-blue transition-colors duration-300 line-clamp-1">
                                    {category?.title}
                                </h3>
                                <p className="text-sm text-gray-600"> 
                                    <span className="font-bold text-shop-midnight-blue">{category?.productCount || 0}</span>
                                    <span className="ml-1">
                                        {category?.productCount === 1 ? 'item' : 'items'} available
                                    </span>
                                </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-shop-royal-blue group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default HomeCategories