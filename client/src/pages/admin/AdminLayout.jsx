import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderGit2, Inbox, FileText, LogOut, ExternalLink, Terminal } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import AnimatedBackground from "../../components/animations/AnimatedBackground";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
  { to: "/admin/content", label: "Site Content", icon: FileText },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row">
      <AnimatedBackground />

      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0 glass-strong lg:min-h-screen lg:sticky lg:top-0 p-5 flex lg:flex-col">
        <div className="flex items-center gap-2 font-mono text-sm text-ink mb-0 lg:mb-8">
          <Terminal size={18} className="text-neon-cyan" />
          admin<span className="text-neon-cyan">.panel</span>
        </div>

        <nav className="hidden lg:flex flex-col gap-1 flex-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30"
                    : "text-ink-muted hover:bg-white/5 hover:text-ink"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block space-y-2 mt-auto pt-4 border-t border-glass-border">
          <p className="font-mono text-xs text-ink-dim px-1">{admin?.email}</p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-ink-muted hover:bg-white/5 hover:text-ink transition-colors"
          >
            <ExternalLink size={16} /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-colors w-full"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <nav className="lg:hidden flex overflow-x-auto gap-1 px-4 py-3 glass-strong border-t border-glass-border">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? "bg-neon-cyan/10 text-neon-cyan" : "text-ink-muted"
              }`
            }
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 whitespace-nowrap">
          <LogOut size={14} /> Logout
        </button>
      </nav>

      {/* Page content */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
