"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  // Home,
  Briefcase,
  FolderGit2,
  PenSquare,
  Mail,
  User,
  LogIn,
  LogOut,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Navigation items
  const navItems = [
    // { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/portfolio", label: "Portfolio", icon: FolderGit2 },
    { href: "/blog", label: "Blog", icon: PenSquare },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="bg-white fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-200"
        >
          Rajon Dey
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Links (Separated) */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 border-gray-300 hover:border-red-300 hover:bg-red-50 transition-colors duration-200 text-sm font-medium px-3 py-1 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <Button variant="secondary">
                <Link
                  href="/signin"
                  className="flex items-center space-x-1 transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
            {/* CTA Button */}
            <Link href="/hire">
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200">
                Work With Me
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile Auth Links */}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 border-gray-300 hover:border-red-300 hover:bg-red-50 transition-colors duration-200 text-base font-medium w-full text-left py-2 rounded-md"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <Link
                href="/signin"
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile CTA */}
            <Link href="/hire" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-medium py-2 rounded-md transition-colors duration-200">
                Work With Me
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
