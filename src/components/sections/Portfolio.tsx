import Image from "next/image";
import Card from "../ui/Card";

const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "Built with Next.js and Stripe.",
    image: "https://picsum.photos/400/200",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Designed with Tailwind CSS.",
    image: "https://picsum.photos/400/200",
  },
];

export default function Portfolio() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
