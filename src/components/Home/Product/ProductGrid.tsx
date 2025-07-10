"use client";
import { BeautifulPageLoading } from "@/components/ui/BeautifulSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/Checkbox";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { Slider } from "antd";
import { ArrowUpRight, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  ASIN: string;
  Brand: {
    DisplayValue: string;
  };
  DetailPageURL: string;
  Image: {
    URL: string;
  };
  Price: string;
  Title: string;
}

export default function ProductGrid() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBootStyle, setSelectedBootStyle] = useState("");
  const [showAllBootStyles, setShowAllBootStyles] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  // Add this state at the top with your other state declarations
  const [isPriceManuallyChanged, setIsPriceManuallyChanged] = useState(false);

  // Complete brand list in correct order - all 33 brands
  const allBrands = [
    "ARIAT",
    "Timberland",
    "Dr. Martens",
    "Columbia",
    "UGG",
    "Hunter",
    "Under Armour",
    "Nike",
    "Crocs",
    "adidas",
    "Skechers",
    "New Balance",
    "Carhartt",
    "Wolverine",
    "Danner",
    "Merrell",
    "KEEN",
    "Georgia Boot",
    "Thorogood",
    "CAT",
    "ROCKY",
    "MUCK",
    "Steve Madden",
    "PUMA",
    "Vionic",
    "TOMS",
    "Lucky Brand",
    "Rockport",
    "Dr.Scholl's",
    "Clarks",
    "Hey Dude",
    "Cole Haan",
    "LifeStride",
  ];

  // Static boot styles list
  const allBootStyles = [
    "Work",
    "Hiking",
    "Cowboy / Western",
    "Rain",
    "Chelsea",
    "Combat",
    "Cold Weather",
    "Riding",
    "Casual / Fashion",
  ];

  // Gender options
  const genderOptions = ["Men", "Women", "Boys", "Girls", "Babies", "Unisex"];

  // Handle gender selection
  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) => {
      if (prev.includes(gender)) {
        return prev.filter((g) => g !== gender);
      } else {
        return [...prev, gender];
      }
    });
    setPage(1);
  };

  const displayedBrands = allBrands; // Show all brands with scroll

  const displayedBootStyles = showAllBootStyles
    ? allBootStyles
    : allBootStyles.slice(0, 10);
  const hasMoreBootStyles = allBootStyles.length > 10;

  // Get filtered products based on selected brands and filters
  const { data, isLoading } = useGetProductsQuery({
    page,
    brand: selectedBrand,
    category: selectedBootStyle,
    sortBy: sortBy,
    minPrice: minPrice,
    maxPrice: maxPrice,
    gender: selectedGenders.join(","),
  });

  const products = data?.data?.result || [];

  // clean price values

  const cleanPrice = (price: string | undefined): string => {
    if (!price) return "N/A";

    // Remove any parenthetical price information like "(XX.XX/Count)"
    return price.replace(/\s*\([^)]*\)/g, "").trim();
  };

  return (
    <>
      <section className="pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-4 mt-10 md:mt-10 lg:mt-0">
            <p className="text-center">
              As an Amazon Associate, I earn from qualifying purchases. This
              site contains affiliate links, which may earn a small commission
              at no cost to you.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-1 flex justify-end">
              <Button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>

            {/* Sidebar Filter */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-[#f9ecda] border border-gray-200 rounded-lg p-6 space-y-6">
                {/* Add Boot Styles Dropdown */}
                <div>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700"
                    value={selectedBootStyle}
                    onChange={(e) => {
                      setSelectedBootStyle(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="">All Boot Styles</option>
                    <option value="Work">Work</option>
                    <option value="Hiking">Hiking</option>
                    <option value="Cowboy / Western">Cowboy / Western</option>
                    <option value="Rain">Rain</option>
                    <option value="Chelsea">Chelsea</option>
                    <option value="Combat">Combat</option>
                    <option value="Cold Weather">Cold Weather</option>
                    <option value="Riding">Riding</option>
                    <option value="Casual / Fashion">Casual / Fashion</option>
                  </select>
                </div>

                {/* Gender Filter */}
                <div className="border-t border-gray-200">
                  <h3 className="text-gray-900 mb-3 mt-4">Gender</h3>
                  <div className="space-y-2">
                    {genderOptions.map((gender: string) => (
                      <div key={gender} className="flex items-center space-x-2">
                        <Checkbox
                          id={gender}
                          checked={selectedGenders.includes(gender)}
                          onCheckedChange={() => handleGenderChange(gender)}
                        />
                        <label
                          htmlFor={gender}
                          className="text-gray-700 cursor-pointer"
                        >
                          {gender}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200">
                  <h3 className=" text-gray-900 mb-3 mt-4">Brand</h3>
                  <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2 brand-filter-scroll-container">
                    {displayedBrands.map((brandName: string) => (
                      <div
                        key={brandName}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={brandName}
                          checked={selectedBrand === brandName}
                          onCheckedChange={() => {
                            setSelectedBrand(
                              selectedBrand === brandName ? "" : brandName
                            );
                            setPage(1);
                          }}
                        />
                        <label
                          htmlFor={brandName}
                          className=" text-gray-700 cursor-pointer"
                        >
                          {brandName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* boots style checkbox */}
                <div className="border-t border-gray-200">
                  <h3 className=" text-gray-900 mb-3 mt-4">Boot Styles</h3>
                  <div className="space-y-2">
                    {displayedBootStyles.map((bootStyle: string) => (
                      <div
                        key={bootStyle}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={bootStyle}
                          checked={selectedBootStyle === bootStyle}
                          onCheckedChange={() => {
                            setSelectedBootStyle(
                              selectedBootStyle === bootStyle ? "" : bootStyle
                            );
                            setPage(1);
                          }}
                        />
                        <label
                          htmlFor={bootStyle}
                          className=" text-gray-700 cursor-pointer"
                        >
                          {bootStyle}
                        </label>
                      </div>
                    ))}
                    {hasMoreBootStyles && (
                      <button
                        onClick={() => setShowAllBootStyles(!showAllBootStyles)}
                        className="pt-2 text-[#575757] flex items-start border-b"
                      >
                        {showAllBootStyles ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="border-t border-gray-200">
                  <h3 className=" text-gray-900 mb-3 mt-4 ">Price</h3>
                  <div className="space-y-4">
                    {/* Price Range Display */}
                    <div className=" text-gray-700 ">
                      ${minPrice} – ${maxPrice}+
                    </div>
                    {/* Ant Design Slider */}
                    <div className="px-2 flex items-center space-x-3">
                      <Slider
                        range
                        min={0}
                        max={50000}
                        value={[minPrice, maxPrice]}
                        onChange={(value) => {
                          setMinPrice(value[0]);
                          setMaxPrice(value[1]);
                          setSelectedPriceRange("");
                          setPage(1);
                        }}
                        className="flex-1"
                        trackStyle={[{ backgroundColor: "#0891b2" }]}
                        handleStyle={[
                          {
                            backgroundColor: "#0891b2",
                            borderColor: "#0891b2",
                          },
                          {
                            backgroundColor: "#0891b2",
                            borderColor: "#0891b2",
                          },
                          {
                            backgroundColor: "#0891b2",
                            borderColor: "#0891b2",
                          },
                        ]}
                      />
                      <Button
                        size="sm"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded border"
                        onClick={() => {
                          // Trigger search/filter update
                          setPage(1);
                        }}
                      >
                        Go
                      </Button>
                    </div>

                    {(isPriceManuallyChanged ||
                      minPrice !== 0 ||
                      maxPrice !== 50000) && (
                      <div className="">
                        <button
                          onClick={() => {
                            setMinPrice(0);
                            setMaxPrice(50000);
                            setSelectedPriceRange("");
                            setIsPriceManuallyChanged(false);
                            setPage(1);
                          }}
                          className="text-[#0891b2] hover:text-[#0890b291] cursor-pointer flex items-center space-x-1"
                        >
                          <span>Reset price range</span>
                        </button>
                        {/* <button
                          onClick={() => {
                            setMinPrice(0);
                            setMaxPrice(500);
                            setSelectedPriceRange("");
                            setIsPriceManuallyChanged(false); // Reset this flag
                            setPage(1);
                          }}
                          className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer mt-1"
                        >
                          ✕ Clear
                        </button> */}
                      </div>
                    )}
                    {/* Price Range Text Options */}
                    <div className="space-y-1 pt-2 inline-flex flex-col">
                      <div
                        className={` cursor-pointer hover:text-orange-600 ${
                          selectedPriceRange === "up-to-80"
                            ? "text-orange-600 "
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedPriceRange("up-to-80");
                          setMinPrice(0);
                          setMaxPrice(80);
                          setPage(1);
                        }}
                      >
                        Up to $80
                      </div>
                      <div
                        className={` cursor-pointer hover:text-orange-600 ${
                          selectedPriceRange === "80-to-100"
                            ? "text-orange-600 "
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedPriceRange("80-to-100");
                          setMinPrice(80);
                          setMaxPrice(100);
                          setPage(1);
                        }}
                      >
                        $80 to $100
                      </div>
                      <div
                        className={` cursor-pointer hover:text-orange-600 ${
                          selectedPriceRange === "100-above"
                            ? "text-orange-600 "
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedPriceRange("100-above");
                          setMinPrice(100);
                          setMaxPrice(500);
                          setPage(1);
                        }}
                      >
                        $100 & above
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sort By Dropdown */}
                <div className="border-t border-gray-200">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 mt-4"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="">Sort By</option>
                    <option value="bestSellersOnly">Best Sellers</option>
                    <option value="newArrivals">Newest Arrivals</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Modal */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  onClick={() => setIsMobileFilterOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 w-[350px] bg-[#f9ecda] shadow-xl overflow-y-auto transform transition-all duration-300 ease-out translate-x-0 animate-in slide-in-from-left">
                  <div className="">
                    <div className="flex items-center justify-between mb-6 px-6 pt-6">
                      <h2 className="text-lg  text-gray-900">Filters</h2>
                      {/* <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                      >
                        <X className="h-5 w-5" />
                      </button> */}
                    </div>
                    <div className="space-y-6">
                      {/* Add Boot Styles Dropdown for Mobile */}
                      <div className="px-6">
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700"
                          value={selectedBootStyle}
                          onChange={(e) => {
                            setSelectedBootStyle(e.target.value);
                            setPage(1);
                            // setIsMobileFilterOpen(false);
                          }}
                        >
                          <option value="">All Boot Styles</option>
                          <option value="Work">Work</option>
                          <option value="Hiking">Hiking</option>
                          <option value="Cowboy / Western">
                            Cowboy / Western
                          </option>
                          <option value="Rain">Rain</option>
                          <option value="Chelsea">Chelsea</option>
                          <option value="Combat">Combat</option>
                          <option value="Cold Weather">Cold Weather</option>
                          <option value="Riding">Riding</option>
                          <option value="Casual / Fashion">
                            Casual / Fashion
                          </option>
                        </select>
                      </div>

                      {/* Gender Filter for Mobile */}
                      <div className="px-6">
                        <h3 className="text-gray-900 mb-3">Gender</h3>
                        <div className="space-y-2">
                          {genderOptions.map((gender: string) => (
                            <div
                              key={gender}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`${gender}-mobile`}
                                checked={selectedGenders.includes(gender)}
                                onCheckedChange={() =>
                                  handleGenderChange(gender)
                                }
                              />
                              <label
                                htmlFor={`${gender}-mobile`}
                                className="text-gray-700 cursor-pointer"
                              >
                                {gender}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-gray-900 mb-3 px-6">Brand</h3>
                        <div className="relative">
                          <div className="space-y-2 pt-2 max-h-[450px] overflow-y-scroll pr-2 relative px-6">
                            {displayedBrands.map((brandName: string) => (
                              <div
                                key={brandName}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${brandName}-mobile`}
                                  checked={selectedBrand === brandName}
                                  onCheckedChange={() => {
                                    setSelectedBrand(
                                      selectedBrand === brandName
                                        ? ""
                                        : brandName
                                    );
                                    setPage(1);
                                  }}
                                />
                                <label
                                  htmlFor={`${brandName}-mobile`}
                                  className="text-gray-700 cursor-pointer"
                                >
                                  {brandName}
                                </label>
                              </div>
                            ))}
                          </div>
                          {/* Linear gradient fade at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f9ecdae6] to-transparent pointer-events-none"></div>
                          {/* Sticky dropshadow effect */}
                          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
                        </div>
                      </div>

                      {/* Boot Styles for Mobile */}
                      <div className="border-t border-gray-200 pt-4 px-6">
                        <h3 className="text-gray-900 mb-3">Boot Styles</h3>
                        <div className="space-y-2">
                          {displayedBootStyles.map((bootStyle: string) => (
                            <div
                              key={bootStyle}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`${bootStyle}-mobile`}
                                checked={selectedBootStyle === bootStyle}
                                onCheckedChange={() => {
                                  setSelectedBootStyle(
                                    selectedBootStyle === bootStyle
                                      ? ""
                                      : bootStyle
                                  );
                                  setPage(1);
                                }}
                              />
                              <label
                                htmlFor={`${bootStyle}-mobile`}
                                className="text-gray-700 cursor-pointer"
                              >
                                {bootStyle}
                              </label>
                            </div>
                          ))}
                          {hasMoreBootStyles && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setShowAllBootStyles(!showAllBootStyles)
                              }
                              className="w-full mt-2 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                            >
                              {showAllBootStyles ? "Show less" : "Show more"}
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Price Range for Mobile */}
                      <div className="border-t border-gray-200 pt-4 px-6">
                        <h3 className="text-gray-900 mb-3">Price</h3>
                        <div className="space-y-4">
                          <div className="text-gray-700">
                            ${minPrice} – ${maxPrice}+
                          </div>
                          <div className="px-2 flex items-center space-x-3">
                            <Slider
                              range
                              min={0}
                              max={50000}
                              value={[minPrice, maxPrice]}
                              onChange={(value) => {
                                setMinPrice(value[0]);
                                setMaxPrice(value[1]);
                                setSelectedPriceRange("");
                                setIsPriceManuallyChanged(true);
                                setPage(1);
                              }}
                              className="flex-1"
                              trackStyle={[{ backgroundColor: "#0891b2" }]}
                              handleStyle={[
                                {
                                  backgroundColor: "#0891b2",
                                  borderColor: "#0891b2",
                                },
                                {
                                  backgroundColor: "#0891b2",
                                  borderColor: "#0891b2",
                                },
                                {
                                  backgroundColor: "#0891b2",
                                  borderColor: "#0891b2",
                                },
                              ]}
                            />
                          </div>
                          {/* Reset Price Range - only show when price has been changed */}
                          {(minPrice !== 0 || maxPrice !== 500) && (
                            <div className="">
                              <button
                                onClick={() => {
                                  setMinPrice(0);
                                  setMaxPrice(5000);
                                  setSelectedPriceRange("");
                                  setPage(1);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer flex items-center space-x-1"
                              >
                                <span>Reset price range</span>
                              </button>
                            </div>
                          )}
                          <div className="space-y-1 pt-2">
                            <div
                              className={`cursor-pointer hover:text-orange-600 ${
                                selectedPriceRange === "up-to-80"
                                  ? "text-orange-600"
                                  : "text-gray-700"
                              }`}
                              onClick={() => {
                                setSelectedPriceRange("up-to-80");
                                setMinPrice(0);
                                setMaxPrice(80);
                                setPage(1);
                              }}
                            >
                              Up to $80
                            </div>
                            <div
                              className={`cursor-pointer hover:text-orange-600 ${
                                selectedPriceRange === "80-to-100"
                                  ? "text-orange-600"
                                  : "text-gray-700"
                              }`}
                              onClick={() => {
                                setSelectedPriceRange("80-to-100");
                                setMinPrice(80);
                                setMaxPrice(100);
                                setPage(1);
                              }}
                            >
                              $80 to $100
                            </div>
                            <div
                              className={`cursor-pointer hover:text-orange-600 ${
                                selectedPriceRange === "100-above"
                                  ? "text-orange-600"
                                  : "text-gray-700"
                              }`}
                              onClick={() => {
                                setSelectedPriceRange("100-above");
                                setMinPrice(100);
                                setMaxPrice(500);
                                setPage(1);
                              }}
                            >
                              $100 & above
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sort By Dropdown for Mobile */}
                      <div className="border-t border-gray-200 pt-4 px-6">
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700"
                          value={sortBy}
                          onChange={(e) => {
                            setSortBy(e.target.value);
                            setPage(1);
                          }}
                        >
                          <option value="">Sort By</option>
                          <option value="bestSellersOnly">Best Sellers</option>
                          <option value="newArrivals">Newest Arrivals</option>
                          <option value="priceLowToHigh">
                            Price: Low to High
                          </option>
                          <option value="priceHighToLow">
                            Price: High to Low
                          </option>
                        </select>
                      </div>

                      {/* apply button */}
                      <div className="px-6 pb-6">
                        <button
                          onClick={() => setIsMobileFilterOpen(false)}
                          className="text-[21px] px-6 py-2 bg-secondary text-white rounded-md hover:bg-primary transition-colors w-full"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="container mx-auto">
                  <BeautifulPageLoading
                    text="Loading product data..."
                    variant="gradient"
                  />
                </div>
              ) : products?.products?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">Product not available</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.products?.map((product: Product) => (
                      <Card
                        key={product.ASIN}
                        className="border border-gray-200 hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="">
                          <div className="aspect-square mb-4 rounded-lg flex items-center justify-center bg-white p-4">
                            <Link
                              href={product.DetailPageURL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                src={product.Image?.URL || "/placeholder.svg"}
                                alt={product?.Title}
                                width={300}
                                height={300}
                                className="object-contain w-full h-full max-w-full max-h-[300px]"
                              />
                            </Link>
                          </div>
                          <div className="px-5 pb-5">
                            <Link
                              href={product.DetailPageURL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <h3 className=" text-gray-900 mb-1 text-[20px] truncate">
                                {product?.Title}
                              </h3>
                            </Link>
                            <p className="text-base text-gray-600 mb-3">
                              {product?.Brand?.DisplayValue}
                            </p>
                            <button
                              onClick={() =>
                                window.open(
                                  product.DetailPageURL,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                              className="relative flex items-center text-[14px] md:text-[24px] font-bold justify-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition-colors w-full"
                            >
                              <span>Amazon :</span>
                              <span className="ml-6">
                                {cleanPrice(product.Price)}
                              </span>
                              <div className="absolute right-0 top-0">
                                <ArrowUpRight />
                              </div>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className=" text-gray-600 text-center sm:text-left">
                      Showing page {page} out of 10
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                      {/* Previous/Next buttons for mobile */}
                      <div className="flex items-center justify-center space-x-2 sm:hidden">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 max-w-[120px]"
                          disabled={page === 1}
                          onClick={() =>
                            setPage((prev) => Math.max(prev - 1, 1))
                          }
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        <span className=" text-gray-600 px-2">{page} / 10</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 max-w-[120px]"
                          disabled={page === 10}
                          onClick={() =>
                            setPage((prev) => Math.min(prev + 1, 10))
                          }
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>

                      {/* Full pagination for desktop */}
                      <div className="hidden sm:flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="p-2"
                          disabled={page === 1}
                          onClick={() =>
                            setPage((prev) => Math.max(prev - 1, 1))
                          }
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>

                        {/* Show condensed pagination on smaller screens */}
                        <div className="hidden md:flex items-center space-x-2">
                          {[...Array(10)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <Button
                                key={pageNumber}
                                variant="outline"
                                size="sm"
                                className={
                                  page === pageNumber
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : ""
                                }
                                onClick={() => setPage(pageNumber)}
                              >
                                {pageNumber}
                              </Button>
                            );
                          })}
                        </div>

                        {/* Condensed pagination for tablet */}
                        <div className="flex md:hidden items-center space-x-2">
                          {page > 2 && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(1)}
                              >
                                1
                              </Button>
                              {page > 3 && (
                                <span className="text-gray-400">...</span>
                              )}
                            </>
                          )}

                          {[page - 1, page, page + 1].map((pageNumber) => {
                            if (pageNumber < 1 || pageNumber > 10) return null;
                            return (
                              <Button
                                key={pageNumber}
                                variant="outline"
                                size="sm"
                                className={
                                  page === pageNumber
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : ""
                                }
                                onClick={() => setPage(pageNumber)}
                              >
                                {pageNumber}
                              </Button>
                            );
                          })}

                          {page < 9 && (
                            <>
                              {page < 8 && (
                                <span className="text-gray-400">...</span>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(10)}
                              >
                                10
                              </Button>
                            </>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="p-2"
                          disabled={page === 10}
                          onClick={() =>
                            setPage((prev) => Math.min(prev + 1, 10))
                          }
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
