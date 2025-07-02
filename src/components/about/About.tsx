"use client";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import { BeautifulPageLoading } from "../ui/BeautifulSpinner";

export default function About() {
  const { data, isLoading } = useGetAboutQuery({});
  const aboutData = data?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <BeautifulPageLoading text="Loading about data..." variant="gradient" />
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-600 pt-2">
      <div
        className="container tinymce-content mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: aboutData?.details || "" }}
      />
    </div>
  );
}
