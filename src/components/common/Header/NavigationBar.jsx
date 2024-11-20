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
  const [showCollection, setShowCollection] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animationDone, setAnimationDone] = useState(false); // Theo dõi trạng thái animation

  const {
    data: category,
    isLoading,
    isError,
  } = useCategoryQuery("GET_ALL_CATEGORY");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="w-full bg-[#F5F5F3] relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-10 pb-4 lg:pb-0 h-full lg:h-24">
          {pathname === "/cart" ? (
            <div className="container ">
              {!animationDone ? (
                <div
                  className="effect-gif-ltr"
                  onAnimationEnd={() => setAnimationDone(true)}
                >
                  <img
                    src="/gif/shopping-cart.gif"
                    alt="Sample GIF"
                    style={{ width: "30px", height: "auto" }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4 animate-fade-right">
                  <img
                    src="/gif/shopping-cart.gif"
                    alt="Sample GIF"
                    style={{ width: "30px", height: "auto" }}
                  />
                  <h1 className="text-xl">Giỏ hàng của bạn</h1>
                </div>
              )}
            </div>
          ) : (
            <>
              <div
                onMouseEnter={() => setShowCollection(true)}
                onMouseLeave={() => setShowCollection(false)}
                className="relative flex h-14 cursor-pointer items-center gap-2 z-10"
              >
                <HiOutlineMenuAlt4 className="w-5 h-5" />
                <p className="text-[14px] font-normal">Collections</p>

                {showCollection && (
                  <ul className="bg-white absolute top-full left-0 w-fit text-[#767676] p-4 pb-6 shadow-md rounded-lg">
                    {[
                      "Accessories",
                      "Furniture",
                      "Electronics",
                      "Clothes",
                      "Bags",
                      "Home appliances",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:bg-gray-200 hover:text-black duration-300 cursor-pointer whitespace-nowrap"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* <div className="flex items-center gap-6">
                {category.map((v, i) => (
                  <Link
                    key={i}
                    href={v.name}
                    className="hover:text-primary hover:font-bold"
                  >
                    {v.name}
                  </Link>
                ))}
              </div> */}

              {/* Search Bar (commented out, can enable if needed) */}
              {/* <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primary bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
              <input
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search your products here"
              />
              <FaSearch className="w-5 h-5" />
            </div> */}

              <div className="flex gap-4 mt-2 lg:mt-0 items-center cursor-pointer relative">
                {/* <div onClick={() => setShowUser(!showUser)} className="flex">
                  <FaUser />
                  <FaCaretDown />
                </div>
                {showUser && (
                  <ul className="absolute top-6 left-0 z-50 bg-primary w-44 text-[#767676] h-auto p-4 pb-6">
                    <Link href="/signin">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Login
                      </li>
                    </Link>
                    <Link onClick={() => setShowUser(false)} href="/signup">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Sign Up
                      </li>
                    </Link>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Profile
                    </li>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Others
                    </li>
                  </ul>
                )} */}

                <Link href="/cart">
                  <div className="relative">
                    <FaShoppingCart />
                    <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white">
                      2
                    </span>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
