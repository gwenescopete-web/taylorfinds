import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Title } from '@/components/ui/text'
import React from 'react'

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
    <Container className="lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
            <Title className="mb-4">
                CONTACT US
            </Title>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="font-medium tracking-tight leading-relaxed text-gray-600 max-w-2xl mx-auto">
                We&apos;d love to hear from you! Please fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-12 max-w-2xl mx-auto mb-12">
            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="Name" className="text-sm font-semibold text-gray-700">
                        Name
                    </Label>
                    <Input 
                        type='text' 
                        name="Name" 
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white hover:border-gray-400" 
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Email" className="text-sm font-semibold text-gray-700">
                        Email
                    </Label>
                    <Input 
                        type='email' 
                        name="Email" 
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white hover:border-gray-400" 
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Message" className="text-sm font-semibold text-gray-700">
                        Message
                    </Label>
                    <textarea 
                        name="Message" 
                        rows={5}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none bg-white hover:border-gray-400" 
                        required
                    ></textarea>
                </div>
                
                <Button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    Send Message
                </Button>
            </form>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-12 max-w-2xl mx-auto">
            <div className="text-center">
                <Title className="mb-4">
                    FOLLOW US
                </Title>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
                <p className="text-gray-600 mb-8">
                    Stay connected and get the latest updates on new collections and exclusive drops!
                </p>
                
                <div className="flex justify-center items-center space-x-8">
                    <a 
                        href="https://www.facebook.com/danica.mira.77" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Facebook</span>
                    </a>
                    
                    <a 
                        href="https://www.instagram.com/wynjetere?igsh=emVmcGhibTl5YTdz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-600 hover:bg-pink-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">Instagram</span>
                    </a>
                    
                    <a 
                        href="https://x.com/pejoro_jen?t=yaVoHD0ug80mVr6XLSYBcA&s=09" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-400 transition-colors">Twitter</span>
                    </a>
                </div>
            </div>
        </div>
    </Container>
</div>
  )
}

export default ContactPage