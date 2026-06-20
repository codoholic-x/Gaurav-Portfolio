import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Mail, MailOpen } from "lucide-react";
import api from "../../api/axios";
import GlassCard from "../../components/ui/GlassCard";

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await api.get("/messages");
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`);
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/messages/${id}`);
    toast.success("Message deleted");
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-1">Messages</h1>
      <p className="text-ink-muted text-sm mb-8 font-mono">// submissions from your contact form</p>

      {loading ? (
        <p className="text-ink-muted text-sm font-mono">loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-ink-muted text-sm">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <GlassCard key={m._id} hover={false} className={`!p-5 ${!m.read ? "border-neon-cyan/40" : ""}`}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    {m.read ? (
                      <MailOpen size={14} className="text-ink-dim" />
                    ) : (
                      <Mail size={14} className="text-neon-cyan" />
                    )}
                    <h3 className="font-medium text-ink text-sm">{m.name}</h3>
                    <span className="text-ink-dim text-xs">· {m.email}</span>
                  </div>
                  {m.subject && <p className="text-ink-muted text-xs mt-1">{m.subject}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  {!m.read && (
                    <button
                      onClick={() => markRead(m._id)}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-lg glass hover:text-neon-cyan"
                    >
                      mark read
                    </button>
                  )}
                  <button onClick={() => handleDelete(m._id)} className="p-2 rounded-lg glass hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-ink-muted text-sm mt-2 whitespace-pre-line">{m.message}</p>
              <p className="font-mono text-[11px] text-ink-dim mt-3">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
