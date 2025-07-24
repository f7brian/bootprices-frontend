import Link from "next/link"
// import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import footerLogo from "@/assets/bootpricesLogo_white 1.png"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4  py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[80px] lg:gap-[140px]">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start gap-4 mb-4">
              <Link href="/" className="text-2xl font-bold">
              <Image src={footerLogo} className="h-12 w-auto object-contain m-0 p-0" alt="footer_logo"/>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              BootPrices helps you compare and find the best deals on high-quality boots across trusted retailers.
            </p>
          </div>    
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-orange-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Terms & Condition
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Social Media */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#A75202] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-white text-sm">© 2025 BootPrices. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
