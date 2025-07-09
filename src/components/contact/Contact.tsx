"use client";

import type React from "react";
import { useRef, useState } from "react";

import email from "@/assets/contact/fi_12932866 (1).png";
import location from "@/assets/contact/fi_927667.png";
import { cn } from "@/lib/utils";
import { useContactMutation } from "@/redux/api/contactApi";
import Image from "next/image";
import { toast } from "sonner";

interface ContactSectionProps {
  className?: string;
}

export default function Contact({ className }: ContactSectionProps) {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    orderNumber: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [contactFn] = useContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await contactFn(formData).unwrap();

      if (res) {
        toast.success("Email sent successfully!");
      }
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        orderNumber: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("py-20 px-4 container mx-auto", className)}>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Need help with an order or product?
        </h1>
        <p className="text-grey max-w-3xl mx-auto">
          We’re here to make your shopping experience smooth and satisfying.
          Reach out to our support team — we’re ready to assist!
        </p>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-6 mb-12">
        <div className="bg-[#FFF5E6] rounded-lg p-8 flex flex-col items-center text-center border border-secondary w-full md:w-[490px] md:h-[280px] h-full">
          <div className="w-20 h-20 rounded-full border border-primary flex items-center justify-center mb-4">
            <Image
              src={email || "/placeholder.svg"}
              className="w-10 h-10 object-contain"
              alt="email icon"
            />
          </div>
          <h3 className="font-bold text-2xl mb-4">Get In Touch</h3>
          <p className="text-lg text-grey mb-1">
            714.351.5772:{" "}
            <span className="text-secondary"><a href="mailto:bootprices@gmail.com" className="text-secondary hover:underline">bootprices@gmail.com</a></span>
          </p>
        </div>

        <div className="bg-[#FFF5E6] rounded-lg p-8 flex flex-col items-center text-center border border-secondary w-full md:w-[490px] md:h-[280px] h-full">
          <div className="w-20 h-20 rounded-full border border-primary flex items-center justify-center mb-4">
            <Image
              src={location || "/placeholder.svg"}
              className="w-10 h-10 object-contain"
              alt="email icon"
            />
          </div>
          <h3 className="font-bold text-2xl mb-4">Location</h3>
          <p className="text-lg text-grey mb-1">
            2528 Wallace Ave. Fullerton, CA 92831
          </p>
          </div>
      </div>

      <div className="bg-[#ffffffee] shadow-md rounded-lg p-8 max-w-3xl mx-auto">
        <form ref={form} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-grey mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Full Name..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-grey mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Email..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-grey mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Phone number..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-grey mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Location..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="orderNumber"
                className="block text-sm font-medium text-grey mb-1"
              >
                Order Number (URL)
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Order number URL..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-grey mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Message..."
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 bg-secondary text-white font-medium rounded-md hover:bg-primary focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
