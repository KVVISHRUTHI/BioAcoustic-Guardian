import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta?: string;
  tone?: "emerald" | "alert" | "cyber" | "amber";
  hint?: string;
}

export function StatCard({ icon: Icon, label, value, delta, tone = "emerald", hint }: Props) {
  const toneMap = {
    emerald: { glow: "rgba(74,222,128,0.35)", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)", text: "#6ee7b7" },
    alert: { glow: "rgba(248,113,113,0.4)", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.35)", text: "#fca5a5" },
    cyber: { glow: "rgba(34,211,238,0.35)", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.35)", text: "#67e8f9" },
    amber: { glow: "rgba(251,191,36,0.35)", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.35)", text: "#fcd34d" },
  }[tone];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="relative glass-strong holo-border rounded-2xl p-5 overflow-hidden"
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl" style={{ background: toneMap.glow }} />
      <div className="relative flex items-start justify-between">
        <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: toneMap.bg, border: `1px solid ${toneMap.border}` }}>
          <Icon className="h-4 w-4" style={{ color: toneMap.text }} />
        </div>
        {delta && (
          <span className="text-[10px] font-mono px-2 py-1 rounded-full" style={{ background: toneMap.bg, color: toneMap.text }}>
            {delta}
          </span>
        )}
      </div>
      <div className="relative mt-4 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="relative text-[11px] uppercase tracking-widest text-foreground/55 mt-1">{label}</div>
      {hint && <div className="relative text-[11px] text-foreground/45 mt-2 font-mono">{hint}</div>}
    </motion.div>
  );
}
