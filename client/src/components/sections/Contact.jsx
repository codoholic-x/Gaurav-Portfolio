import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import useScrollReveal from "../../hooks/useScrollReveal";
import api from "../../api/axios";

export default function Contact({ content }) {
  const [ref, isVisible] = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/contact", form);
      toast.success(data.message || "Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          fileTag="05_contact.sh"
          title="Let's build something together"
          subtitle="Have a project, an opportunity, or just want to say hi? My inbox is open."
        />

        <div ref={ref} className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {content?.email && (
              <a
                href={`mailto:${content.email}`}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-neon-cyan hover:border-neon-cyan/40 transition-all"
              >
                <div className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-ink-dim font-mono">email</p>
                  <p className="text-ink text-sm break-all">{content.email}</p>
                </div>
              </a>
            )}
            {content?.phone && (
              <a
                href={`tel:${content.phone}`}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-neon-violet hover:border-neon-violet/40 transition-all"
              >
                <div className="p-3 rounded-xl bg-neon-violet/10 text-neon-violet">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-ink-dim font-mono">phone</p>
                  <p className="text-ink text-sm">{content.phone}</p>
                </div>
              </a>
            )}
            {content?.location && (
              <div className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-neon-pink/10 text-neon-pink">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-ink-dim font-mono">location</p>
                  <p className="text-ink text-sm">{content.location}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <GlassCard glow="pink" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-ink-dim mb-1.5 block">name</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-neon-cyan outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-ink-dim mb-1.5 block">email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-neon-cyan outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-ink-dim mb-1.5 block">subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-neon-cyan outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-ink-dim mb-1.5 block">message</label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-neon-cyan outline-none transition-colors resize-none"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
