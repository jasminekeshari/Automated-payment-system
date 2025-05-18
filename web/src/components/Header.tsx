"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Feature", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-400 tracking-wide">
      <span className="text-white">Payout</span> <span className="text-purple-400">Pilot</span>
    </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-purple-300 transition ${
                pathname === link.path ? "text-purple-400 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Auth Buttons */}
          <Link
            href="/register"
            className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="bg-white text-purple-700 px-4 py-2 rounded-full text-sm hover:bg-purple-100 transition"
          >
            Log In
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="text-xl">&#9776;</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block text-sm hover:text-purple-300 ${
                pathname === link.path ? "text-purple-400 font-semibold" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/register"
            className="block bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
          <Link
            href="/login"
            className="block bg-white text-purple-700 px-4 py-2 rounded-full text-sm hover:bg-purple-100 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;