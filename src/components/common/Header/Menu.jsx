"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MenuItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); 

  return (
    <div
      className="relative group *:text-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <a
        href={item.href}
        className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center transition duration-300 ease-in-out"
      >
        {item.label}
        {item.children && (
          <svg
            className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </a>
      {item.children && (
        <div
          className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 ease-in-out ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1 pointer-events-none"
          }`}
          style={{
            top: "100%",
            paddingTop: "0.5rem",
          }}
        >
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const Menu = ({ items }) => {
  return (
    <nav className="bg-white shadow">
      <div className="container">
        <div className="flex w-full items-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/images/Shark_Logo.jpg"
                width={45}
                height={10}
                className="max-w-[185px] h-auto"
                alt="Shark Logo"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {items.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </div>
            <div className="flex gap-4 *:text-lg">
              <button>
                <Image
                  src="/icons/search.svg"
                  width={22}
                  height={20}
                  alt="Shark Logo"
                />
              </button>
              <button>
                <Link href="/account/login">
                  <Image
                    src="/icons/user-account.svg"
                    width={22}
                    height={20}
                    alt="Shark Logo"
                  />
                </Link>
              </button>
              <button>
                <Image
                  src="/icons/location.webp"
                  width={22}
                  height={20}
                  alt="Shark Logo"
                />
              </button>
              <button className="relative">
                <Image
                  src="/icons/shopping-cart.svg"
                  width={22}
                  height={20}
                  alt="Shark Logo"
                />
                <div className="absolute -top-2 -right-[10px] bg-red-700  rounded-full flex justify-center items-center h-[20px] w-[20px]">
                  <span className="text-white text-[11px] ">99</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
