import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, BarChart3, TrendingUp, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/dashboard/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const bars = [42, 58, 71, 64, 88, 95, 76, 102, 88, 115, 124, 108];
  return (
    <div className="space-y-5">
      <div className="glass-strong holo-border rounded-3xl p-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="tag mb-3">Intelligence reports</div>
          <h1 className="text-3xl font-semibold tracking-tight">Analytics & insights.</h1>
          <p className="mt-2 text-foreground/65 max-w-xl">Threat trends, biodiversity patterns and response telemetry.</p>
        </div>
        <button className="btn-cta text-sm py-2 px-4"><Download className="h-4 w-4" /> Generate report</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BarChart3} label="Total threats" value="127" delta="+12%" tone="alert" />
        <StatCard icon={TrendingUp} label="Critical events" value="28" delta="−18%" tone="amber" />
        <StatCard icon={Clock} label="Avg response time" value="18m" delta="−5m" tone="cyber" hint="vs last week" />
        <StatCard icon={BarChart3} label="Resolution rate" value="92%" delta="+6%" tone="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-1">Threats over time</h2>
          <p className="text-xs text-foreground/55 font-mono uppercase tracking-widest mb-4">12-month tactical view</p>
          <div className="flex items-end gap-2 h-56">
            {bars.map((b, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${b}%` }} transition={{ delay: i * 0.04, type: "spring" }}
                className="flex-1 rounded-t-md relative group"
                style={{
                  background: i === 10 ? "linear-gradient(180deg, #f87171, #ef4444)" : i === 11 ? "linear-gradient(180deg, #fb923c, #f59e0b)" : "linear-gradient(180deg, #4ade80, #16a34a)",
                  boxShadow: "0 0 12px rgba(74,222,128,0.4)"
                }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition">{b}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-mono text-foreground/45">
            {["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-4">Top threat zones</h2>
          <div className="space-y-3">
            {[
              { z: "North Block", v: 42, c: "#f87171" },
              { z: "East Zone", v: 32, c: "#fb923c" },
              { z: "South Block", v: 25, c: "#fcd34d" },
              { z: "West Zone", v: 18, c: "#22d3ee" },
              { z: "Buffer Zone", v: 9, c: "#4ade80" },
            ].map((s) => (
              <div key={s.z}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{s.z}</span><span className="font-mono text-foreground/60">{s.v}</span>
                </div>
                <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(s.v / 42) * 100}%` }} transition={{ duration: 0.8 }}
                    className="h-full" style={{ background: s.c, boxShadow: `0 0 8px ${s.c}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-strong holo-border rounded-3xl p-5">
        <h2 className="text-xl font-semibold mb-4">Detection heatmap · this week</h2>
        <div className="grid grid-cols-24 gap-1" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
          {Array.from({ length: 7 * 24 }).map((_, i) => {
            const v = Math.random();
            const c = v > 0.85 ? "#f87171" : v > 0.65 ? "#fb923c" : v > 0.4 ? "#4ade80" : "rgba(74,222,128,0.15)";
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.001 }}
                className="aspect-square rounded-sm" style={{ background: c, boxShadow: v > 0.65 ? `0 0 6px ${c}` : "none" }} />
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-foreground/50">
          <span>Less</span>
          <div className="flex gap-1">
            {["rgba(74,222,128,0.15)","#4ade80","#fb923c","#f87171"].map((c) => <div key={c} className="h-3 w-3 rounded-sm" style={{ background: c }} />)}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
