import Image from "next/image";
import Link from "next/link";
import React from "react";

const navIcons = [
  {
    src: "/assets/icons/search.svg",
    alt: "search",
  },
  {
    src: "/assets/icons/black-heart.svg",
    alt: "heart",
  },
  {
    src: "/assets/icons/user.svg",
    alt: "user",
  },
];
const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/assets/icons/logo.svg"}
            height={27}
            width={27}
            alt="logo"
          />
          <p className="nav-logo">
            Deal<span className="text-primary">Finder</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icon, index) => (
            <Image
              src={icon.src}
              height={27}
              width={27}
              alt={icon.alt}
              key={index}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
