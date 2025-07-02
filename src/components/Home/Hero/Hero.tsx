import desktopHero from "@/assets/home/BootCornucopia_desktopFinal.jpg";
import mobileHero from "@/assets/home/BootCornucopia_MobileFinal.jpg";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full pt-24 md:pt-28 lg:pt-32 lg:px-5">
      {/* Desktop Version */}
      <div
        className="hidden lg:block container px-4 mx-auto w-full h-[500px]  overflow-hidden"
        style={{
          backgroundImage: `url(${desktopHero.src})`,
          backgroundSize: "contain",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto  h-full flex items-center">
          <div className="max-w-[650px] space-y-6 px-[40px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl lg:leading-[130%] font-bold text-gray-800 leading-tight mb-10">
              Discover unbeatable deals on{" "}
              <span className="text-[#9F6206]">premium boots</span> from the
              best brands.
            </h1>
            <Link
              href={`https://www.amazon.com/s?k=boots&language=en_US&crid=2YJMZAXV4N6ZQ&linkCode=ll2&linkId=2e736eb5059606b71be437ad3c19ca10&sprefix=bo%2Caps%2C312&tag=countrydancin-20&ref=as_li_ss_tl`}
              target="_blank"
              className="bg-secondary hover:bg-primary text-white px-8  md:px-10 py-4 text-xl rounded-md "
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div
        className="lg:hidden w-full  sm:min-h-[80vh] md:min-h-[100vh] flex flex-col items-center justify-center px-6 py-[30px]"
        style={{
          backgroundImage: `url(${mobileHero.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center space-y-8 max-w-[650px] mx-auto">
          <h1 className="text-[20px] sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-[200px] sm:mb-[500px] md:mb-[525x]">
            Discover unbeatable deals on{" "}
            <span className="text-[#9F6206]">premium boots</span> from the best
            brands.
          </h1>
          <div>
            <Link
              href={`https://www.amazon.com/s?k=boots&language=en_US&crid=2YJMZAXV4N6ZQ&linkCode=ll2&linkId=2e736eb5059606b71be437ad3c19ca10&sprefix=bo%2Caps%2C312&tag=countrydancin-20&ref=as_li_ss_tl`}
              target="_blank"
              className="bg-secondary hover:bg-primary text-white px-8 py-4 text-lg font-semibold rounded-md mt-20 "
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
