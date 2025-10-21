import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Home.css';

export default function Home() {
  const [home, setHome] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/pages?filters[slug][$eq]=page")
      .then((res) => {
        console.log("✅ Strapi Response:", res.data);
        const page = res.data.data[0];
        if (page && page.Title) {
          setHome(page);
        } else if (page?.attributes) {
          setHome(page.attributes);
        } else {
          setError("No valid page data found.");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching home page:", err);
        setError("Failed to load data from Strapi.");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!home) return <p>Loading...</p>;

  return (
    <div className="home-container">
      <h1>{home.Title || "Untitled Page"}</h1>

      {home.Content && Array.isArray(home.Content) ? (
        home.Content.map((block, idx) => (
          <p key={idx}>
            {block?.children?.map((child, i) => child.text).join(" ")}
          </p>
        ))
      ) : (
        <p>No content found.</p>
      )}
    </div>
  );
}
