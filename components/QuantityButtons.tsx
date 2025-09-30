import { Product } from '@/sanity.types';
import useStore from '@/store';
import React from 'react'
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Props {
    product: Product;
    className?: string
}

const QuantityButtons = ({ product, className }: Props) => {
    const { addItem, removeItem, getItemCount } = useStore();
    const itemCount = getItemCount(product?._id);
    const isOutOfStock = product?.stock === 0;

    const handleRemoveProduct = () => {
        removeItem(product?._id);
        if(itemCount> 1) {
            toast.success("Quantity decreased successfully!");
        } else {
            toast.success(`1 ${product?.name?.substring(0,12)}... removed successfully!`);
        }
    };

    const handleAddToCart =()=> {
        if ((product?.stock as number) > itemCount) {
            addItem(product);
            toast.success("Quantity increased successfully!");
        } else{
            toast.error("Can not add more items than available in stock.");
        }
    };

  return (
    <div className={cn("flex items-center gap-2 pb-1 text-base", className)}>
        <Button 
            onClick={handleRemoveProduct} 
            variant="outline" 
            size="icon" 
            disabled={itemCount === 0 || isOutOfStock} 
            className="w-8 h-8 border-2 border-slate-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
        >
            <Minus className="w-4 h-4" />
        </Button>
        <span className="font-bold text-base w-10 text-center text-slate-800 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg py-1.5 shadow-inner border border-slate-200">
            {itemCount}
        </span>
        <Button 
            onClick={handleAddToCart} 
            variant="outline" 
            size="icon" 
            disabled={isOutOfStock} 
            className="w-8 h-8 border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
        >
            <Plus className="w-4 h-4" />
        </Button>
    </div>
  )
}

export default QuantityButtons