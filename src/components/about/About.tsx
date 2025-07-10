"use client";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import { BeautifulPageLoading } from "../ui/BeautifulSpinner";

export default function About() {
  const { data, isLoading, isError } = useGetAboutQuery({});
  const aboutData = data?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <BeautifulPageLoading text="Loading about data..." variant="gradient" />
      </div>
    );
  }

  if (isError || !aboutData) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-medium text-gray-700">
          About Content Not Available
        </h2>
        <p className="mt-2 text-gray-500">
          We&apos;re sorry, but the about page content couldn&apos;t be loaded at this time.
        </p>
      </div>
    );
  }

  if (!aboutData.details) {
    return (
      <div className="container mx-auto py-8 text-center">
       
        <p className="mt-2 text-[25px] font-bold text-gray-500">
          The about page content is currently being prepared. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-600 pt-2">
      <div
        className="container tinymce-content mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: aboutData.details }}
      />
    </div>
  );
}