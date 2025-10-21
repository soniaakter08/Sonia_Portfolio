import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/blog-posts?populate=*")
      .then((res) => {
        console.log("✅ Blog response:", res.data);
        setPosts(res.data.data || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching Blog posts:", err);
        setError("Failed to load blog posts.");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!posts.length) return <p>Loading blog posts...</p>;

  return (
    <div className="blog-container">
      {posts.map((post) => (
        <div key={post.id} className="blog-card">
          <h2>{post.Title}</h2>

          
          {Array.isArray(post.Image) && post.Image.length > 0 && (
            <div className="blog-images">
              {post.Image.map((img) => (
                <img
                  key={img.id}
                  src={`http://localhost:1337${img.url}`}
                  alt={img.alternativeText || post.Title}
                  className="blog-image"
                />
              ))}
            </div>
          )}

          
          {Array.isArray(post.Content) && post.Content.length > 0 ? (
            post.Content.map((block, i) => (
              <p key={i}>
                {block.children?.map((child) => child.text).join(" ")}
              </p>
            ))
          ) : (
            <p>No content available.</p>
          )}

          
          {post.Tags && <p className="tags">{post.Tags}</p>}
        </div>
      ))}
    </div>
  );
}
