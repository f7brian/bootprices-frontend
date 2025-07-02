import Contact from "@/components/contact/Contact";
import { CommonBanner } from "@/components/ui/CommonBanner";
import React from "react";
import contactImg from "@/assets/contact/section (2).png";

export default function page() {
  return (
    <div>
      <CommonBanner title="Contact" backgroundImage={contactImg} />
      <Contact />
    </div>
  );
}
