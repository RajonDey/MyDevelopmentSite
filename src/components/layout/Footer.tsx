export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Rajon Dey. All rights reserved.</p>
        <p className="mt-2">
          Built with{" "}
          <a
            href="https://nextjs.org"
            className="text-blue-400 hover:underline"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href="https://wordpress.org"
            className="text-blue-400 hover:underline"
          >
            WordPress
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
