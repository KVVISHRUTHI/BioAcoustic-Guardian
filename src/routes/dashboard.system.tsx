import { motion } from "framer-motion";
import { Cpu, HardDrive, Network, Activity, Server, Radar } from "lucide-react";
import { useEffect, useState } from "react";

export default function SystemPage() {
  const [cpu, setCpu] = useState(24);
  const [mem, setMem] = useState(58);
  const [net, setNet] = useState(32);
  useEffect(() => {
    const i = setInterval(() => {
      setCpu((v) => Math.max(8, Math.min(94, v + (Math.random() - 0.5) * 12)));
      setMem((v) => Math.max(20, Math.min(96, v + (Math.random() - 0.5) * 8)));
      setNet((v) => Math.max(5, Math.min(95, v + (Math.random() - 0.5) * 18)));
    }, 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="space-y-5">
      <div className="glass-strong holo-border rounded-3xl p-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="tag tag-cyber mb-3">Diagnostics</div>
          <h1 className="text-3xl font-semibold tracking-tight">System overview.</h1>
          <p className="mt-2 text-foreground/65 max-w-xl">Live operational telemetry · sensors, AI engine, network and storage.</p>
        </div>
        <span className="tag"><Activity className="h-3 w-3" /> All systems operational</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Tile icon={Activity} label="System uptime" value="99.81%" tone="emerald" />
        <Tile icon={Radar} label="Active sensors" value="156 / 156" tone="cyber" />
        <Tile icon={HardDrive} label="Data processed" value="2.4 TB" tone="amber" />
        <Tile icon={Server} label="Storage used" value="68%" tone="emerald" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-4">Performance</h2>
          <Bar icon={Cpu} label="CPU usage" value={cpu} c="#4ade80" />
          <Bar icon={Server} label="Memory" value={mem} c="#22d3ee" />
          <Bar icon={Network} label="Network I/O" value={net} c="#fcd34d" />
        </div>

        <div className="glass-strong holo-border rounded-3xl p-5 relative overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">AI engine vitals</h2>
          <div className="relative grid place-items-center h-64">
            <svg viewBox="0 0 200 200" className="absolute inset-0 m-auto h-56 w-56">
              {[80, 65, 50].map((r, i) => (
                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(74,222,128,0.18)" strokeWidth="1" strokeDasharray="3 3" />
              ))}
              <motion.circle cx="100" cy="100" r="80" fill="none" stroke="rgba(74,222,128,0.5)" strokeWidth="2"
                animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center", strokeDasharray: "10 490" }} />
              <line x1="100" y1="100" x2="100" y2="20" stroke="url(#sweep)" strokeWidth="2" />
              <defs>
                <linearGradient id="sweep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
              <g className="radar-sweep" style={{ transformOrigin: "100px 100px" }}>
                <path d="M 100 100 L 100 20 A 80 80 0 0 1 178 88 Z" fill="url(#sweep)" opacity="0.3" />
              </g>
              <circle cx="100" cy="100" r="4" fill="#4ade80" style={{ filter: "drop-shadow(0 0 8px #4ade80)" }} />
              {[[140, 60], [70, 130], [150, 145], [60, 70]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />
              ))}
            </svg>
            <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-2 text-[10px] font-mono">
              <KV l="Model" v="YAMNet 2.1" />
              <KV l="Inference" v="42ms" />
              <KV l="Queue" v="12 jobs" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-strong holo-border rounded-3xl p-5">
        <h2 className="text-xl font-semibold mb-4">Recent system events</h2>
        <div className="space-y-2">
          {[
            { t: "03:00 AM", e: "System backup completed", c: "#4ade80" },
            { t: "03:15 AM", e: "AI model updated · YAMNet 2.1", c: "#22d3ee" },
            { t: "05:45 AM", e: "New sensors connected · 4 nodes", c: "#fcd34d" },
            { t: "01:30 AM", e: "Database optimized", c: "#4ade80" },
            { t: "12:30 AM", e: "Security scan completed", c: "#4ade80" },
          ].map((r, i) => (
            <motion.div key={r.t + r.e} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="glass holo-border rounded-xl p-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full" style={{ background: r.c, boxShadow: `0 0 6px ${r.c}` }} />
              <span className="flex-1 text-sm">{r.e}</span>
              <span className="text-[11px] font-mono text-foreground/55">{r.t}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tile({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: "emerald" | "cyber" | "amber" }) {
  const map = { emerald: "#4ade80", cyber: "#22d3ee", amber: "#fcd34d" } as const;
  return (
    <motion.div whileHover={{ y: -3 }} className="glass-strong holo-border rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl" style={{ background: map[tone] + "55" }} />
      <Icon className="h-5 w-5 mb-3" style={{ color: map[tone] }} />
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-foreground/55 mt-1">{label}</div>
    </motion.div>
  );
}

function Bar({ icon: Icon, label, value, c }: { icon: any; label: string; value: number; c: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="flex items-center gap-2"><Icon className="h-4 w-4" style={{ color: c }} />{label}</span>
        <span className="font-mono text-foreground/70">{value.toFixed(0)}%</span>
      </div>
      <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
        <motion.div animate={{ width: `${value}%` }} transition={{ type: "spring", stiffness: 100 }}
          className="h-full" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
      </div>
    </div>
  );
}

function KV({ l, v }: { l: string; v: string }) {
  return (
    <div className="glass holo-border rounded-lg p-2">
      <div className="text-[9px] uppercase tracking-widest text-foreground/50">{l}</div>
      <div className="text-foreground/85">{v}</div>
    </div>
  );
}
