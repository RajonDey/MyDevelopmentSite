import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <Blog />
    </div>
  );
}
