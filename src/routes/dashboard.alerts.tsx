import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_ALERTS, type AlertItem } from "@/lib/mock-data";
import { Search, CheckCircle2, XCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/dashboard/alerts")({
  component: AlertsPage,
});

function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(MOCK_ALERTS);
  const [q, setQ] = useState("");
  const [sev, setSev] = useState<string>("all");
  const [active, setActive] = useState<AlertItem | null>(MOCK_ALERTS[0]);

  const filtered = alerts.filter((a) =>
    (sev === "all" || a.severity === sev) &&
    (q === "" || a.type.includes(q.toLowerCase()) || a.zone.toLowerCase().includes(q.toLowerCase()))
  );

  const updateStatus = (id: string, status: AlertItem["status"]) => {
    setAlerts((xs) => xs.map((x) => (x.id === id ? { ...x, status } : x)));
    if (active?.id === id) setActive((a) => (a ? { ...a, status } : null));
  };

  return (
    <div className="space-y-5">
      <div className="glass-strong holo-border rounded-3xl p-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="tag tag-alert mb-3">Threat intelligence</div>
          <h1 className="text-3xl font-semibold tracking-tight">Alert management.</h1>
          <p className="mt-2 text-foreground/65 max-w-xl">Tactical response interface for chainsaws, gunshots, intrusion and fire events.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="tag tag-alert">{alerts.filter(a => a.severity === "critical").length} critical</span>
          <span className="tag tag-amber">{alerts.filter(a => a.severity === "high").length} high</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 glass-strong holo-border rounded-3xl p-5">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search alerts…" className="field pl-9 py-2 text-sm" />
            </div>
            <select value={sev} onChange={(e) => setSev(e.target.value)} className="field py-2 text-sm w-auto">
              <option value="all">All severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map((a) => (
              <motion.button
                key={a.id}
                onClick={() => setActive(a)}
                whileHover={{ x: 4 }}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition ${active?.id === a.id ? "glass-strong holo-border" : "glass holo-border hover:bg-emerald-500/[0.04]"}`}
              >
                <span className={`h-2 w-2 rounded-full ${a.severity === "critical" ? "bg-red-400 pulse-dot-alert" : a.severity === "high" ? "bg-amber-400" : "bg-emerald-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm capitalize flex items-center gap-2">
                    {a.type} detected
                    <span className={`tag ${a.severity === "critical" ? "tag-alert" : a.severity === "high" ? "tag-amber" : ""}`}>{a.severity}</span>
                  </div>
                  <div className="text-[11px] text-foreground/55 font-mono mt-0.5">{a.zone} · {a.time}</div>
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${a.status === "new" ? "text-red-300" : a.status === "investigating" ? "text-amber-300" : a.status === "resolved" ? "text-emerald-300" : "text-cyan-300"}`}>
                  {a.status}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-5">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="text-xs uppercase tracking-widest font-mono text-foreground/55">Alert details</div>
                <h2 className="text-2xl font-semibold tracking-tight mt-1 capitalize">{active.type} detected</h2>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`tag ${active.severity === "critical" ? "tag-alert" : active.severity === "high" ? "tag-amber" : ""}`}>{active.severity}</span>
                  <span className="tag">{active.confidence}% confidence</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-mono">
                  <KV l="Zone" v={active.zone} />
                  <KV l="Time" v={active.time} />
                  <KV l="Latitude" v={`${active.lat.toFixed(4)}°N`} />
                  <KV l="Longitude" v={`${active.lng.toFixed(4)}°E`} />
                </div>

                <div className="mt-5 glass rounded-xl p-3 flex items-center gap-2 text-xs text-foreground/65">
                  <MapPin className="h-3.5 w-3.5 text-emerald-300" />
                  Estimated 3.2 km from nearest ranger unit (Bravo-2).
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button onClick={() => updateStatus(active.id, "acknowledged")} className="btn-cta justify-center text-sm py-2">
                    <CheckCircle2 className="h-4 w-4" /> Confirm
                  </button>
                  <button onClick={() => updateStatus(active.id, "resolved")} className="btn-ghost justify-center text-sm py-2">
                    <XCircle className="h-4 w-4" /> False alarm
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function KV({ l, v }: { l: string; v: string }) {
  return (
    <div className="glass holo-border rounded-xl p-3">
      <div className="text-[10px] uppercase tracking-widest text-foreground/50">{l}</div>
      <div className="mt-1 text-foreground/85">{v}</div>
    </div>
  );
}
