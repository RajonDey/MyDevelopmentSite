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
import { Button } from "@/components/ui/Button"; // Assuming you have a reusable Button component

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
        >
          Rajon Dey
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <Home className="w-5 h-5 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <Briefcase className="w-5 h-5 mr-1" />
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <FolderGit2 className="w-5 h-5 mr-1" />
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <PenSquare className="w-5 h-5 mr-1" />
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <Mail className="w-5 h-5 mr-1" />
                Contact
              </Link>
            </li>
          </ul>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  <User className="w-5 h-5 mr-1" />
                  Dashboard
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  <LogIn className="w-5 h-5 mr-1" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  <UserPlus className="w-5 h-5 mr-1" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/contact">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Hire Me
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link
              href="/services"
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Services
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FolderGit2 className="w-5 h-5 mr-2" />
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PenSquare className="w-5 h-5 mr-2" />
              Blog
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </Link>

            {/* Mobile Auth Links */}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  className="flex items-center text-gray-700 hover:text-red-600 w-full justify-start"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile CTA */}
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Hire Me
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
