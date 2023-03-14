import React, { useEffect, useState } from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useAuth from "../hooks/useAuth";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <img
            className="cursor-pointer object-contain"
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
            alt="Netflix Logo"
          />
        </Link>

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Tv Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <img
          onClick={logout}
          className="cursor-pointer rounded"
          src="https://rb.gy/g1pwyx"
          alt="Account"
        />
      </div>
    </header>
  );
};

export default Header;
