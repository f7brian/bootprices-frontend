"use client";

import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WordPressPost } from "@/types/wordpress";

export default function BlogSection() {
  const { data } = useGetBlogsQuery({});
  const blogPosts = Array.isArray(data) ? data.slice(0, 3) : [];

  // Helper function to extract text from HTML
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Helper function to calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = stripHtml(content).split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-start mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Recent Blog Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post: WordPressPost) => {
            const readingTime = calculateReadingTime(post.content.rendered);
            
            return(
              <div key={post.id} className="mb-8">
              {/* Blog Image */}
              <div className="aspect-[4/3] relative mb-4 overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg"}
                    alt={stripHtml(post.title.rendered)}
                    fill
                    className="object-cover rounded-[4px]"
                  />
                </Link>
              </div>

              {/* Meta Information */}
              <div className="flex items-center justify-between space-x-4 text-gray-400 text-sm mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Published:{" "}
                    {post.date
                      ? new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-black mb-2">
                  {stripHtml(post.title.rendered)}
                </h2>
              </Link>

              {/* Description (Dangerous HTML) */}
              <div
                className="text-gray-400 text-sm mb-3"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered.slice(0, 205) + " ...",
                }}
              />

              {/* Read More Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-black/90 hover:text-secondary text-sm font-medium"
              >
                Read More
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )
        })}
        </div>

        <div className="text-center">
          <Link
            href={"/blog"}
            className="bg-secondary hover:bg-primary text-white px-8 py-3 text-lg font-semibold rounded-md"
          >
            See All Blog Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
