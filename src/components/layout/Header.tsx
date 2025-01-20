import Link from "next/link";

export default function Header() {
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

        {/* Navigation Menu */}
        <nav>
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
                href="/about"
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                About
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

        {/* CTA Button */}
        <Link
          href="/contact"
          className="bg-[var(--color-cta)] text-white px-6 py-2 rounded-md hover:bg-[#19a463] transition-colors"
        >
          Hire Me
        </Link>
      </div>
    </header>
  );
}
