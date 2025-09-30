import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const socialLink = [
    {
        title: "Facebook",
        href: "https://www.facebook.com/danica.mira.77",
        icon: <Facebook  className="w-5 h-5" />,
    },

    {
        title: "Instagram",
        href: "https://www.instagram.com/wynjetere?igsh=emVmcGhibTl5YTdz",
        icon: <Instagram  className="w-5 h-5" />,
    },

    {
        title: "Twitter",
        href: "https://x.com/pejoro_jen?t=yaVoHD0ug80mVr6XLSYBcA&s=09",
        icon: <Twitter  className="w-5 h-5" />,
    },
]

const SocialMedia = ({className, iconClassName}:Props) => {
  return (
    <TooltipProvider>
        <div className={cn("flex items-center gap-3.5", className)}>
            {socialLink?.map((item)=>(
                <Tooltip key={item?.title}>
                    <TooltipTrigger asChild>
                        <Link 
                        key={item?.title} 
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item?.href} 
                        className={cn("p-2 border rounded-full hover:text-white hover:border-shop-royal-blue hoverEffect",iconClassName)}>
                            {item?.icon}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        {item?.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </TooltipProvider>
  )
}

export default SocialMedia