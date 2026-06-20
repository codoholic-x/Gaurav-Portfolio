import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import { FolderGit2 } from "lucide-react";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          fileTag="03_projects/"
          title="Things I've built"
          subtitle="A selection of full-stack projects — from idea to deployment."
        />

        {projects?.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id || i} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-10 text-center text-ink-muted">
            <FolderGit2 className="mx-auto mb-3 text-neon-cyan" size={28} />
            Projects will appear here once added from the admin dashboard.
          </div>
        )}
      </div>
    </section>
  );
}
