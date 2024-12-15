import Link from "next/link";
import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const SectionHeader = ({ title, href }) => {
  return (
    <div className="flex justify-between items-center py-8">
      <div className="text-3xl font-bold">{title}</div>
    {href &&   <Link href={href} className="flex gap-1 items-center hover:underline hover:text-primary">
        <p> Xem tất cả</p> <MdKeyboardDoubleArrowRight />
      </Link>}
    </div>
  );
};

export default SectionHeader;
