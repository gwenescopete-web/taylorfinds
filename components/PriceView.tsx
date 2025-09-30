import React from 'react'
import PriceFormatter from './PriceFormatter';

interface Props {
    price: number | undefined;
    discount: number | undefined;
    className: string;
}

const PriceView = ({price, discount}: Props) => {
  return (
    <div className="flex items-center gap-2">
        <PriceFormatter 
            amount={price} 
            className="text-shop-midnight-blue text-base font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" 
        />
        {price && discount && (
            <div className="flex items-center gap-1.5">
                <PriceFormatter 
                    amount={price + (discount * price) / 100} 
                    className="line-through text-xs font-normal text-shop-light-text opacity-60"
                />
                <span className="bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    -{discount}%
                </span>
            </div>
        )}
    </div>
  )
}

export default PriceView