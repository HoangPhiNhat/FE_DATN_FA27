"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { bannerSettings } from "@/configs/slider";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = bannerSettings(dotActive, setDocActive);
  return (
    <div className="w-full  bg-white">
      <Slider {...settings}>
        <Link href="/">
          <Image
            src="/images/banner/banner1.jpeg"
            width={1920}
            height={1080}
            className="object-cover"
            alt="Banner Image 3"
          />
        </Link>
        <Link href="/">
          <Image
            src="/images/banner/banner2.png"
            width={1920}
            height={1080}
            className="object-cover"
            alt="Banner Image 3"
          />
        </Link>
        <Link href="/">
          <Image
            src="/images/banner/banner3.png"
            width={1920}
            height={1080}
            className="object-cover"
            alt="Banner Image 3"
          />
        </Link>
        {/* <Link href="/">
          <Image
            src="/images/banner/banner5.png"
            width={1920}
            height={1080}
            className="object-cover"
            alt="Banner Image 3"
          />
        </Link> */}
      </Slider>
    </div>
  );
};

export default Banner;
