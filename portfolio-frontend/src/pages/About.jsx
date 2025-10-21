import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/About.css";

export default function About() {
  const [about, setAbout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/pages?filters[slug][$eq]=page-1")
      .then((res) => {
        console.log("✅ About page response:", res.data);
        const page = res.data.data[0];
        if (page?.attributes) setAbout(page.attributes);
        else if (page) setAbout(page);
        else setError("No about page data found.");
      })
      .catch((err) => {
        console.error("❌ Error fetching About page:", err);
        setError("Failed to load About page.");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!about) return <p>Loading...</p>;

  return (
    <div className="about-container">
      <h1>{about.Title || "About Me"}</h1>
      {about.Content && Array.isArray(about.Content) ? (
        about.Content.map((block, idx) => (
          <p key={idx}>
            {block?.children?.map((c, i) => c.text).join(" ")}
          </p>
        ))
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}
