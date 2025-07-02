import { CommonBanner } from "@/components/ui/CommonBanner";
import React from "react";
import bannerImage from "@/assets/blogs/Frame 2147225627.png";
import Blog from "@/components/AllBlogs/Blog";

export default function page() {
  return (
    <div>
      <CommonBanner backgroundImage={bannerImage} title="Blog Articles" />
      <Blog/>
    </div>
  );
}
