"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  Briefcase,
  FolderGit2,
  Mail,
  User,
  LogIn,
  LogOut,
  BookOpen,
  ShoppingCart,
  Settings,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/common/ui/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Navigation items
  const navItems = [
    // { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/portfolio", label: "Portfolio", icon: FolderGit2 },
    { href: "/blog", label: "Blog & Learn", icon: BookOpen },
    { href: "/hire", label: "Work With Us", icon: ShoppingCart },
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
          <div>
            <div>Rajon Dey</div>
            <div className="text-xs text-gray-500 font-normal">
              RDX Technologies
            </div>
          </div>
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

          {/* Auth Links with Dropdown */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                  <User className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-200">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </span>
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </span>
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100"
                  >
                    <span className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                  <User className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-200">
                  <Link
                    href="/signin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </span>
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </span>
                  </Link>
                </div>
              </div>
            )}

            {/* CTA Button - Order Services */}
            <Link href="/order">
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200">
                Order Services
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
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">
                    Account
                  </h3>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <Button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    variant="outline"
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 border-gray-300 hover:border-red-300 hover:bg-red-50 transition-colors duration-200 text-base font-medium w-full text-left py-2 mt-2 rounded-md"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">
                  Account
                </h3>
                <Link
                  href="/signin"
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </Link>
              </div>
            )}

            {/* Mobile CTA */}
            <Link href="/order" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-medium py-2 rounded-md transition-colors duration-200 mt-4">
                Order Services
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
