"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from 'react';
import { motion } from 'framer-motion';

interface ContactItemData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
}

const data: ContactItemData[] = [
    {
        title: "Visit Us",
        subtitle: "Quezon City, Philippines",
        color: "blue",
        icon: <MapPin className="h-6 w-6" />,
    },
    {
        title: "Call Us",
        subtitle: "+63 927 089 5613",
        color: "green",
        icon: <Phone className="h-6 w-6" />,
    },
    {
        title: "Working Hours",
        subtitle: "Mon - Sat: 10 AM to 7 PM",
        color: "purple",
        icon: <Clock className="h-6 w-6" />,
    },
    {
        title: "Email Us",
        subtitle: "taylorfinds@gmail.com",
        color: "orange",
        icon: <Mail className="h-6 w-6" />,
    },
]

const colorMap = {
    blue: {
        bg: 'bg-blue-100',
        hoverBg: 'group-hover:bg-blue-500',
        text: 'text-blue-600',
        hoverText: 'group-hover:text-white',
        glow: 'group-hover:shadow-blue-500/30',
        gradient: 'from-blue-500 to-indigo-500',
    },
    green: {
        bg: 'bg-green-100',
        hoverBg: 'group-hover:bg-green-500',
        text: 'text-green-600',
        hoverText: 'group-hover:text-white',
        glow: 'group-hover:shadow-green-500/30',
        gradient: 'from-green-500 to-emerald-500',
    },
    purple: {
        bg: 'bg-purple-100',
        hoverBg: 'group-hover:bg-purple-500',
        text: 'text-purple-600',
        hoverText: 'group-hover:text-white',
        glow: 'group-hover:shadow-purple-500/30',
        gradient: 'from-purple-500 to-pink-500',
    },
    orange: {
        bg: 'bg-orange-100',
        hoverBg: 'group-hover:bg-orange-500',
        text: 'text-orange-600',
        hoverText: 'group-hover:text-white',
        glow: 'group-hover:shadow-orange-500/30',
        gradient: 'from-orange-500 to-red-500',
    },
}

const FooterTop = () => {
  return (
    <div className="py-12 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.map((item, index) => {
                const colors = colorMap[item.color as keyof typeof colorMap];
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group relative"
                    >
                        {/* Card wrapper */}
                        <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-xl overflow-hidden">
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            {/* Content */}
                            <div className="relative z-10 flex items-start gap-4">
                                {/* Icon container */}
                                <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${colors.bg} ${colors.hoverBg} flex items-center justify-center transition-all duration-300 shadow-md ${colors.glow} group-hover:shadow-lg group-hover:scale-110`}>
                                    <div className={`${colors.text} ${colors.hoverText} transition-colors duration-300`}>
                                        {item.icon}
                                    </div>
                                </div>

                                {/* Text content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors duration-300 text-base mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Floating decoration */}
                        <motion.div
                            animate={{ 
                                y: [0, -5, 0],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 2,
                                delay: index * 0.2
                            }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                        />
                    </motion.div>
                );
            })}
        </div>
    </div>
  )
}

export default FooterTop