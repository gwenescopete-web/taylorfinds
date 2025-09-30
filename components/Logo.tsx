import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({className, spanDesign }:{className?:string, spanDesign?:string}) => {
  return (
    <Link href={"/"} className="inline-flex">
        <h2 className={cn("text-2xl text-shop-midnight-blue font-black tracking-wider uppercase hover:text-shop-royal-blue hoverEffect group font-sans", className)}>
            Taylor
            <span className={cn("text-shop-royal-blue group-hover:text-shop-midnight-blue hoverEffect", spanDesign)}>
                Finds
            </span>
        </h2>
    </Link>
  )
}

export default Logo