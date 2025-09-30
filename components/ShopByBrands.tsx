import React from 'react'
import { Title } from './ui/text'
import Link from 'next/link'
import { getAllBrands } from '@/sanity/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { GitCompareArrows, Headset, ShieldCheck, Truck, ArrowRight } from 'lucide-react'

const extraData = [
  {
    title: "Free Delivery",
    description: "Free Shipping over ₱1000",
    icon: <Truck size={45} />
  },
  {
    title: "Free Return",
    description: "We get it—sometimes it's just not the right fit. Return it for free, no stress.",
    icon: <GitCompareArrows size={45} />
  },
  {
    title: "Customer Support",
    description: "24/7 customer support",
    icon: <Headset size={45} />
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />
  }
];

const ShopByBrands = async() => {
    const brands = await getAllBrands()
  return (
    <div className="mb-10 lg:mb-20">
        {/* Main Brands Section */}
        <div className="bg-gradient-to-br from-shop-light-bg/60 via-white to-shop-light-bg/40 p-6 lg:p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-shop-light-bg">
            {/* Header */}
            <div className="flex items-center gap-5 justify-between mb-10 pb-6 border-b-2 border-shop-btn-dark-blue/10">
                <div>
                    <Title className="relative inline-block">
                        SHOP BY BRANDS
                        <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue rounded-full"></span>
                    </Title>
                </div>
                <Link 
                    href={"/shop"} 
                    className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-shop-btn-dark-blue hover:text-shop-royal-blue hoverEffect px-4 py-2 rounded-lg hover:bg-shop-light-bg/50"
                >
                    View All
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Brand Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {brands?.map((brand, index)=>(
                    <Link
                      key={brand?._id}
                      href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
                      className="group relative bg-white w-full h-28 flex items-center justify-center rounded-xl overflow-hidden hover:shadow-2xl shadow-lg shadow-shop-midnight-blue/10 hover:shadow-shop-royal-blue/20 hoverEffect border-2 border-transparent hover:border-shop-royal-blue/30 hover:-translate-y-1"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-shop-light-bg/0 to-shop-royal-blue/0 group-hover:from-shop-light-bg/20 group-hover:to-shop-royal-blue/10 transition-all duration-300"></div>
                        {brand?.image && (
                            <Image 
                                src={urlFor(brand?.image).url()} 
                                alt="brandImage" 
                                width={250} 
                                height={250} 
                                className="relative z-10 w-32 h-20 object-contain group-hover:scale-110 transition-transform duration-300 filter grayscale-[20%] group-hover:grayscale-0" 
                            />
                        )}
                    </Link>
                ))}
            </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 p-1">
                {extraData?.map((item, index)=>(
                    <div 
                        key={index} 
                        className="group relative flex items-center gap-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-shop-light-bg/40 hover:to-shop-royal-blue/5 transition-all duration-300 cursor-default"
                    >
                        {/* Decorative gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-shop-royal-blue/0 group-hover:to-shop-royal-blue/5 rounded-xl transition-all duration-300"></div>
                        
                        {/* Icon Container */}
                        <div className="relative z-10 flex-shrink-0">
                            <div className="relative">
                                <div className="absolute inset-0 bg-shop-royal-blue/10 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                <span className="relative inline-flex text-shop-btn-dark-blue group-hover:text-shop-royal-blue scale-100 group-hover:scale-90 hoverEffect">
                                    {item?.icon}
                                </span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10 text-sm flex-1">
                            <p className="text-darkColor/90 font-bold capitalize mb-1 group-hover:text-shop-btn-dark-blue transition-colors">
                                {item?.title}
                            </p>
                            <p className="text-lightColor text-xs leading-relaxed group-hover:text-darkColor/70 transition-colors">
                                {item?.description}
                            </p>
                        </div>

                        {/* Divider (hidden on last item in row) */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden lg:block lg:last:hidden"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ShopByBrands