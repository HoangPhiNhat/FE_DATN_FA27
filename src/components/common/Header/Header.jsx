"use client";
import useScroll from "@/hooks/useScroll/useScroll";
import { navBarList } from "@/structures/Header";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sideNav, setSideNav] = useState(false);
  const pathname = usePathname();
  const isScrolled = useScroll(100);

  useEffect(() => {
    const ResponsiveMenu = () => {
      if (window.innerWidth < 768) {
        // Thay đổi breakpoint từ 667 thành 768 (md)
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div
      className={`w-full h-16 md:h-20 bg-white top-0 z-50 border-b-[1px] border-b-gray-200 ${
        isScrolled ? "fixed" : "sticky"
      }`}
    >
      <nav className="container h-full mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-full">
          <Link href="/">
            <div>
              <Image
                className="w-16 md:w-20 object-cover"
                src={"/images/LOGO.png"}
                width={100}
                height={100}
                alt="Hoàng Phi Nhật"
                priority
              />
            </div>
          </Link>
          <div>
            {/* Desktop Menu */}
            {showMenu && (
              <div className="hidden md:flex items-center gap-4">
                {navBarList.map((v) => (
                  <Link
                    key={v._id}
                    href={v.link}
                    className={`hover:font-bold pr-4 text-[#767676] hover:underline hover:text-primary border-r-[2px] border-r-gray-300 last:border-r-0 last:pr-0 ${
                      pathname === v.link ? "font-bold text-primary" : ""
                    }`}
                  >
                    {v.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Menu Button */}
            <HiMenuAlt2
              onClick={() => setSideNav(!sideNav)}
              className="md:hidden cursor-pointer w-6 h-6"
            />

            {sideNav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 md:hidden">
                <div className="w-[80%] max-w-[300px] h-full bg-primary p-6 relative">
                  <ul className="text-gray-200 flex flex-col gap-4">
                    {navBarList.map((item) => (
                      <li
                        className="font-normal hover:font-bold text-base text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white"
                        key={item._id}
                      >
                        <Link
                          href={item.link}
                          onClick={() => setSideNav(false)}
                          className="block w-full"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSideNav(false)}
                    className="absolute top-4 right-4 text-gray-200 hover:text-red-500"
                  >
                    <MdClose className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
