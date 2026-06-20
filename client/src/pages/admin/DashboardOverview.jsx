import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Inbox, MailWarning, Download } from "lucide-react";
import api from "../../api/axios";
import GlassCard from "../../components/ui/GlassCard";

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/stats").then(({ data }) => setStats(data));
  }, []);

  const cards = [
    { label: "Projects", value: stats?.projectCount, icon: FolderGit2, glow: "cyan" },
    { label: "Total Messages", value: stats?.totalMessages, icon: Inbox, glow: "violet" },
    { label: "Unread Messages", value: stats?.unreadMessages, icon: MailWarning, glow: "pink" },
    { label: "Resume Downloads", value: stats?.resumeDownloads, icon: Download, glow: "cyan" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-1">Overview</h1>
      <p className="text-ink-muted text-sm mb-8 font-mono">// live stats from MongoDB Atlas</p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <GlassCard glow={c.glow}>
              <div className="flex items-center justify-between mb-3">
                <c.icon size={20} className="text-neon-cyan" />
              </div>
              <p className="text-3xl font-display font-semibold text-ink">
                {c.value ?? "—"}
              </p>
              <p className="text-ink-muted text-sm mt-1">{c.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard hover={false}>
        <h2 className="font-display font-semibold text-ink mb-4">Recent Messages</h2>
        {stats?.recentMessages?.length ? (
          <div className="divide-y divide-glass-border">
            {stats.recentMessages.map((m) => (
              <div key={m._id} className="py-3 flex flex-wrap justify-between gap-2">
                <div>
                  <p className="text-ink text-sm font-medium">{m.name}</p>
                  <p className="text-ink-muted text-xs">{m.email}</p>
                </div>
                <p className="text-ink-dim text-xs font-mono self-center">
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink-muted text-sm">No messages yet.</p>
        )}
      </GlassCard>
    </div>
  );
}
