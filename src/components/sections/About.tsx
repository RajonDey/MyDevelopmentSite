import Image from "next/image";
import { Button } from "@/components/common/ui/Button";

export default function About() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Image */}
        <Image
          src="https://www.rajondey.com/wp-content/uploads/2021/07/rajon-dey.jpg.webp"
          alt="Rajon Dey"
          width={200}
          height={200}
          className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-12"
        />

        {/* Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700 mb-4">
            Hi, I’m Rajon Dey, a software developer with 5+ years of
            experience. I specialize in building modern, scalable, and
            user-friendly websites using technologies like Next.js, WordPress,
            and Tailwind CSS.
          </p>
          <Button>Contact Me</Button>
        </div>
      </div>
    </section>
  );
}
