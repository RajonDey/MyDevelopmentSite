"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-primary)]"
        >
          Rajon Dey
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:inline-block bg-[var(--color-cta)] text-white px-6 py-2 rounded-md hover:bg-[#19a463] transition-colors"
        >
          Hire Me
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link
                href="/"
                className="block text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="block text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
