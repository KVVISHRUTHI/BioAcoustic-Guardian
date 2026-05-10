import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { ForestMap } from "@/components/dashboard/ForestMap";
import { Waveform } from "@/components/dashboard/Waveform";
import { MOCK_ALERTS } from "@/lib/mock-data";
import { Bell, ShieldAlert, Bird, Activity, Cpu, Radar } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const detections = MOCK_ALERTS.map((a) => ({
    id: a.id,
    lat: a.lat,
    lng: a.lng,
    label: `${a.type[0].toUpperCase() + a.type.slice(1)} detected`,
    type: "threat" as const,
    confidence: a.confidence,
    time: a.time,
  }));

  return (
    <div className="space-y-5">
      <Header />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bell} label="Active alerts" value="24" delta="+3 today" tone="alert" hint="6 critical · 12 high" />
        <StatCard icon={ShieldAlert} label="Critical threats" value="7" delta="+1 high priority" tone="alert" />
        <StatCard icon={Bird} label="Species detected" value="143" delta="+12 today" tone="emerald" hint="16 endangered" />
        <StatCard icon={Activity} label="Forest health" value="82/100" delta="+2 pts" tone="emerald" hint="Good · trending up" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground/55 font-mono">Forest monitoring map</div>
              <h2 className="text-xl font-semibold mt-1">Tactical detection radar</h2>
            </div>
            <span className="tag"><Radar className="h-3 w-3" /> Live · 156 sensors</span>
          </div>
          <ForestMap detections={detections} height={460} />
        </div>

        <div className="glass-strong holo-border rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent threats</h2>
            <span className="tag tag-alert">6 critical</span>
          </div>
          <div className="space-y-2">
            {MOCK_ALERTS.slice(0, 6).map((a) => (
              <motion.div
                key={a.id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 rounded-xl glass holo-border"
              >
                <div className={`h-2 w-2 rounded-full ${a.severity === "critical" ? "bg-red-400 pulse-dot-alert" : "bg-amber-400"}`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm capitalize truncate">{a.type} detected</div>
                  <div className="text-[11px] text-foreground/50 font-mono truncate">{a.zone}</div>
                </div>
                <div className="text-[11px] text-foreground/55 font-mono">{a.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground/55 font-mono">Acoustic stream</div>
              <h2 className="text-xl font-semibold mt-1">Live spectrum · North Block A-04</h2>
            </div>
            <span className="tag tag-alert">Threat signature · Chainsaw</span>
          </div>
          <Waveform intensity="alert" height={140} />
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs font-mono">
            <Stat l="Signal" v="−12 dB" />
            <Stat l="Confidence" v="96.4%" />
            <Stat l="Latency" v="1.8s" />
          </div>
        </div>

        <div className="glass-strong holo-border rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Threat distribution</h2>
            <Cpu className="h-4 w-4 text-emerald-300" />
          </div>
          <Donut />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="glass-strong holo-border rounded-3xl p-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="tag mb-3">Command center · Live</div>
          <h1 className="text-3xl font-semibold tracking-tight">Good evening, Ranger Aiyana.</h1>
          <p className="mt-2 text-foreground/65 max-w-xl">
            6 critical events require attention. Forest health is up 2 points this week.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="tag tag-cyber">YAMNet · ready</span>
          <span className="tag">Uptime 99.81%</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ l, v }: { l: string; v: string }) {
  return (
    <div className="glass holo-border rounded-xl p-3">
      <div className="text-[10px] uppercase tracking-widest text-foreground/50">{l}</div>
      <div className="text-lg mt-1">{v}</div>
    </div>
  );
}

function Donut() {
  const segs = [
    { v: 40, c: "#f87171", l: "Chainsaw" },
    { v: 25, c: "#fb923c", l: "Gunshot" },
    { v: 15, c: "#fcd34d", l: "Vehicle" },
    { v: 10, c: "#22d3ee", l: "Fire" },
    { v: 10, c: "#4ade80", l: "Other" },
  ];
  let acc = 0;
  const total = segs.reduce((s, x) => s + x.v, 0);
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-40 w-40 -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        {segs.map((s, i) => {
          const c = 2 * Math.PI * 40;
          const len = (s.v / total) * c;
          const off = (acc / total) * c;
          acc += s.v;
          return (
            <circle key={i} cx="50" cy="50" r="40" fill="none"
              stroke={s.c} strokeWidth="14" strokeLinecap="butt"
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off}
              style={{ filter: `drop-shadow(0 0 6px ${s.c})` }} />
          );
        })}
        <text x="50" y="48" textAnchor="middle" fill="#e6fff0" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(90 50 50)">TOTAL</text>
        <text x="50" y="58" textAnchor="middle" fill="#e6fff0" fontSize="14" fontWeight="600" transform="rotate(90 50 50)">127</text>
      </svg>
      <div className="space-y-1.5 flex-1">
        {segs.map((s) => (
          <div key={s.l} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm" style={{ background: s.c, boxShadow: `0 0 6px ${s.c}` }} />
              <span className="text-foreground/75">{s.l}</span>
            </div>
            <span className="font-mono text-foreground/60">{s.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
