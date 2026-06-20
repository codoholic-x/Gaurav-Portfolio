import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Lock, Mail, Terminal, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AnimatedBackground from "../../components/animations/AnimatedBackground";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back, Gaurav 👋");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-2xl p-8 w-full max-w-sm"
      >
        <div className="flex items-center gap-2 mb-1 font-mono text-sm text-neon-cyan">
          <Terminal size={18} />
          admin login
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink mb-6">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-xs text-ink-dim mb-1.5 flex items-center gap-1.5">
              <Mail size={12} /> email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-ink focus:border-neon-cyan outline-none transition-colors"
              placeholder="admin@email.com"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-ink-dim mb-1.5 flex items-center gap-1.5">
              <Lock size={12} /> password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-ink focus:border-neon-cyan outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60">
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
