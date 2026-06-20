import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil, X, Save, Loader2 } from "lucide-react";
import api from "../../api/axios";
import GlassCard from "../../components/ui/GlassCard";

const emptyProject = {
  title: "",
  duration: "",
  overview: "",
  techStack: "",
  highlights: "",
  demoLink: "",
  websiteLink: "",
  githubLink: "",
  order: 0,
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null); // null = not editing, "new" = creating, or project object
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchProjects = async () => {
    setFetching(true);
    const { data } = await api.get("/projects");
    setProjects(data);
    setFetching(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openNew = () => {
    setForm(emptyProject);
    setEditing("new");
  };

  const openEdit = (project) => {
    setForm({
      ...project,
      techStack: project.techStack?.join(", ") || "",
      highlights: project.highlights?.join("\n") || "",
    });
    setEditing(project._id);
  };

  const closeForm = () => {
    setEditing(null);
    setForm(emptyProject);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      highlights: form.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    try {
      if (editing === "new") {
        await api.post("/projects", payload);
        toast.success("Project created");
      } else {
        await api.put(`/projects/${editing}`, payload);
        toast.success("Project updated");
      }
      closeForm();
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project permanently?")) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Projects</h1>
          <p className="text-ink-muted text-sm font-mono">// manage what visitors see live</p>
        </div>
        {editing === null && (
          <button onClick={openNew} className="btn-primary !py-2.5 !px-5 text-sm">
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {editing !== null && (
        <GlassCard hover={false} className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-ink">
              {editing === "new" ? "New Project" : "Edit Project"}
            </h2>
            <button onClick={closeForm} className="text-ink-dim hover:text-ink">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
              <Field label="Duration" name="duration" value={form.duration} onChange={handleChange} placeholder="Jan'24 - Current" />
            </div>
            <TextArea label="Overview" name="overview" value={form.overview} onChange={handleChange} required rows={3} />
            <Field label="Tech Stack (comma separated)" name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
            <TextArea label="Highlights (one per line)" name="highlights" value={form.highlights} onChange={handleChange} rows={5} />
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Demo Link" name="demoLink" value={form.demoLink} onChange={handleChange} />
              <Field label="Website Link" name="websiteLink" value={form.websiteLink} onChange={handleChange} />
              <Field label="GitHub Link" name="githubLink" value={form.githubLink} onChange={handleChange} />
            </div>
            <Field label="Display Order" name="order" type="number" value={form.order} onChange={handleChange} />
            <button type="submit" disabled={loading} className="btn-primary !py-3 text-sm disabled:opacity-60">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {loading ? "Saving..." : "Save Project"}
            </button>
          </form>
        </GlassCard>
      )}

      {fetching ? (
        <p className="text-ink-muted text-sm font-mono">loading projects...</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <GlassCard key={p._id} hover={false} className="!p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-ink">{p.title}</h3>
                  <p className="text-ink-muted text-sm mt-1 line-clamp-2">{p.overview}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(p)} className="p-2 rounded-lg glass hover:text-neon-cyan">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg glass hover:text-red-400">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
          {projects.length === 0 && (
            <p className="text-ink-muted text-sm">No projects yet — add your first one above.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="font-mono text-xs text-ink-dim mb-1.5 block">{label}</label>
      <input
        {...props}
        className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-2.5 text-sm text-ink focus:border-neon-cyan outline-none transition-colors"
      />
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div>
      <label className="font-mono text-xs text-ink-dim mb-1.5 block">{label}</label>
      <textarea
        {...props}
        className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-2.5 text-sm text-ink focus:border-neon-cyan outline-none transition-colors resize-none"
      />
    </div>
  );
}
