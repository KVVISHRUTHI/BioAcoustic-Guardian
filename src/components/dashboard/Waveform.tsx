import { motion } from "framer-motion";

interface Props {
  bars?: number;
  intensity?: "calm" | "alert";
  height?: number;
  className?: string;
}

export function Waveform({ bars = 80, intensity = "calm", height = 120, className = "" }: Props) {
  const isAlert = intensity === "alert";
  return (
    <div className={`relative w-full glass holo-border rounded-2xl p-4 overflow-hidden ${className}`} style={{ height }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: isAlert
            ? "radial-gradient(ellipse at center, rgba(248,113,113,0.18), transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(74,222,128,0.16), transparent 70%)"
        }}
      />
      <div className="relative flex items-end gap-[3px] h-full">
        {Array.from({ length: bars }).map((_, i) => {
          const base = isAlert
            ? 30 + Math.abs(Math.sin(i * 0.5)) * 70 + Math.random() * 20
            : 20 + Math.abs(Math.sin(i * 0.3)) * 40;
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                background: isAlert
                  ? "linear-gradient(180deg, #f87171, #dc2626)"
                  : "linear-gradient(180deg, #4ade80, #16a34a)",
                boxShadow: isAlert ? "0 0 10px rgba(248,113,113,0.6)" : "0 0 8px rgba(74,222,128,0.4)"
              }}
              animate={{
                height: [`${base}%`, `${Math.max(8, base + (Math.random() - 0.5) * (isAlert ? 50 : 25))}%`]
              }}
              transition={{
                duration: isAlert ? 0.25 + Math.random() * 0.25 : 0.7 + Math.random() * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.005,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
