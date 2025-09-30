"use client"

import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types'
import useStore from '@/store';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddToWishlistButton = ({product, className}:{product: Product; className?: string}) => {
  const {favoriteProduct, addToFavorite} = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);

  useEffect(()=>{
    const availableProduct = favoriteProduct?.find((item)=> item._id === product?._id);
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct])

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    
    if(product?._id){
      setIsAnimating(true);
      
      // Create ripple effect
      const rippleId = Date.now();
      setRipples(prev => [...prev, rippleId]);
      setTimeout(() => {
        setRipples(prev => prev.filter(id => id !== rippleId));
      }, 600);

      addToFavorite(product).then(()=>{
        toast.success(
          existingProduct ? "Removed from wishlist!" : "Added to wishlist!",
          {
            icon: existingProduct ? '💔' : '❤️',
            style: {
              borderRadius: '12px',
              background: existingProduct ? '#fef2f2' : '#fef2f2',
              color: existingProduct ? '#991b1b' : '#be123c',
            },
          }
        );
        setTimeout(() => setIsAnimating(false), 300);
      })
    }
  };

  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <div 
        onClick={handleFavorite} 
        className={cn(
          "relative p-2.5 rounded-full cursor-pointer",
          "transition-all duration-300 ease-out",
          "shadow-md hover:shadow-xl",
          "group overflow-hidden",
          "backdrop-blur-sm",
          existingProduct 
            ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white scale-100" 
            : "bg-white/90 text-gray-600 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50",
          isAnimating && "scale-110",
          "active:scale-95"
        )}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple}
            className={cn(
              "absolute inset-0 rounded-full",
              "animate-ping opacity-75",
              existingProduct 
                ? "bg-rose-400" 
                : "bg-pink-400"
            )}
          />
        ))}

        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Heart icon */}
        <Heart 
          size={16}
          className={cn(
            "relative z-10 transition-all duration-300",
            existingProduct 
              ? "fill-current scale-110" 
              : "group-hover:scale-110",
            isAnimating && "animate-bounce"
          )}
        />

        {/* Pulse ring for favorited items */}
        {existingProduct && (
          <span className="absolute inset-0 rounded-full bg-rose-400/30 animate-ping" style={{animationDuration: '2s'}} />
        )}

        {/* Glow effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            existingProduct 
              ? "bg-rose-400/40" 
              : "bg-pink-400/40"
          )}
        />
      </div>

      {/* Tooltip */}
      <div className={cn(
        "absolute top-full right-0 mt-2 px-3 py-1.5",
        "bg-gray-900 text-white text-xs font-medium rounded-lg",
        "opacity-0 group-hover:opacity-100 pointer-events-none",
        "transition-opacity duration-200 whitespace-nowrap",
        "shadow-lg"
      )}>
        {existingProduct ? "Remove from wishlist" : "Add to wishlist"}
        <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45" />
      </div>
    </div>
  )
}

export default AddToWishlistButton