import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:1337/api/projects?populate=*")
      .then(res => {
        const data = res.data.data || [];
        setProjects(data); 
      })
      .catch(err => {
        console.error("❌ Error fetching projects:", err);
        setError("Failed to load projects.");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!projects.length) return <p>Loading projects...</p>;

  return (
    <div className="projects-container">
      {projects.map((proj, idx) => (
        <div className="project-card" key={idx}>
          <h2>{proj.Title || "Untitled Project"}</h2>

          
          {proj.Description?.map((block, i) => (
            <p key={i}>{block.children.map(c => c.text).join("")}</p>
          ))}

          
          {proj.Features && proj.Features.length > 0 && (
            <p className="project-feature">
              <strong>Features:</strong> {proj.Features.join(", ")}
            </p>
          )}

          
          {proj.TechStack && proj.TechStack.length > 0 && (
            <p className="project-techstack">
              <strong>Tech Stack:</strong> {proj.TechStack.join(", ")}
            </p>
          )}

          
          <div className="project-images">
            {proj.Image?.length > 0 ? (
              proj.Image.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:1337${img.url}`}
                  alt={img.name || "Project Image"}
                  className="project-image"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Not completed. I will do that in Future*/}
          {proj.ProjectLink && (
            <a href={proj.ProjectLink} target="_blank" rel="noreferrer">
              Visit Project
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
