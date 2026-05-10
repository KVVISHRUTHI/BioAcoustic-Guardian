import { motion } from "framer-motion";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ rotate: -12, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#a3e635" />
            </linearGradient>
            <radialGradient id="rg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="url(#rg)" />
          <path
            d="M24 6 C 14 14, 12 24, 24 42 C 36 24, 34 14, 24 6 Z"
            fill="url(#lg)"
            opacity="0.95"
          />
          <path d="M24 12 L 24 38" stroke="#052e16" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="24" cy="24" r="3" fill="#052e16" />
          <circle cx="24" cy="24" r="9" fill="none" stroke="#bbf7d0" strokeOpacity="0.4" strokeDasharray="2 4" />
        </svg>
      </motion.div>
      <div className="leading-tight">
        <div className="font-semibold tracking-tight text-[15px]">
          BioAcoustic <span className="text-grad-emerald">Guardian</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-emerald/70 font-mono" style={{ color: "var(--emerald)" }}>
          Forest Intelligence · v2.4
        </div>
      </div>
    </div>
  );
}
