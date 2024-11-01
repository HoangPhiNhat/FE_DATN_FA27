import Link from "next/link";

const FooterItemLink = ({ href, icon, target }) => {
  const commonClasses = "cursor-pointer duration-300";

  const withTargetClasses =
    "w-7 h-7 bg-primary text-gray-100 hover:text-white text-lg rounded-full flex justify-center items-center hover:bg-black";

  const withoutTargetClasses =
    "text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2";

  return (
    <Link
      href={href.toLowerCase()}
      target={target ? "_blank" : undefined}
      rel={target ? "noreferrer" : undefined}
    >
      <li
        className={`${commonClasses} ${
          target ? withTargetClasses : withoutTargetClasses
        }`}
      >
        {icon || href}
      </li>
    </Link>
  );
};

export default FooterItemLink;
