import axios from "axios";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
}

export default async function Home() {
  // Fetch posts from WordPress REST API
  const res = await axios.get<Post[]>(
    "https://development.rajondey.com/wp-json/wp/v2/posts"
  );
  const posts = res.data;

  return (
    <div>
      <h1>Hello World!</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
