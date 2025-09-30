import React from 'react'
import { Title } from './ui/text'
import { getLatestBlogs } from '@/sanity/queries';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import dayjs from "dayjs"

type Blog = {
    _id: string;
    _type: "blog";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    slug?: { current?: string };
    author?: { 
        _ref: string; 
        _type: "reference"; 
        _weak?: boolean;
    };
    mainImage?: {
        _type?: string;
        asset?: {
            _ref: string;
            _type: string;
        };
    };
    blogcategories?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        title?: string; // Add title if your GROQ query includes it via population
    }>;
    publishedAt?: string;
    excerpt?: string;
    body?: unknown;
};

const LatestBlog = async() => {
    const blogs: Blog[] = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
        <div className="flex items-center justify-between mb-6">
            <Title>LATEST BLOGS</Title>
            <Link 
                href="/blog" 
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-shop-royal-blue hover:gap-3 transition-all duration-300 group"
            >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs?.map((blog) => (
                <article 
                    key={blog?._id} 
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                    {/* Image Container */}
                    {blog?.mainImage && (
                        <Link 
                            href={`/blog/${blog?.slug?.current}`}
                            className="relative block overflow-hidden aspect-[4/3]"
                        >
                            <Image
                                src={urlFor(blog?.mainImage).url()} 
                                alt={blog?.title || "Blog image"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    )}
                    
                    {/* Content */}
                    <div className="p-5 space-y-4">
                        {/* Meta Information */}
                        <div className="flex items-center gap-3 text-xs flex-wrap">
                            {/* Categories */}
                            <div className="flex items-center gap-2">
                                {blog?.blogcategories?.slice(0, 2).map((item, index) => (
                                    <span 
                                        key={index} 
                                        className="px-2.5 py-1 bg-shop-royal-blue/10 text-shop-royal-blue font-semibold rounded-full hover:bg-shop-royal-blue hover:text-white transition-colors duration-300 cursor-pointer"
                                    >
                                        {item?.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={blog.publishedAt}>
                                {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                            </time>
                        </div>
                        
                        {/* Title */}
                        <Link 
                            href={`/blog/${blog?.slug?.current}`} 
                            className="block"
                        >
                            <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-shop-royal-blue transition-colors duration-300">
                                {blog?.title}
                            </h3>
                        </Link>
                        
                        {/* Description */}
                        {blog?.excerpt && (
                            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                {blog?.excerpt}
                            </p>
                        )}
                        
                        {/* Read More Link */}
                        <Link 
                            href={`/blog/${blog?.slug?.current}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-shop-midnight-blue hover:text-shop-royal-blue transition-colors duration-300 group/link"
                        >
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </article>
            ))}
        </div>
        
        {/* Mobile View All Button */}
        <Link 
            href="/blog"
            className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-3 border-2 border-shop-royal-blue text-shop-royal-blue font-semibold rounded-lg hover:bg-shop-royal-blue hover:text-white transition-all duration-300"
        >
            View All Blogs
            <ArrowRight className="w-4 h-4" />
        </Link>
    </div>
  )
}

export default LatestBlog