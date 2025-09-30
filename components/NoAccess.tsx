import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Lock, ShoppingCart, Sparkles } from 'lucide-react'

const NoAccess = ({details="Log in to view your cart items and checkout. Don't miss out on your favorite products!"}:{details?:string}) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] py-12 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 p-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-shop-royal-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-shop-midnight-blue/5 rounded-full blur-3xl" />
        
        <Card className="w-full max-w-md shadow-2xl border-2 relative overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-shop-royal-blue via-blue-500 to-shop-midnight-blue" />
            
            <CardHeader className="flex items-center flex-col gap-3 pt-10 pb-6 relative">
                {/* Animated icon */}
                <div className="relative mb-2">
                    <div className="absolute inset-0 bg-shop-royal-blue/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative bg-gradient-to-br from-shop-royal-blue to-blue-600 p-4 rounded-full shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                </div>
                
                <Logo />
                <CardTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-shop-midnight-blue to-shop-royal-blue bg-clip-text text-transparent">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 px-8">
                <p className="text-center font-medium text-gray-600 leading-relaxed">
                    {details}
                </p>
                
                {/* Feature highlights */}
                <div className="space-y-3 py-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-shop-royal-blue/10 flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="w-4 h-4 text-shop-royal-blue" />
                        </div>
                        <span>Access your saved cart items</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-shop-royal-blue/10 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-shop-royal-blue" />
                        </div>
                        <span>Track orders and get exclusive deals</span>
                    </div>
                </div>
                
                <SignInButton mode="modal">
                    <Button 
                        className="w-full bg-gradient-to-r from-shop-royal-blue to-blue-600 hover:from-shop-royal-blue hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" 
                        size="lg"
                    >
                        Sign In
                    </Button>
                </SignInButton>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-3 px-8 pb-8">
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                            Don&rsquo;t have an account?
                        </span>
                    </div>
                </div>
                
                <SignUpButton mode="modal">
                    <Button 
                        variant="outline" 
                        className="w-full border-2 border-shop-royal-blue text-shop-royal-blue hover:bg-shop-royal-blue hover:text-white hover:scale-105 transition-all duration-300" 
                        size="lg"
                    >
                        Create an account
                    </Button>
                </SignUpButton>
            </CardFooter>
        </Card>
    </div>
  )
}

export default NoAccess