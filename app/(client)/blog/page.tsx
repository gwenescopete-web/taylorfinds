import Container from '@/components/Container'
import { Title } from '@/components/ui/text'
import { urlFor } from '@/sanity/lib/image'
import { getAllBlogs } from '@/sanity/queries'
import dayjs from 'dayjs'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogPage = async () => {
  const blogs = await getAllBlogs(15)

  return (
    <div className="py-10 lg:py-16 bg-gradient-to-b from-white via-shop-light-bg/20 to-white">
        <Container>
            {/* Header Section */}
            <div className="mb-12 text-center max-w-3xl mx-auto">
                <div className="inline-block mb-4">
                    <Title className="relative">
                        OUR BLOG
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-shop-btn-dark-blue via-shop-royal-blue to-shop-btn-dark-blue rounded-full"></span>
                    </Title>
                </div>
                <p className="text-lightColor text-base mt-6 leading-relaxed">
                    Discover insights, tips, and stories from our community
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs?.map((blog, index) => (
                <article 
                    key={blog?._id} 
                    className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl hover:shadow-shop-royal-blue/10 transition-all duration-500 border border-gray-100 hover:border-shop-royal-blue/30 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {/* Image Container */}
                    <Link href={`/blog/${blog?.slug?.current}`} className="relative block overflow-hidden aspect-[16/10] bg-gray-100">
                        {blog?.mainImage && (
                            <>
                                <Image 
                                    src={urlFor(blog?.mainImage).url()} 
                                    alt={blog?.title || "blog image"} 
                                    width={500} 
                                    height={500} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Read More Badge */}
                                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                                    <span className="text-xs font-semibold text-shop-btn-dark-blue">Read More</span>
                                    <ArrowRight size={14} className="text-shop-royal-blue" />
                                </div>
                            </>
                        )}
                    </Link>

                    {/* Content Container */}
                    <div className="p-6">
                        {/* Meta Information */}
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                            {/* Category Badge */}
                            {blog?.blogcategories && blog.blogcategories.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {blog.blogcategories.slice(0, 2).map((item, idx) => (
                                        <span 
                                            key={idx}
                                            className="inline-block px-3 py-1 bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue text-white text-xs font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                                        >
                                            {item?.title}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-lightColor mb-4 group/date hover:text-shop-royal-blue transition-colors">
                            <Calendar size={14} className="flex-shrink-0" />
                            <time dateTime={blog.publishedAt}>
                                {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-lightColor/50" />
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>5 min read</span>
                            </div>
                        </div>

                        {/* Title */}
                        <Link 
                            href={`/blog/${blog?.slug?.current}`} 
                            className="block group/title"
                        >
                            <h3 className="text-lg font-bold tracking-wide text-darkColor line-clamp-2 group-hover/title:text-shop-royal-blue transition-colors duration-300 leading-snug min-h-[3.5rem]">
                                {blog?.title}
                            </h3>
                        </Link>

                        {/* Read More Link */}
                        <Link 
                            href={`/blog/${blog?.slug?.current}`}
                            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-shop-btn-dark-blue hover:text-shop-royal-blue group/link transition-colors"
                        >
                            Continue Reading
                            <ArrowRight 
                                size={16} 
                                className="group-hover/link:translate-x-1 transition-transform" 
                            />
                        </Link>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="h-1 bg-gradient-to-r from-transparent via-shop-royal-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </article>
              ))}
            </div>

            {/* Empty State */}
            {blogs?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 rounded-full bg-shop-light-bg/50 flex items-center justify-center mb-6">
                        <Calendar size={40} className="text-shop-royal-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-darkColor mb-2">No Posts Yet</h3>
                    <p className="text-lightColor max-w-md">
                        We&apos;re working on some great content. Check back soon for our latest articles and insights.
                    </p>
                </div>
            )}

            {/* Load More Section (Optional) */}
            {blogs && blogs.length >= 15 && (
                <div className="mt-16 text-center">
                    <button className="group px-8 py-4 bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
                        Load More Articles
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </Container>
    </div>
  )
}

export default BlogPage