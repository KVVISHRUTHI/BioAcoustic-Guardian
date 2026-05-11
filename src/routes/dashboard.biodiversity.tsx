import { motion } from "framer-motion";
import { MOCK_BIODIVERSITY } from "@/lib/mock-data";
import { Bird, Leaf, TreePine, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

export default function BiodiversityPage() {
  const d = MOCK_BIODIVERSITY;
  return (
    <div className="space-y-5">
      <div className="glass-strong holo-border rounded-3xl p-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="tag mb-3">Biodiversity</div>
          <h1 className="text-3xl font-semibold tracking-tight">Ecosystem intelligence tracker.</h1>
          <p className="mt-2 text-foreground/65 max-w-xl">Species richness, endangered alerts and conservation health, sensed acoustically.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bird} label="Total species" value={d.totalSpecies} delta="+12 this week" tone="emerald" />
        <StatCard icon={Leaf} label="Endangered" value={d.endangered} delta="+2 this week" tone="amber" />
        <StatCard icon={Activity} label="Detections today" value={d.detectionsToday} delta="+23 today" tone="cyber" />
        <StatCard icon={TreePine} label="Forest health" value={`${d.forestHealth}/100`} delta="Good" tone="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-1">Top detected species</h2>
          <p className="text-xs text-foreground/55 font-mono uppercase tracking-widest mb-4">Last 7 days</p>
          <div className="space-y-3">
            {d.topSpecies.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span className="font-mono text-foreground/60">{s.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(s.count / 124) * 100}%` }} transition={{ delay: i * 0.05, duration: 0.7 }}
                    className="h-full" style={{ background: "var(--grad-emerald)", boxShadow: "0 0 8px rgba(74,222,128,0.5)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Species detection trend</h2>
            <div className="flex items-center gap-2 text-[11px] font-mono text-foreground/55">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" />This week</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-400" />Last week</span>
            </div>
          </div>
          <LineChart this7={d.trendThisWeek} last7={d.trendLastWeek} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-4">Conservation status</h2>
          <ConservationDonut data={d.conservation} />
        </div>

        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-4">Recent endangered detections</h2>
          <div className="space-y-2">
            {[
              { species: "Indian Pangolin", scientific: "Manis crassicaudata", time: "May 30 · 02:12 AM", zone: "North Block", sev: "high" },
              { species: "Clouded Leopard", scientific: "Neofelis nebulosa", time: "May 30 · 04:45 AM", zone: "East Zone", sev: "high" },
              { species: "Great Hornbill", scientific: "Buceros bicornis", time: "May 29 · 07:30 AM", zone: "West Zone", sev: "medium" },
              { species: "Lion-tailed Macaque", scientific: "Macaca silenus", time: "May 29 · 03:18 PM", zone: "South Block", sev: "high" },
            ].map((r, i) => (
              <motion.div key={r.species} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="glass holo-border rounded-xl p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl grid place-items-center" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
                  <Bird className="h-4 w-4 text-emerald-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{r.species}</div>
                  <div className="text-[11px] italic text-foreground/55 font-mono">{r.scientific}</div>
                </div>
                <div className="hidden sm:block text-[11px] text-foreground/55 font-mono">{r.zone}</div>
                <span className={`tag ${r.sev === "high" ? "tag-amber" : ""}`}>{r.sev}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LineChart({ this7, last7 }: { this7: number[]; last7: number[] }) {
  const W = 600, H = 220, P = 30;
  const max = Math.max(...this7, ...last7) * 1.1;
  const xs = (i: number) => P + (i * (W - P * 2)) / 6;
  const ys = (v: number) => H - P - (v / max) * (H - P * 2);
  const path = (data: number[]) => data.map((v, i) => `${i === 0 ? "M" : "L"}${xs(i)},${ys(v)}`).join(" ");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="bg-emerald" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={P} x2={W - P} y1={P + i * (H - P * 2) / 3} y2={P + i * (H - P * 2) / 3} stroke="rgba(255,255,255,0.05)" />
      ))}
      <path d={`${path(this7)} L${xs(6)},${H - P} L${xs(0)},${H - P} Z`} fill="url(#bg-emerald)" />
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }}
        d={path(last7)} fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
        d={path(this7)} fill="none" stroke="#4ade80" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 6px rgba(74,222,128,0.7))" }} />
      {this7.map((v, i) => (
        <circle key={i} cx={xs(i)} cy={ys(v)} r="3.5" fill="#4ade80" stroke="#052e16" strokeWidth="1.5" />
      ))}
      {days.map((d, i) => (
        <text key={d} x={xs(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.45)" fontFamily="JetBrains Mono">{d}</text>
      ))}
    </svg>
  );
}

function ConservationDonut({ data }: { data: { least: number; vulnerable: number; endangered: number; critical: number } }) {
  const segs = [
    { v: data.least, c: "#4ade80", l: "Least concern" },
    { v: data.vulnerable, c: "#fcd34d", l: "Vulnerable" },
    { v: data.endangered, c: "#fb923c", l: "Endangered" },
    { v: data.critical, c: "#f87171", l: "Critically endangered" },
  ];
  const total = segs.reduce((s, x) => s + x.v, 0);
  let acc = 0;
  return (
    <div>
      <svg viewBox="0 0 100 100" className="w-full max-w-[220px] mx-auto -rotate-90">
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        {segs.map((s, i) => {
          const c = 2 * Math.PI * 38;
          const len = (s.v / total) * c;
          const off = (acc / total) * c;
          acc += s.v;
          return (
            <circle key={i} cx="50" cy="50" r="38" fill="none" stroke={s.c} strokeWidth="14"
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off}
              style={{ filter: `drop-shadow(0 0 5px ${s.c})` }} />
          );
        })}
        <text x="50" y="48" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.55)" fontFamily="JetBrains Mono" transform="rotate(90 50 50)">Total</text>
        <text x="50" y="58" textAnchor="middle" fontSize="14" fill="#e6fff0" fontWeight="600" transform="rotate(90 50 50)">{total}</text>
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {segs.map((s) => (
          <div key={s.l} className="flex items-center gap-2 glass holo-border rounded-lg p-2">
            <span className="h-2 w-2 rounded-sm" style={{ background: s.c, boxShadow: `0 0 6px ${s.c}` }} />
            <span className="text-foreground/75 truncate flex-1">{s.l}</span>
            <span className="font-mono text-foreground/55">{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
