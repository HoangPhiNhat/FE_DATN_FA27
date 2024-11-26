"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { category } from "../../../../data.example";
import { usePathname } from "next/navigation";
import useCategoryQuery from "@/hooks/useCategory/useCategoryQuery";

const NavigationBar = () => {
  const pathname = usePathname();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);
  const {
    data: categories,
    isLoading,
    isError,
  } = useCategoryQuery("GET_ALL_CATEGORY");

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center w-full px-10 pb-4 lg:pb-0 h-full lg:h-24">
        {pathname === "/cart" ? (
          <div className="container ">
            <div
              className="effect-gif-ltr flex items-center gap-2"
              onAnimationEnd={() => setAnimationDone(true)}
            >
              <img
                src="/gif/shopping-cart.gif"
                alt="Sample GIF"
                style={{ width: "30px", height: "auto" }}
              />
              {animationDone && (
                <span className="text-sm text-gray-500 animate-fade-right">Giỏ hàng của bạn</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            {categories?.data?.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={`/${category.slug}`}
                  className="hover:text-primary hover:font-bold"
                >
                  {category.name}
                </Link>

                {/* Submenu */}
                {category.children.length > 0 &&
                  hoveredCategory === category.id && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50">
                      {category.children.map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          href={`/${category.slug}/${subCategory.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-primary"
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
