"use client"

import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import React, { useState } from 'react'

interface Props {
    images?: Array<{
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
        _key: string;
    }>
    isStock?: number | undefined
}

const ImageView = ({ images = [], isStock }: Props) => {
    const [active, setActive] = useState(images[0])
  return (
    <div className="w-full md:w-1/2 space-y-3 md:space-y-5">
        {/* Out of Stock Badge */}
        {isStock === 0 && (
            <div className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg inline-flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                OUT OF STOCK
            </div>
        )}
        
        {/* Main Image */}
        <AnimatePresence mode="wait">
            <motion.div 
                key={active?._key} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                transition={{ duration: 0.4, ease: "easeInOut" }} 
                className="relative w-full aspect-square max-h-[550px] border-2 border-gray-200 rounded-xl group overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
                <Image
                    src={urlFor(active).url()}
                    alt="Product Image"
                    fill
                    priority
                    className={`object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out ${isStock === 0 ? "opacity-40 grayscale" : ""}`}
                />
                
                {/* Zoom Indicator */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    Hover to zoom
                </div>
            </motion.div>
        </AnimatePresence>
        
        {/* Thumbnail Grid */}
        <div className="grid grid-cols-6 gap-2.5 h-20 md:h-24">
            {images?.map((image, index)=>(
                <motion.button 
                    key={image?._key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive(image)} 
                    className={`
                        relative border-2 rounded-lg overflow-hidden transition-all duration-300
                        ${active?._key === image?._key 
                            ? "border-shop-midnight-blue ring-2 ring-shop-royal-blue/30 opacity-100 shadow-md" 
                            : "border-gray-200 opacity-70 hover:opacity-100 hover:border-shop-royal-blue/50"
                        }
                    `}
                >
                    <Image 
                        src={urlFor(image).url()} 
                        alt={`Thumbnail ${index + 1}`} 
                        fill
                        className="object-contain p-1" 
                    />
                    
                    {/* Active Indicator */}
                    {active?._key === image?._key && (
                        <motion.div 
                            layoutId="activeThumb"
                            className="absolute inset-0 border-2 border-shop-royal-blue rounded-lg pointer-events-none"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </motion.button>
            ))}
        </div>
        
        {/* Image Counter */}
        <div className="text-center text-sm text-gray-500 font-medium">
            {images?.findIndex(img => img._key === active?._key) + 1} / {images?.length}
        </div>
    </div>
  )
}

export default ImageView