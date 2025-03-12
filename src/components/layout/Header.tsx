"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  FolderGit2,
  PenSquare,
  Mail,
  User,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-green-600 hover:text-green-700 transition-colors duration-200"
        >
          Rajon Dey
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
              >
                <Briefcase className="w-4 h-4" />
                <span>Services</span>
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Portfolio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
              >
                <PenSquare className="w-4 h-4" />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>

          {/* Auth Links */}
          <div className="flex items-center space-x-6">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-300 transition-colors duration-200 text-sm font-medium px-3 py-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200 text-base font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/contact">
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200">
              Hire Me
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <nav className="flex flex-col p-6 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/services"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="w-5 h-5" />
              <span>Services</span>
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FolderGit2 className="w-5 h-5" />
              <span>Portfolio</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PenSquare className="w-5 h-5" />
              <span>Blog</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
            </Link>

            {/* Mobile Auth Links */}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-300 transition-colors duration-200 text-base font-medium w-full justify-start py-2 px-3"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}

            {/* Mobile CTA */}
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors duration-200 text-base">
                Hire Me
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
