"use client"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Star } from "lucide-react"
import blogImage from "@/assets/Rectangle 5334.png"

interface BlogPost {
  title: string
  publishDate: string
  heroImage: string
  content: {
    intro: string
    intro2: string
  }
  slug: string
}

interface BlogDetailsProps {
  post: BlogPost
}

export default function BlogDetails({ post }: BlogDetailsProps) {
  return (
    <div className="bg-white pt-28">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="py-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-gray-900">
              Blog
            </Link>
            <span>›</span>
            <span className="text-gray-900">{post?.title}</span>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={blogImage || "/placeholder.svg"} alt={post?.title} fill className="object-cover" priority />
        </div>

        {/* Article Content */}
        <article className="container mx-auto">
          {/* Publication Date */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Published: {post?.publishDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">{post?.title}</h1>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">{post?.content.intro}</p>
            <p className="text-gray-700 leading-relaxed">{post?.content.intro2}</p>
          </div>

          {/* Section 1: Match Your Boot to the Trail */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">1. Match Your Boot to the Trail</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Easy Trails / Day Hikes</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Lightweight hiking shoes or low-cut boots</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Good breathability and flexibility</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Rough or Rocky Terrain</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Mid-to-high cut boots for ankle protection</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Sturdy soles with aggressive tread</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Long Backpacking Trips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">High-cut, full-support boots</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Durable construction with weatherproof features</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Fit Is Everything */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">2. Fit Is Everything</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span className="text-gray-700">Try boots with hiking socks</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span className="text-gray-700">Leave half an inch in front of toes</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span className="text-gray-700">Avoid heel slippage</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span className="text-gray-700">Break in your boots before long hikes</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Weather Considerations */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">3. Weather Considerations</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Weather</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      Boot Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Dry & Hot</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Breathable mesh uppers</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Wet & Muddy</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Waterproof (Gore-Tex) lining</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Snowy</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Insulated, high-traction soles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Materials */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">4. Boot Materials</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <div>
                  <span className="font-semibold text-gray-900">Full-grain leather</span>
                  <span className="text-gray-700"> – Rugged, durable, weather-resistant</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <div>
                  <span className="font-semibold text-gray-900">Synthetic mesh</span>
                  <span className="text-gray-700"> – Lightweight, quick drying</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <div>
                  <span className="font-semibold text-gray-900">Gore-Tex</span>
                  <span className="text-gray-700"> – Waterproof and breathable</span>
                </div>
              </li>
            </ul>
          </section>

          {/* Price Comparison Table */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Compare Prices: Top Hiking Boots of 2025
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      Boot Model
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Amazon</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">REI</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      Backcountry
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      BootPrices Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">Merrell Moab 3</div>
                        <div className="text-sm text-gray-500">Mid Waterproof</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$129.99</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$135.00</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$127.00</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-700">4.9/5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="font-medium text-gray-900">Salomon X Ultra 4 GTX</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$149.95</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$160.00</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$145.99</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-700">4.8/5</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">Columbia Newton</div>
                        <div className="text-sm text-gray-500">Ridge Plus</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$89.99</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$95.00</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$90.50</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-700">4.5/5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">Lowa Renegade</div>
                        <div className="text-sm text-gray-500">GTX Mid</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$239.99</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$240.00</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">$235.00</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-700">4.9/5</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed">
              Every hike starts with your feet. Investing in the right pair of boots tailored to your trail, weather,
              and fit will help you stay comfortable, protected, and ready to go further. Use the price comparison above
              to get the best deal on trusted brands.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
