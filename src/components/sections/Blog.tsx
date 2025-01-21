import { Card } from "@/components/ui/Card";

const posts = [
  {
    id: 1,
    title: "How to Build a Modern Website with Next.js",
    excerpt:
      "Learn how to build a fast and scalable website using Next.js and Tailwind CSS.",
    date: "October 10, 2023",
  },
  {
    id: 2,
    title: "Top 5 Tools for Web Developers in 2023",
    excerpt: "Discover the best tools for web development in 2023.",
    date: "October 5, 2023",
  },
];

export default function Blog() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">From My Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
