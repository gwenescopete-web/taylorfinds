import { Product } from '@/sanity.types'
import { getBrand } from '@/sanity/queries'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const ProductCharacteristics = async({product}:{product:Product | null | undefined}) => {
    const brand = await getBrand(product?.slug?.current as string)
    console.log(brand)
  return (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border border-slate-200 rounded-lg px-4 hover:border-slate-300 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
                <span className="text-base font-semibold text-slate-800">
                    {product?.name}: Characteristics
                </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
                <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg hover:from-slate-100 hover:to-slate-200 transition-colors">
                        <span className="text-sm text-slate-600">Brand</span>
                        {brand && (
                            <span className="font-semibold tracking-wide text-slate-800 bg-white px-3 py-1 rounded-md shadow-sm">
                                {brand[1]?.brandName}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg hover:from-slate-100 hover:to-slate-200 transition-colors">
                        <span className="text-sm text-slate-600">Collections</span>
                        <span className="font-semibold tracking-wide text-slate-800 bg-white px-3 py-1 rounded-md shadow-sm">
                            2025
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg hover:from-slate-100 hover:to-slate-200 transition-colors">
                        <span className="text-sm text-slate-600">Type</span>
                        <span className="font-semibold tracking-wide text-slate-800 bg-white px-3 py-1 rounded-md shadow-sm">
                            {product?.variant}
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg hover:from-slate-100 hover:to-slate-200 transition-colors">
                        <span className="text-sm text-slate-600">Stock</span>
                        <span className={`font-semibold tracking-wide px-3 py-1 rounded-md shadow-sm ${
                            product?.stock 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-red-100 text-red-700'
                        }`}>
                            {product?.stock ? "Available" : "Out of Stock"}
                        </span>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default ProductCharacteristics