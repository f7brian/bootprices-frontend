import BlogSection from '@/components/Home/Blogsection/BlogSection'
import HeroSection from '@/components/Home/Hero/Hero'
import ProductGrid from '@/components/Home/Product/ProductGrid'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection/>
      <ProductGrid/>
      <BlogSection/>
    </div>
  )
}
