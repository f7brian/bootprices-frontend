"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/bootprices_logo 1.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Utility to get nav link classes
  const navLinkClass = (href: string) =>
    cn(
      "px-3 py-2 text-[20px] font-bold transition-colors",
      pathname === href ? "text-[#9F6206]" : "text-grey hover:text-[#9F6206]"
    );

  const mobileNavLinkClass = (href: string, delay: string) =>
    cn(
      `hover:bg-gray-100 px-3 py-3 text-lg font-medium rounded-md transition-all duration-200 hover:scale-105 hover:translate-x-1 animate-in slide-in-from-left ${delay}`,
      pathname === href ? "text-[#9F6206]" : "text-black hover:text-[#9F6206]"
    );

    // get token in cookies

  return (
    <header
      className={cn(
        "text-black fixed top-0 left-0 right-0 z-50 transition-all pb-9 duration-300",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 pt-5">
        <div className="flex flex-col">
          {/* Top row */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 lg:mt-12 w-[250px] lg:w-[400px]">
              <Link href="/" className="text-3xl font-bold">
                <Image
                  src={logo}
                  className="w-full  md:w-[200px] lg:w-full object-cover"
                  alt="BootPrices.com Logo"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <nav className="flex justify-end space-x-8">
                <Link href="/" className={navLinkClass("/")}>
                  Home
                </Link>
                <Link href="/blog" className={navLinkClass("/blog")}>
                  Blog
                </Link>
                <Link href="/about" className={navLinkClass("/about")}>
                  About
                </Link>
                <Link href="/contact" className={navLinkClass("/contact")}>
                  Contact
                </Link>
              </nav>

              <div className="mt-1 text-right">
                <h1 className="md:text-[16px] lg:text-[28px] text-black font-bold hidden lg:block">
                  Compare Boot Prices for Work, Hiking, Western & More
                </h1>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="text-black hover:text-[#9F6206] focus:outline-none"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
              <div className="fixed inset-0 z-50 md:hidden">
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                  onClick={() => setIsOpen(false)}
                />

                {/* Sidebar */}
                <div className="fixed top-0 left-0 h-full w-[350px] md:w-[300px] bg-[#FAF5F1] shadow-xl transform transition-all duration-300 ease-out translate-x-0 animate-in slide-in-from-left">
                  <div className="flex flex-col h-full">
                    {/* Sidebar header */}
                    <div className="flex justify-between items-center p-4 border-b animate-in fade-in slide-in-from-top duration-300 delay-100">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-bold"
                      >
                        <Image
                          src={logo}
                          className="w-[200px] object-cover"
                          alt="BootPrices.com Logo"
                        />
                      </Link>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-black hover:text-[#9F6206] focus:outline-none p-2 hover:scale-110 transition-transform duration-200 animate-in zoom-in delay-200"
                      >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </button>
                    </div>

                    {/* Sidebar nav */}
                    <nav className="flex flex-col space-y-2 p-4">
                      <Link
                        href="/"
                        className={mobileNavLinkClass("/", "delay-150")}
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        href="/blog"
                        className={mobileNavLinkClass("/blog", "delay-200")}
                        onClick={() => setIsOpen(false)}
                      >
                        Blog
                      </Link>
                      <Link
                        href="/about"
                        className={mobileNavLinkClass("/about", "delay-250")}
                        onClick={() => setIsOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className={mobileNavLinkClass("/contact", "delay-300")}
                        onClick={() => setIsOpen(false)}
                      >
                        Contact
                      </Link>
                    </nav>

                    {/* Footer tagline */}
                    {/* <div className="mt-auto p-4 border-t animate-in slide-in-from-bottom fade-in delay-350 duration-400">
                      <p className="text-sm text-gray-600 animate-pulse">
                        Compare Boot Prices for Work, Hiking, Western & More
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Tagline */}
          <div className="mt-1 md:hidden">
            <h1 className="text-[14px] font-bold text-black">
              Compare Boot Prices for Work, Hiking, Western & More
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
