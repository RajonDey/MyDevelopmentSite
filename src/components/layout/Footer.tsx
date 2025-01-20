import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-text-light)] py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold text-lg">Categories</h3>
          <Link href="/services" className="hover:text-[var(--color-primary)]">
            Services
          </Link>
          <Link href="/portfolio" className="hover:text-[var(--color-primary)]">
            Portfolio
          </Link>
          <Link href="/blog" className="hover:text-[var(--color-primary)]">
            Blog
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="font-bold text-lg">About</h3>
          <Link href="/about" className="hover:text-[var(--color-primary)]">
            About Me
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-primary)]">
            Contact
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="font-bold text-lg">Support</h3>
          <Link href="/faq" className="hover:text-[var(--color-primary)]">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:text-[var(--color-primary)]">
            Privacy Policy
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold text-lg">Follow Me</h3>
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)]"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)]"
            >
              Twitter
            </a>
            <a
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-8 pt-8 border-t border-[var(--color-secondary)]">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Rajon Dey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
