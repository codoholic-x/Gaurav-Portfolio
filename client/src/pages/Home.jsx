import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollProgress from "../components/layout/ScrollProgress";
import CursorGlow from "../components/layout/CursorGlow";
import AnimatedBackground from "../components/animations/AnimatedBackground";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";
import Loader from "../components/ui/Loader";
import api from "../api/axios";
import { fallbackContent, fallbackProjects } from "../data/portfolioData";

export default function Home() {
  const [content, setContent] = useState(fallbackContent);
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, projectsRes] = await Promise.all([
          api.get("/content"),
          api.get("/projects"),
        ]);
        setContent(contentRes.data);
        setProjects(projectsRes.data);
      } catch (err) {
        console.error("Falling back to static data —", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar apiUrl={apiUrl} />
      <main>
        <Hero content={content} apiUrl={apiUrl} />
        <About content={content} />
        <Skills content={content} />
        <Projects projects={projects} />
        <Experience content={content} />
        <Certifications content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}
