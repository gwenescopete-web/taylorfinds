import { productType } from '@/constants/data'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'

interface Props {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({selectedTab, onTabSelect}:Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 rounded-xl border border-gray-200/50 shadow-sm">
        <div className="flex items-center flex-wrap gap-2.5 text-sm font-semibold flex-1">
            {productType?.map((item)=>(
                <button 
                    onClick={()=> onTabSelect(item?.title)} 
                    key={item?.title} 
                    className={`
                        relative px-5 py-2.5 rounded-full
                        transition-all duration-300 ease-out
                        border-2 font-medium
                        ${selectedTab === item?.title 
                            ? "bg-shop-royal-blue text-white border-shop-royal-blue shadow-lg shadow-shop-royal-blue/30 scale-105" 
                            : "bg-white text-gray-700 border-gray-200 hover:border-shop-royal-blue hover:text-shop-royal-blue hover:shadow-md hover:scale-105"
                        }
                    `}
                >
                    <span className="relative z-10">{item?.title}</span>
                    {selectedTab === item?.title && (
                        <span className="absolute inset-0 rounded-full bg-shop-royal-blue/20 animate-pulse" />
                    )}
                </button>
            ))}
        </div>
        
        <Link 
            href="/shop" 
            className="group relative px-5 py-2.5 rounded-full border-2 border-shop-midnight-blue/30 bg-white text-gray-700 font-semibold text-sm transition-all duration-300 hover:bg-shop-royal-blue hover:border-shop-royal-blue hover:text-white hover:shadow-lg hover:scale-105 overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                See all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-shop-royal-blue to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
    </div>
  )
}

export default HomeTabBar