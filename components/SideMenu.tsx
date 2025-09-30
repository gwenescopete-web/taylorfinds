import React, { FC } from 'react'
import Logo from './Logo';
import { X, ChevronRight } from 'lucide-react';
import { headerData } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu:FC<SidebarProps> = ({isOpen, onClose}) => {
    const pathname = usePathname();
    const sidebarRef = useOutsideClick<HTMLDivElement>(onClose)
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop with blur */}
        <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}
        />
        
        {/* Sidebar Panel */}
        <div 
            ref={sidebarRef} 
            className={`absolute inset-y-0 left-0 min-w-72 max-w-96 bg-gradient-to-br from-gray-900 via-black to-gray-900 h-screen shadow-2xl border-r border-shop-royal-blue/30 flex flex-col transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-shop-royal-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-shop-btn-dark-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between gap-5 p-8 pb-6 border-b border-white/10">
                    <div className={`transform transition-all duration-700 ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
                        <Logo className="text-white" spanDesign="hover:text-shop-royal-blue" />
                    </div>
                    <button 
                        onClick={onClose} 
                        className="group relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                        aria-label="Close menu"
                    >
                        <X className="text-white group-hover:text-shop-royal-blue transition-colors group-hover:rotate-90 transform duration-300" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8 overflow-y-auto">
                    <div className="flex flex-col space-y-2">
                        {headerData?.map((item, index) => {
                            const isActive = pathname === item?.href;
                            return (
                                <Link 
                                    href={item?.href} 
                                    key={item?.title}
                                    onClick={onClose}
                                    className={`group relative flex items-center justify-between px-4 py-3.5 rounded-lg font-semibold tracking-wide transition-all duration-300 transform ${
                                        isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                                    } ${
                                        isActive 
                                            ? "bg-shop-royal-blue/20 text-shop-royal-blue shadow-lg shadow-shop-royal-blue/20" 
                                            : "text-white/90 hover:bg-white/5 hover:text-white"
                                    }`}
                                    style={{ transitionDelay: `${index * 50 + 100}ms` }}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-shop-royal-blue rounded-r-full" />
                                    )}
                                    
                                    <span className="relative z-10 ml-2">
                                        {item?.title}
                                    </span>
                                    
                                    <ChevronRight 
                                        size={18} 
                                        className={`transition-all duration-300 ${
                                            isActive 
                                                ? "opacity-100 translate-x-0" 
                                                : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                        }`}
                                    />
                                    
                                    {/* Hover gradient effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-shop-royal-blue/0 via-shop-royal-blue/5 to-shop-royal-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer with Social Media */}
                <div className={`border-t border-white/10 p-8 pt-6 transform transition-all duration-700 delay-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-4 font-semibold">
                        Connect With Us
                    </p>
                    <SocialMedia />
                    
                    {/* Additional info */}
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-white/40 text-xs">
                            © 2025 All rights reserved
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative vertical line */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-shop-royal-blue/30 to-transparent" />
        </div>
    </div>
  )
}

export default SideMenu