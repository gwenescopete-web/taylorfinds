"use client"

import { Product } from '@/sanity.types'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { ShoppingBagIcon, Check, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import useStore from '@/store';
import toast from 'react-hot-toast';
import PriceFormatter from './PriceFormatter';
import QuantityButtons from './QuantityButtons';

interface Props {
    product: Product | null;
    className?: string
}

const AddToCartButton = ({product, className}: Props) => {
    const { addItem, getItemCount } = useStore()
    const [isAdding, setIsAdding] = useState(false);
    const itemCount = product?._id ? getItemCount(product._id) : 0;
    const isOutOfStock = product?.stock === 0;
    
    const handleAddToCart = () => {
        if (!product) return;
        if ((product.stock as number) > itemCount) {
            setIsAdding(true);
            addItem(product);
            toast.success(`${product.name?.substring(0,12)}... added successfully!`);
            setTimeout(() => setIsAdding(false), 600);
        } else {
            toast.error("Can not add more items than available in stock.");
        }
    }

    return (
        <div className="w-full">
            {itemCount ? (
                <div className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-emerald-700">In Your Cart</span>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 font-medium">Quantity</span>
                            {product && <QuantityButtons product={product} />}
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-emerald-200">
                            <span className="text-sm font-semibold text-gray-700">Subtotal</span>
                            <div className="text-lg font-bold text-shop-midnight-blue">
                                <PriceFormatter amount={product?.price ? product?.price * itemCount : 0} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Button 
                    onClick={handleAddToCart} 
                    disabled={isOutOfStock || isAdding}
                    className={cn(
                        "w-full h-12 relative overflow-hidden group",
                        "bg-gradient-to-r from-shop-midnight-blue to-blue-700",
                        "text-white font-semibold tracking-wide text-base",
                        "border-2 border-transparent",
                        "rounded-xl shadow-lg",
                        "transition-all duration-300",
                        "hover:shadow-xl hover:scale-[1.02]",
                        "active:scale-[0.98]",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                        isAdding && "scale-[0.98]",
                        className
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-shop-midnight-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex items-center justify-center gap-2">
                        {isOutOfStock ? (
                            <>
                                <Package className="w-5 h-5" />
                                <span>Out of Stock</span>
                            </>
                        ) : isAdding ? (
                            <>
                                <Check className="w-5 h-5 animate-bounce" />
                                <span>Added!</span>
                            </>
                        ) : (
                            <>
                                <ShoppingBagIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                <span>Add To Cart</span>
                            </>
                        )}
                    </div>
                    
                    {!isOutOfStock && !isAdding && (
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    )}
                </Button>
            )}
            
            {product?.stock && product.stock > 0 && product.stock <= 5 && !itemCount && (
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-amber-600 font-medium">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                    <span>Only {product.stock} left in stock</span>
                </div>
            )}
        </div>
    )
}

export default AddToCartButton