import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { ParticleField } from "@/components/atmosphere/ParticleField";
import { GridOverlay } from "@/components/atmosphere/GridOverlay";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, AudioLines, Bell, Bird, BarChart3, Send, Cpu, HelpCircle, LogOut, Search
} from "lucide-react";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/audio", label: "Audio Analysis", icon: AudioLines },
  { to: "/dashboard/alerts", label: "Alert Management", icon: Bell },
  { to: "/dashboard/biodiversity", label: "Biodiversity Tracker", icon: Bird },
  { to: "/dashboard/reports", label: "Reports & Analytics", icon: BarChart3 },
  { to: "/dashboard/telegram", label: "Telegram", icon: Send },
  { to: "/dashboard/system", label: "System Overview", icon: Cpu },
  { to: "/dashboard/help", label: "Help & Documentation", icon: HelpCircle },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full relative">
      {/* atmosphere */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticleField density={40} />
        <GridOverlay />
      </div>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-72 shrink-0 sticky top-0 h-screen p-4">
          <div className="glass-strong holo-border rounded-3xl flex flex-col w-full p-5">
            <div className="px-2 mb-6">
              <Logo />
            </div>

            <div className="px-2 mb-4">
              <div className="relative">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                <input placeholder="Quick command…" className="field pl-9 py-2 text-xs" />
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {NAV.map((n) => {
                const active = n.end ? location.pathname === n.to : location.pathname.startsWith(n.to);
                const Icon = n.icon;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="relative block"
                  >
                    <motion.div
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                        active ? "text-emerald-300" : "text-foreground/65 hover:text-foreground hover:bg-emerald-500/[0.06]"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(74,222,128,0.18), rgba(34,211,238,0.06))",
                            border: "1px solid rgba(74,222,128,0.35)",
                            boxShadow: "0 0 30px -8px rgba(74,222,128,0.4)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {active && (
                        <motion.span
                          layoutId="sidebar-bar"
                          className="absolute -left-2 top-2 bottom-2 w-1 rounded-full"
                          style={{ background: "var(--grad-emerald)", boxShadow: "0 0 14px rgba(74,222,128,0.7)" }}
                        />
                      )}
                      <Icon className="relative z-10 h-4 w-4" />
                      <span className="relative z-10">{n.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 glass rounded-2xl p-4 holo-border">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full grid place-items-center text-xs font-semibold"
                     style={{ background: "var(--grad-emerald)", color: "#052e16" }}>RG</div>
                <div className="min-w-0">
                  <div className="text-sm truncate">Ranger Aiyana</div>
                  <div className="text-[10px] text-foreground/50 font-mono uppercase tracking-widest">North Block · Lvl 4</div>
                </div>
                <Link to="/login" className="ml-auto text-foreground/50 hover:text-emerald-300"><LogOut className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-w-0 p-4 lg:p-6">
          <TopBar />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-5"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="glass-strong holo-border rounded-2xl px-5 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
        <div className="text-xs font-mono uppercase tracking-widest text-foreground/70">
          All systems operational · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs font-mono text-foreground/55">
        <span>SECTOR · NORTH-A04</span>
        <span>·</span>
        <span>14.218°N · 75.821°E</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="tag tag-cyber">YAMNet · ready</span>
        <span className="tag">156 / 156 sensors</span>
      </div>
    </div>
  );
}
