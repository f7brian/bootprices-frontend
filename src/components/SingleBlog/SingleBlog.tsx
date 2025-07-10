"use client";
import { useGetSingleBlogQuery } from "@/redux/api/blogApi";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";




export default function SingleBlog() {
  const pathName = usePathname();
  const id = pathName.split("/").pop();
  console.log("id", id);

  const { data } = useGetSingleBlogQuery(id);

  const singleBlog = data?.data;

  console.log("data in single blog", data);
  return (
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
            <span className="text-gray-900">{singleBlog?.title}</span>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={singleBlog?.photo || "/placeholder.svg"}
            alt={singleBlog?.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="container mx-auto">
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
              : ""}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {singleBlog?.title}
          </h1>

          <section className="mb-8">
            <div
              className="tinymce-content"
              dangerouslySetInnerHTML={{
                __html: singleBlog?.description || "",
              }}
            />
          </section>
        </article>
      </div>
    </div>
  );
}
