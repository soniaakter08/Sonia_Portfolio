import { useState } from "react";
import axios from "axios";
import '../styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:1337/api/contacts", {
        data: {
          Name: formData.Name,
          Email: formData.Email,
          Message: formData.Message
        }
      });

      setStatus("✅ Message sent successfully!");
      setFormData({ Name: "", Email: "", Message: "" });

      
      setTimeout(() => {
        setStatus("");
      }, 3000);

    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("❌ Something went wrong. Please try again.");

      
      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message:
          <textarea
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Send</button>

        
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
}
