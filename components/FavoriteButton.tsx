"use client"

import { Product } from '@/sanity.types';
import useStore from '@/store';
import { Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const FavoriteButton = ({showProduct= false, product}:{showProduct?: boolean; product?:Product | null | undefined}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [ existingProduct, setExistingProduct ] = useState<Product | null>(null);
  const [ isAnimating, setIsAnimating ] = useState(false);
  const [ particles, setParticles ] = useState<number[]>([]);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      setIsAnimating(true);
      
      // Create particle effect
      const newParticles = Array.from({ length: 6 }, (_, i) => Date.now() + i);
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 1000);

      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Removed from wishlist!"
            : "Added to wishlist!",
          {
            icon: existingProduct ? '💔' : '❤️',
            style: {
              borderRadius: '12px',
              background: existingProduct ? '#fef2f2' : '#fef2f2',
              color: existingProduct ? '#991b1b' : '#be123c',
            },
          }
        );
        setTimeout(() => setIsAnimating(false), 600);
      })
    }
  }

  const favoriteCount = favoriteProduct?.length || 0;
  const hasFavorites = favoriteCount > 0;

  return (
    <>
      {!showProduct ? (
        <Link 
          href={"/wishlist"} 
          className="group relative p-2 rounded-xl hover:bg-pink-50 transition-all duration-300"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-pink-400/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
          
          {/* Heart icon */}
          <Heart 
            className={`w-6 h-6 relative z-10 text-gray-700 group-hover:text-pink-500 transition-all duration-300 ${
              hasFavorites ? 'fill-pink-500 text-pink-500 group-hover:scale-110' : 'group-hover:scale-105'
            }`}
          />

          {/* Count badge */}
          {hasFavorites && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 z-20"
            >
              <span className="relative flex items-center justify-center">
                {/* Pulsing ring */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400/40 animate-ping" />
                
                {/* Badge */}
                <span className="relative inline-flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600 text-white min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-bold shadow-lg ring-2 ring-white">
                  {favoriteCount > 99 ? '99+' : favoriteCount}
                </span>
              </span>
            </motion.span>
          )}

          {/* Tooltip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30">
            <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              {hasFavorites ? `${favoriteCount} ${favoriteCount === 1 ? 'item' : 'items'} in wishlist` : 'Your wishlist'}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45" />
            </div>
          </div>
        </Link>
      ) : (
        <motion.button 
          onClick={handleFavorite}
          whileTap={{ scale: 0.9 }}
          className="group relative overflow-hidden rounded-xl transition-all duration-300"
        >
          {/* Background */}
          <div className={`relative p-3 rounded-xl border-2 transition-all duration-300 ${
            existingProduct 
              ? 'bg-gradient-to-br from-pink-500 to-rose-600 border-pink-600 shadow-lg shadow-pink-500/30' 
              : 'bg-white border-pink-300 hover:border-pink-500 hover:bg-pink-50'
          }`}>
            {/* Hover shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {/* Heart icon */}
            <Heart 
              className={`relative z-10 w-6 h-6 transition-all duration-300 ${
                existingProduct 
                  ? 'fill-white text-white scale-110' 
                  : 'text-pink-500 group-hover:scale-110'
              } ${isAnimating && 'animate-bounce'}`}
            />

            {/* Particle effects */}
            <AnimatePresence>
              {particles.map((particle, i) => (
                <motion.div
                  key={particle}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos((i / 6) * Math.PI * 2) * 30,
                    y: Math.sin((i / 6) * Math.PI * 2) * 30,
                    opacity: [1, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Heart 
                    className="w-3 h-3 fill-pink-500 text-pink-500" 
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pulse ring for favorited */}
            {existingProduct && (
              <motion.span 
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-xl border-2 border-pink-400"
              />
            )}
          </div>

          {/* Floating sparkle */}
          {existingProduct && (
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 180, 360],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-400 drop-shadow-lg" fill="currentColor" />
            </motion.div>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 whitespace-nowrap">
            <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl">
              {existingProduct ? 'Remove from wishlist' : 'Add to wishlist'}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45" />
            </div>
          </div>
        </motion.button>
      )}
    </>
  )
}

export default FavoriteButton