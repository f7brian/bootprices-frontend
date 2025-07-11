"use client"

import { useState } from "react"
// import { useGetBlogsQuery } from "@/hooks/use-blogs"
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { useGetBlogsQuery } from "@/redux/api/blogApi"
import { BeautifulPageLoading } from "../ui/BeautifulSpinner"
// import { BeautifulPageLoading } from "./ui/beautiful-spinner"

interface allBlog {
  id: string
  photo: StaticImageData | string
  title: string
  date: string
  time: string
  description: string
}

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 12

  const { data, isLoading, error } = useGetBlogsQuery({
    page: currentPage,
    limit,
  })

  const blogs = data?.data?.result || []
  const totalBlogs = data?.data?.meta?.total || 0
  const totalPages = data?.data?.meta?.totalPage || 1

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }


  return (
    <div className="text-black">
      <div className="container mx-auto px-4  py-12">
        {/* Blog Grid */}
        {isLoading ? (
          <div className="container mx-auto">
            <BeautifulPageLoading text="Loading blog data..." variant="gradient" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load blogs.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post: allBlog) => (
              <div key={post.id} className="mb-8">
                {/* Blog Image */}
                <div className="aspect-[4/3] relative mb-4 overflow-hidden">
                  <Link href={`/blog/${post.id}`}>
                    <Image
                      src={post.photo || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-[4px]"
                    />
                  </Link>
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between space-x-4 text-gray-400 text-sm mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.time} min read</span>
                  </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-xl font-bold text-black mb-2">{post.title}</h2>
                </Link>

                {/* Description */}
                <p
                  className="text-gray-400  mb-3"
                  dangerouslySetInnerHTML={{
                    __html: post.description.slice(0, 180) + "...",
                  }}
                ></p>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-black/90 hover:text-secondary text-sm font-medium"
                >
                  Read More
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination - Keeping exactly as provided */}
        {!isLoading && blogs.length > 0 && (
          <div className="mt-12 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium">{blogs.length}</span> out of{" "}
              <span className="font-medium">{totalBlogs}</span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded border border-secondary text-gray-600 hover:bg-secondary hover:text-white flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded ${
                    currentPage === index + 1
                      ? "bg-secondary text-white"
                      : "border border-secondary text-gray-400 hover:bg-secondary hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded border border-secondary text-gray-600 hover:bg-secondary hover:text-white flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
