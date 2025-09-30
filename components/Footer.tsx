import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { SubText, SubTitle } from './ui/text'
import { categoriesData, quickLinksData } from '@/constants/data'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Mail, Send, ChevronRight, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 border-t border-gray-200 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <FooterTop />
        
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Logo />
              <SubText className="text-gray-600 leading-relaxed">
                Discover curated merchandise collections at Taylor Finds, where your cart meets your heart.
              </SubText>
            </div>

            <SocialMedia 
              className="text-gray-600" 
              iconClassName="border-gray-300 hover:border-shop-royal-blue hover:text-shop-royal-blue hover:bg-shop-royal-blue/5" 
              tooltipClassName="bg-gray-900 text-white" 
            />
          </div>

          {/* Quick Links */}
          <div>
            <div className="mb-6">
              <SubTitle className="text-gray-800 font-bold tracking-wide relative inline-block">
                QUICK LINKS
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-shop-royal-blue to-blue-400 rounded-full" />
              </SubTitle>
            </div>
            <ul className="space-y-3">
              {quickLinksData?.map((item)=>(
                <li key={item?.title}>
                  <Link 
                    href={item?.href} 
                    className="group flex items-center gap-2 text-gray-600 hover:text-shop-royal-blue transition-all duration-300 font-medium"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{item?.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="mb-6">
              <SubTitle className="text-gray-800 font-bold tracking-wide relative inline-block">
                CATEGORIES
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-shop-royal-blue to-blue-400 rounded-full" />
              </SubTitle>
            </div>
            <ul className="space-y-3">
              {categoriesData?.map((item)=>(
                <li key={item?.title}>
                  <Link 
                    href={`/category/${item?.href}`} 
                    className="group flex items-center gap-2 text-gray-600 hover:text-shop-royal-blue transition-all duration-300 font-medium"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{item?.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div className="mb-6">
              <SubTitle className="text-gray-800 font-bold tracking-wide relative inline-block">
                NEWSLETTER
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-shop-royal-blue to-blue-400 rounded-full" />
              </SubTitle>
            </div>
            <SubText className="text-gray-600 leading-relaxed">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </SubText>
            
            <form className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-shop-royal-blue transition-colors" />
                </div>
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  required 
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-shop-royal-blue rounded-xl transition-all"
                />
              </div>
              
              <Button className="w-full h-12 bg-gradient-to-r from-shop-royal-blue to-blue-600 hover:from-blue-600 hover:to-shop-royal-blue text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span className="flex items-center justify-center gap-2">
                  Subscribe Now
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>© {new Date().getFullYear()}</span>
              <Logo className="text-sm"/>
              <span>. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for amazing swifties</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-shop-royal-blue transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-shop-royal-blue transition-colors font-medium">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer