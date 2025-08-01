import { CommonBanner } from "@/components/ui/CommonBanner";
import React from "react";
import bannerImage from "@/assets/blogs/Frame 2147225627.png";
import Blog from "@/components/AllBlogs/Blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Articles - BootPrices | Latest Boot Reviews and Guides",
  description: "Discover the latest work boot reviews, buying guides, and industry insights. Find the best boots for your job with our comprehensive blog articles.",
  openGraph: {
    title: 'Blog Articles - BootPrices',
    description: 'Discover the latest work boot reviews, buying guides, and industry insights.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    siteName: 'BootPrices',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/preview-boot-ad.jpg`,
        width: 1200,
        height: 630,
        alt: 'BootPrices Blog Articles',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BootPrices',
    creator: '@BootPrices',
  },
};

export default function page() {
  return (
    <div>
      <CommonBanner backgroundImage={bannerImage} title="Blog Articles" />
      <Blog/>
    </div>
  );
}
