"use client";
import useScroll from "@/hooks/useScroll/useScroll";
import { navBarList } from "@/structures/Header";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sideNav, setSideNav] = useState(false);
  const pathname = usePathname();
  const isScrolled = useScroll(100);
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);
  return (
    <div
      className={`w-full h-20 bg-white top-0 z-50 border-b-[1px] border-b-gray-200 ${
        isScrolled ? "fixed" : "sticky"
      }`}
    >
      <nav className="container h-full mx-auto relative">
        <div className="flex items-center justify-between h-full">
          <Link href="/">
            <div>
              <Image
                className="w-20 object-cover"
                src={"/images/LOGO.png"}
                width={100}
                height={100}
                alt="Hoàng Phi Nhật"
              />
            </div>
          </Link>
          <div>
            {showMenu && (
              <div className="flex items-center gap-4">
                {navBarList.map((v, i) => (
                  <Link
                    key={v._id}
                    href={v.link}
                    className={` hover:font-bold pr-4 text-[#767676] hover:underline hover:text-primary md:border-r-[2px] border-r-gray-300 last:border-r-0 ${
                      pathname === v.link ? "font-bold text-primary" : ""
                    }`}
                  >
                    {v.title}
                  </Link>
                ))}
              </div>
            )}
            <HiMenuAlt2
              onClick={() => setSideNav(!sideNav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />
            {sideNav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <div className="w-full h-full bg-primary p-6">
                  {/* <img className="w-28 mb-6" src={logoLight} alt="logoLight" /> */}
                  <ul className="text-gray-200 flex flex-col gap-2">
                    {navBarList.map((item) => (
                      <li
                        className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        key={item._id}
                      >
                        <Link
                          href={item.link}
                          onClick={() => setSideNav(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  onClick={() => setSideNav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                >
                  <MdClose />
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
