/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useGetSingleBlogQuery } from "@/redux/api/blogApi";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BeautifulPageLoading } from "../ui/BeautifulSpinner";
import { Skeleton } from "antd";
import { WordPressPost } from "@/types/wordpress";

export default function SingleBlog() {
  const params = useParams();
  const slug = params?.slug as string;

  // Use the slug for the API request
  const { data, isLoading, isError, error } = useGetSingleBlogQuery(slug);

  const singleBlog: WordPressPost | undefined = data;

  // Helper function to extract text from HTML
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (isLoading) {
    return (
      <div className="bg-white pt-16 lg:pt-28">
        <div className="container mx-auto px-4">
          <BeautifulPageLoading text="Loading blog post..." variant="gradient" />
          {/* Or use skeleton loading */}
          <div className="space-y-8">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white pt-16 lg:pt-48">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Failed to load blog post
          </h2>
          <p className="text-gray-600 mb-6">
            {(error as any)?.data?.message || "An unknown error occurred"}
          </p>
          <Link
            href="/blog"
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!singleBlog) {
    return (
      <div className="bg-white pt-16 lg:pt-48">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Blog post not found
          </h2>
          <p className="text-gray-600 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/blog"
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="bg-white pt-16 lg:pt-28">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="py-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-gray-900">
              Blog
            </Link>
            <span>›</span>
            <span className="text-gray-900">{singleBlog?.title?.rendered ? stripHtml(singleBlog.title.rendered) : 'Blog Post'}</span>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={singleBlog._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg"}
            alt={singleBlog?.title?.rendered ? stripHtml(singleBlog.title.rendered) : 'Blog post image'}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="container mx-auto ">
          {/* Publication Date */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              Published:{" "}
              {singleBlog?.date
                ? new Date(singleBlog.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Date not available"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {singleBlog?.title?.rendered ? stripHtml(singleBlog.title.rendered) : 'Blog Post'}
          </h1>

          <section className="mb-8 prose max-w-none">
            <div
              className="tinymce-content"
              dangerouslySetInnerHTML={{
                __html: singleBlog?.content?.rendered || "",
              }}
            />
          </section>
        </article>
      </div>
    </div>
    </>
  );
}
