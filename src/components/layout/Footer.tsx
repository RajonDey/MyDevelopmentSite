import Link from "next/link";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Services */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Services</h3>
          <Link
            href="/services"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            Web Development
          </Link>
          <Link
            href="/portfolio"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            Blog
          </Link>
        </div>

        {/* About */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">About</h3>
          <Link
            href="/about"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            Contact
          </Link>
        </div>

        {/* Resources */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <Link
            href="/faq"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            FAQ
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            href="/sitemap.xml"
            className="hover:text-green-400 transition-colors duration-200 text-sm"
          >
            Sitemap
          </Link>
        </div>

        {/* Connect */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Connect</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="https://www.linkedin.com/in/rajondey/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-200 text-sm"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.threads.net/@rajjon.dey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-200 text-sm"
            >
              <Mail className="w-5 h-5" />
              <span>Threads</span>
            </a>
            <a
              href="https://twitter.com/rajjon_dey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-200 text-sm"
            >
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </a>
            <a
              href="https://github.com/RajonDey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-200 text-sm"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
          <Link
            href="/contact"
            className="w-fit inline-block mt-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-8 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Rajon Dey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
