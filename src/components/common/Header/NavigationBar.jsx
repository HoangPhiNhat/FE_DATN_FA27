"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useCategoryQuery from "@/hooks/useCategory/useCategoryQuery";

const NavigationBar = () => {
  const pathname = usePathname();
  const scrollContainerRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const {
    data: categories,
    isLoading,
    isError,
  } = useCategoryQuery("GET_ALL_CATEGORY");

  useEffect(() => {
    const checkScreenAndScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const isDesktop = window.innerWidth >= 1024;
      setShowArrows(isDesktop);

      if (isDesktop) {
        const hasScrollableContent =
          container.scrollWidth > container.clientWidth;
        if (hasScrollableContent) {
          setShowLeftArrow(container.scrollLeft > 0);
          setShowRightArrow(
            container.scrollLeft < container.scrollWidth - container.clientWidth
          );
        } else {
          setShowLeftArrow(false);
          setShowRightArrow(false);
        }
      }
    };

    checkScreenAndScroll();

    window.addEventListener("resize", checkScreenAndScroll);
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScreenAndScroll);
    }

    return () => {
      window.removeEventListener("resize", checkScreenAndScroll);
      if (container) {
        container.removeEventListener("scroll", checkScreenAndScroll);
      }
    };
  }, [categories]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="flex items-center justify-center w-full px-4 lg:px-10 h-16">
        {pathname === "/cart" ? (
          <div className="container">
            <div className="flex items-center gap-2">
              <Image
                src="/gif/shopping-cart.gif"
                alt="Shopping Cart"
                width={30}
                height={30}
              />
              <span className="text-sm text-gray-500 animate-fade-right">
                Giỏ hàng của bạn
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-screen-xl">
            {showArrows && showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
              >
                <IoIosArrowBack className="w-6 h-6 text-gray-600" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className="flex items-center md:justify-center gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 lg:px-8"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {categories?.data?.map((category) => (
                <div
                  key={category.id}
                  className="relative flex-shrink-0 lg:flex-shrink"
                >
                  <Link
                    href={`/products?category=${category.id}`}
                    className="hover:text-primary hover:font-bold whitespace-nowrap text-sm lg:text-base"
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>

            {showArrows && showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
              >
                <IoIosArrowForward className="w-6 h-6 text-gray-600" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
