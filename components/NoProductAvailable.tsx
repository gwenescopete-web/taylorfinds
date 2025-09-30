"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Package, RefreshCw } from "lucide-react";

const NoProductAvailable = ({
    selectedTab,
    classname,
} : {
    selectedTab?: string,
    classname?: string
}) => {
    return (
        <div className={cn("flex flex-col items-center justify-center py-16 min-h-96 space-y-6 text-center bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl w-full mt-10 border-2 border-blue-100 shadow-lg", classname)}>
            {/* Icon with Animation */}
            <motion.div 
                initial={{opacity: 0, scale: 0.5}} 
                animate={{opacity: 1, scale: 1}} 
                transition={{duration: 0.6, type: "spring"}}
                className="relative"
            >
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-blue-600" />
                </div>
                <motion.div
                    animate={{scale: [1, 1.2, 1]}}
                    transition={{repeat: Infinity, duration: 2, ease: "easeInOut"}}
                    className="absolute inset-0 w-24 h-24 bg-blue-200 rounded-full opacity-20"
                />
            </motion.div>

            {/* Title */}
            <motion.div 
                initial={{opacity: 0, y:-20}} 
                animate={{opacity: 1, y:0}} 
                transition={{duration: 0.5, delay: 0.2}}
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    No Products Available
                </h2>
                {selectedTab && (
                    <p className="text-lg text-gray-600">
                        in <span className="font-semibold text-blue-600">{selectedTab}</span>
                    </p>
                )}
            </motion.div>

            {/* Description */}
            <motion.p 
                initial={{opacity: 0}} 
                animate={{opacity: 1}} 
                transition={{delay: 0.4, duration: 0.5}} 
                className="text-gray-600 max-w-md px-4 leading-relaxed"
            >
                We&apos;re currently out of stock in this category, but don&apos;t worry—new items are on their way!
            </motion.p>

            {/* Restocking Notice */}
            <motion.div 
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6, duration: 0.5}}
                className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-center space-x-3"
            >
                <motion.div
                    animate={{rotate: 360}}
                    transition={{repeat: Infinity, duration: 2, ease: "linear"}}
                >
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                </motion.div>
                <span className="text-blue-800 font-medium">We&apos;re restocking shortly</span>
            </motion.div>
        </div>
    )
}

export default NoProductAvailable;