import Container from '@/components/Container'
import { Title } from '@/components/ui/text'
import { urlFor } from '@/sanity/lib/image';
import { getBlogCategories, getOthersBlog, getSingleBlog } from '@/sanity/queries';
import dayjs from 'dayjs';
import { Calendar, ChevronLeftIcon, Pencil, Clock, Tag, TrendingUp } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

const SingleBlogPage = async({params}:{params: Promise <{slug: string}>}) => {
  const { slug} = await params;
  const blog = await getSingleBlog(slug)
  if (!blog) return notFound()
  
  return (
    <div className="py-10 lg:py-16 bg-gradient-to-b from-white via-shop-light-bg/10 to-white">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <article className="lg:col-span-3">
          {/* Featured Image */}
          {blog?.mainImage && (
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group">
              <Image 
                src={urlFor(blog?.mainImage).url()}
                alt={blog.title || "Blog Image"}
                width={1200}
                height={600}
                className="w-full max-h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">
            {/* Meta Information */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200 flex-wrap">
              {/* Categories */}
              {blog?.blogcategories && blog.blogcategories.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {blog.blogcategories.map((item: {title:string}, index: number) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue text-white text-xs font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <Tag size={12} />
                      {item?.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Author */}
              {blog?.author?.name && (
                <div className="flex items-center gap-2 text-sm group cursor-pointer">
                  <div className="p-2 rounded-full bg-shop-light-bg/50 group-hover:bg-shop-royal-blue/10 transition-colors">
                    <Pencil size={14} className="text-shop-btn-dark-blue group-hover:text-shop-royal-blue transition-colors" />
                  </div>
                  <span className="font-medium text-darkColor group-hover:text-shop-royal-blue transition-colors">
                    {blog.author.name}
                  </span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 text-sm group cursor-pointer">
                <div className="p-2 rounded-full bg-shop-light-bg/50 group-hover:bg-shop-royal-blue/10 transition-colors">
                  <Calendar size={14} className="text-shop-btn-dark-blue group-hover:text-shop-royal-blue transition-colors" />
                </div>
                <time className="font-medium text-darkColor group-hover:text-shop-royal-blue transition-colors">
                  {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                </time>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 rounded-full bg-shop-light-bg/50">
                  <Clock size={14} className="text-shop-btn-dark-blue" />
                </div>
                <span className="font-medium text-lightColor">
                  5 min read
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-darkColor mb-8 leading-tight">
              {blog?.title}
            </h1>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {blog.body && (
                <PortableText 
                  value={blog.body}
                  components={{
                    block: {
                      normal: ({children}) => (
                        <p className="my-6 text-base leading-relaxed text-gray-700 first:mt-0 last:mb-0">
                          {children}
                        </p>
                      ),
                      h2: ({children}) => (
                        <h2 className="my-8 text-3xl font-bold tracking-tight text-darkColor first:mt-0 last:mb-0 relative inline-block">
                          {children}
                          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue rounded-full" />
                        </h2>
                      ),
                      h3: ({children}) => (
                        <h3 className="my-6 text-2xl font-semibold tracking-tight text-darkColor first:mt-0 last:mb-0">
                          {children}
                        </h3>
                      ),
                      blockquote: ({children}) => (
                        <blockquote className="my-8 border-l-4 border-shop-royal-blue bg-shop-light-bg/30 pl-6 pr-6 py-4 text-lg italic text-gray-800 rounded-r-lg first:mt-0 last:mb-0">
                          {children}
                        </blockquote>
                      ),
                    },
                    types: {
                      image: ({value}) => (
                        <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
                          <Image 
                            alt={value.alt || "Article image"}
                            src={urlFor(value).width(2000).url()}
                            className="w-full"
                            width={1400}
                            height={1400}
                          />
                        </div>
                      ),
                      separator: ({value}) => {
                        switch (value.style) {
                          case "line":
                            return (
                              <hr className="my-8 border-t-2 border-gray-200"/>
                            )
                          case "space":
                            return <div className="my-8"/>
                          default:
                            return null
                        }
                      },
                    },
                    list: {
                      bullet: ({children}) => (
                        <ul className="my-6 space-y-2 list-disc pl-6 text-base text-gray-700 marker:text-shop-royal-blue">
                          {children}
                        </ul>
                      ),
                      number: ({children}) => (
                        <ol className="my-6 space-y-2 list-decimal pl-6 text-base text-gray-700 marker:text-shop-royal-blue marker:font-semibold">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({children}) => (
                        <li className="pl-2 leading-relaxed">
                          {children}
                        </li>
                      ),
                      number: ({children}) => (
                        <li className="pl-2 leading-relaxed">
                          {children}
                        </li>
                      ),
                    },
                    marks: {
                      strong: ({children}) => (
                        <strong className="font-bold text-darkColor">
                          {children}
                        </strong>
                      ),
                      code: ({children}) => (
                        <code className="px-2 py-1 bg-gray-100 text-shop-btn-dark-blue rounded text-sm font-mono">
                          {children}
                        </code>
                      ),
                      link: ({value, children}) => (
                        <Link 
                          href={value.href} 
                          className="font-medium text-shop-royal-blue hover:text-shop-btn-dark-blue underline decoration-shop-royal-blue/30 hover:decoration-shop-royal-blue underline-offset-4 transition-all"
                        >
                          {children}
                        </Link>
                      ),
                    },
                  }}
                />
              )}
            </div>

            {/* Back to Blog Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/blog" 
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                <span>Back to Blog</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <BlogLeft slug={slug}/>
        </aside>
      </Container>
    </div>
  )
}

const BlogLeft = async ({slug}:{slug:string}) => {
  const categories = await getBlogCategories()
  const blogs = await getOthersBlog(slug, 5)

  return (
    <div className="space-y-8">
      {/* Categories Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
          <div className="p-2 rounded-lg bg-shop-royal-blue/10">
            <Tag className="w-5 h-5 text-shop-royal-blue" />
          </div>
          <Title className="text-lg">
            Categories
          </Title>
        </div>
        <div className="space-y-3">
  {categories?.map((category, index) => (
    <div
      key={index}
      className="group flex items-center justify-between p-3 rounded-lg hover:bg-shop-light-bg/50 cursor-pointer transition-all duration-300"
    >
      <span className="text-sm font-medium text-lightColor group-hover:text-shop-btn-dark-blue transition-colors">
        {category?.title || category?.blogcategories?.[0]?.title || 'Uncategorized'}
      </span>
      <span className="px-2.5 py-1 bg-shop-light-bg/50 text-xs font-bold text-darkColor rounded-full group-hover:bg-shop-royal-blue group-hover:text-white transition-all">
        {category?.count || 1}
      </span>
    </div>
  ))}
</div>
      </div>

      {/* Latest Blogs Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
          <div className="p-2 rounded-lg bg-shop-royal-blue/10">
            <TrendingUp className="w-5 h-5 text-shop-royal-blue" />
          </div>
          <Title className="text-lg">
            Latest Posts
          </Title>
        </div>
        <div className="space-y-4">
          {blogs?.map((blog: Blog, index: number) => (
            <Link
              href={`/blog/${blog?.slug?.current}`}
              key={index}
              className="group flex items-start gap-3 p-3 rounded-lg hover:bg-shop-light-bg/50 transition-all duration-300"
            >
              {blog?.mainImage && (
                <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-shop-royal-blue transition-colors">
                  <Image 
                    src={urlFor(blog?.mainImage).url()}
                    alt={blog?.title || "blog thumbnail"}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="line-clamp-2 text-sm font-medium text-lightColor group-hover:text-shop-btn-dark-blue transition-colors leading-snug">
                  {blog?.title}
                </p>
                {blog?.publishedAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleBlogPage