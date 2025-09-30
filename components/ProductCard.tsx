import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import { Flame, StarIcon, Package, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToWishlistButton from './AddToWishlistButton'
import { Title } from './ui/text'
import PriceView from './PriceView'
import AddToCartButton from './AddToCartButton'

const ProductCard = ({ product }: { product:Product }) => {
  const isOutOfStock = product?.stock === 0;
  const isLowStock = (product?.stock as number) > 0 && (product?.stock as number) <= 5;

  return (
    <div className="relative text-sm border border-gray-200 rounded-2xl bg-white group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-shop-midnight-blue/30 hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`} className="block relative">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={urlFor(product?.images[0]).url()}
                alt="Product Image"
                loading="lazy"
                width={700}
                height={700}
                className={`w-full h-full object-contain transition-all duration-500 ${
                  isOutOfStock 
                    ? "opacity-40 grayscale" 
                    : "group-hover:scale-110 group-hover:rotate-2"
                }`}
              />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            
            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  OUT OF STOCK
                </div>
              </div>
            )}
          </Link>
        )}
        
        <AddToWishlistButton product={product} />
        
        {/* Status badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {product?.status === "sale" && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
              <TrendingUp size={12} />
              SALE!
            </div>
          )}
          {product?.status === "hot" && (
            <Link 
              href={"/deals"}
              className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group/flame">
              <Flame
                size={16}
                fill="#ffffff"
                className="text-white animate-pulse"/>
            </Link>
          )}
          {isLowStock && !isOutOfStock && (
            <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Low Stock
            </div>
          )}
        </div>
      </div>

      <div className="relative p-4 space-y-3">
        {/* Category */}
        {product?.categories && (
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <p className="uppercase text-xs font-semibold text-shop-midnight-blue/70 tracking-wider">
              {product?.categories?.map((cat)=>cat).join(" • ")}
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        )}

        {/* Product name */}
        <Link href={`/product/${product?.slug?.current}`}>
          <Title className="text-base line-clamp-2 font-semibold text-gray-800 group-hover:text-shop-midnight-blue transition-colors duration-300 min-h-[3rem]">
            {product?.name}
          </Title>
        </Link>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-full border border-orange-200">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  size={13}
                  key={index}
                  className={`transition-all duration-300 ${
                    index < 4 
                      ? "text-shop-dark-orange drop-shadow-sm" 
                      : "text-gray-300"
                  }`}
                  fill={index < 4 ? "#ff8c00" : "#d1d5db"}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700 ml-1">4.0</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            3.5k reviews
          </p>
        </div>

        {/* Stock info */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-200">
          <Package size={16} className={isOutOfStock ? "text-red-500" : "text-shop-midnight-blue"} />
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-gray-600">Stock:</span>
            <span className={`font-bold ${
              isOutOfStock 
                ? "text-red-600" 
                : isLowStock 
                  ? "text-amber-600" 
                  : "text-emerald-600"
            }`}>
              {(product?.stock as number) > 0 ? product?.stock : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-200">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-sm"
          />
        </div>

        {/* Add to cart button */}
        <div className="pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-shop-midnight-blue/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

export default ProductCard