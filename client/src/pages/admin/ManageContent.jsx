import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import api from "../../api/axios";
import GlassCard from "../../components/ui/GlassCard";

const emptySkillGroup = { category: "", items: "" };
const emptyExperience = { role: "", organization: "", duration: "", location: "", description: "", current: false };
const emptyEducation = { institution: "", degree: "", duration: "", location: "", score: "" };
const emptyCertification = { title: "", issuer: "", link: "" };

export default function ManageContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    api.get("/content").then(({ data }) => {
      setContent({
        ...data,
        skills: data.skills?.map((s) => ({ category: s.category, items: s.items.join(", ") })) || [],
        experience: data.experience?.map((e) => ({ ...e, description: e.description?.join("\n") || "" })) || [],
      });
      setFetching(false);
    });
  }, []);

  const update = (field, value) => setContent({ ...content, [field]: value });
  const updateSocial = (field, value) =>
    setContent({ ...content, socials: { ...content.socials, [field]: value } });

  // Generic array helpers
  const updateArrayItem = (key, index, field, value) => {
    const arr = [...content[key]];
    arr[index] = { ...arr[index], [field]: value };
    setContent({ ...content, [key]: arr });
  };
  const addArrayItem = (key, empty) => setContent({ ...content, [key]: [...content[key], empty] });
  const removeArrayItem = (key, index) =>
    setContent({ ...content, [key]: content[key].filter((_, i) => i !== index) });

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      ...content,
      skills: content.skills.map((s) => ({
        category: s.category,
        items: s.items.split(",").map((i) => i.trim()).filter(Boolean),
      })),
      experience: content.experience.map((e) => ({
        ...e,
        description: e.description.split("\n").map((d) => d.trim()).filter(Boolean),
      })),
    };

    try {
      await api.put("/content", payload);
      toast.success("Site content updated — live on your portfolio!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  if (fetching || !content) return <p className="text-ink-muted text-sm font-mono">loading content...</p>;

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Site Content</h1>
          <p className="text-ink-muted text-sm font-mono">// editing the live portfolio data</p>
        </div>
        <button onClick={handleSave} disabled={loading} className="btn-primary !py-2.5 !px-5 text-sm disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {loading ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-ink mb-4">Basic Info</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label="Full Name" value={content.name} onChange={(v) => update("name", v)} />
            <Field label="Title" value={content.title} onChange={(v) => update("title", v)} />
            <Field label="Email" value={content.email} onChange={(v) => update("email", v)} />
            <Field label="Phone" value={content.phone} onChange={(v) => update("phone", v)} />
            <Field label="Location" value={content.location} onChange={(v) => update("location", v)} />
            <Field label="Tagline" value={content.tagline} onChange={(v) => update("tagline", v)} />
          </div>
          <TextArea label="Bio" value={content.bio} onChange={(v) => update("bio", v)} rows={4} />
        </GlassCard>

        {/* Socials */}
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-ink mb-4">Social Links</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="GitHub" value={content.socials?.github} onChange={(v) => updateSocial("github", v)} />
            <Field label="LinkedIn" value={content.socials?.linkedin} onChange={(v) => updateSocial("linkedin", v)} />
            <Field label="Twitter / X" value={content.socials?.twitter} onChange={(v) => updateSocial("twitter", v)} />
            <Field label="LeetCode" value={content.socials?.leetcode} onChange={(v) => updateSocial("leetcode", v)} />
          </div>
        </GlassCard>

        {/* Skills */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-ink">Skills</h2>
            <button onClick={() => addArrayItem("skills", emptySkillGroup)} className="btn-outline !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add Group
            </button>
          </div>
          <div className="space-y-3">
            {content.skills.map((s, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="flex-1">
                  <Field label="Category" value={s.category} onChange={(v) => updateArrayItem("skills", i, "category", v)} />
                </div>
                <div className="flex-[2]">
                  <Field label="Items (comma separated)" value={s.items} onChange={(v) => updateArrayItem("skills", i, "items", v)} />
                </div>
                <button onClick={() => removeArrayItem("skills", i)} className="p-2.5 rounded-lg glass hover:text-red-400 mb-0.5">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Experience */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-ink">Experience</h2>
            <button onClick={() => addArrayItem("experience", emptyExperience)} className="btn-outline !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="space-y-5">
            {content.experience.map((e, i) => (
              <div key={i} className="border border-glass-border rounded-xl p-4 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Role" value={e.role} onChange={(v) => updateArrayItem("experience", i, "role", v)} />
                  <Field label="Organization" value={e.organization} onChange={(v) => updateArrayItem("experience", i, "organization", v)} />
                  <Field label="Duration" value={e.duration} onChange={(v) => updateArrayItem("experience", i, "duration", v)} />
                  <Field label="Location" value={e.location} onChange={(v) => updateArrayItem("experience", i, "location", v)} />
                </div>
                <TextArea label="Description (one point per line)" value={e.description} onChange={(v) => updateArrayItem("experience", i, "description", v)} rows={3} />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 font-mono text-xs text-ink-dim">
                    <input
                      type="checkbox"
                      checked={e.current}
                      onChange={(ev) => updateArrayItem("experience", i, "current", ev.target.checked)}
                    />
                    currently ongoing
                  </label>
                  <button onClick={() => removeArrayItem("experience", i)} className="p-2 rounded-lg glass hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Education */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-ink">Education</h2>
            <button onClick={() => addArrayItem("education", emptyEducation)} className="btn-outline !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="space-y-4">
            {content.education.map((e, i) => (
              <div key={i} className="border border-glass-border rounded-xl p-4 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Institution" value={e.institution} onChange={(v) => updateArrayItem("education", i, "institution", v)} />
                  <Field label="Degree" value={e.degree} onChange={(v) => updateArrayItem("education", i, "degree", v)} />
                  <Field label="Duration" value={e.duration} onChange={(v) => updateArrayItem("education", i, "duration", v)} />
                  <Field label="Score (e.g. CGPA: 7.0)" value={e.score} onChange={(v) => updateArrayItem("education", i, "score", v)} />
                </div>
                <button onClick={() => removeArrayItem("education", i)} className="p-2 rounded-lg glass hover:text-red-400 ml-auto block">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Certifications */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-ink">Certifications</h2>
            <button onClick={() => addArrayItem("certifications", emptyCertification)} className="btn-outline !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="space-y-3">
            {content.certifications.map((c, i) => (
              <div key={i} className="flex gap-3 items-end flex-wrap">
                <div className="flex-1 min-w-[150px]">
                  <Field label="Title" value={c.title} onChange={(v) => updateArrayItem("certifications", i, "title", v)} />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <Field label="Issuer" value={c.issuer} onChange={(v) => updateArrayItem("certifications", i, "issuer", v)} />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <Field label="Link" value={c.link} onChange={(v) => updateArrayItem("certifications", i, "link", v)} />
                </div>
                <button onClick={() => removeArrayItem("certifications", i)} className="p-2.5 rounded-lg glass hover:text-red-400 mb-0.5">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        <button onClick={handleSave} disabled={loading} className="btn-primary !py-3 text-sm disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {loading ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-xs text-ink-dim mb-1.5 block">{label}</label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-2.5 text-sm text-ink focus:border-neon-cyan outline-none transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="font-mono text-xs text-ink-dim mb-1.5 block">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-2.5 text-sm text-ink focus:border-neon-cyan outline-none transition-colors resize-none"
      />
    </div>
  );
}
