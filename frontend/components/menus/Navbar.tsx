import { NavbarProps } from "@/types";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  brandName,
  sessionId,
  userId,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to toggle the mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Disable scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = ""; // Clean up on component unmount
    };
  }, [isMenuOpen]);

  // Function to replace placeholders in the URL
  const generateLink = (url: string) => {
    return url.replace(":sessionId", sessionId).replace(":userId", userId);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-4 text-black">
      {/* Desktop Navbar */}
      <div className="hidden w-full items-center justify-between md:flex">
        {/* Brand Name and Desktop Links in the same div */}
        <div className="flex items-center space-x-6">
          {/* Brand Title */}
          <div className="rounded-lg bg-green-400 p-4 text-3xl font-bold text-white underline">
            {brandName}
          </div>

          {/* Desktop Links */}
          <div className="flex items-center space-x-6 text-sm">
            {navItems.map((item) => (
              <Link key={item.to} href={generateLink(item.to)}>
                <span className="hover:text-green-400">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative ml-4 flex items-center">
          {/* Search Icon */}
          <Search className="absolute left-2 size-5 text-gray-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="rounded-lg border p-2 pl-8 text-black focus:outline-none"
          />
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="flex w-full items-center justify-between md:hidden">
        <div className="text-2xl font-bold">{brandName}</div>
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-8"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-gray-800 p-4 text-white md:hidden">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute right-4 top-4 text-3xl text-white"
          >
            &times;
          </button>

          {/* Mobile Menu Links */}
          <div className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <Link key={item.to} href={generateLink(item.to)}>
                <span className="block text-xl hover:text-green-400">
                  {item.label}
                </span>{" "}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
