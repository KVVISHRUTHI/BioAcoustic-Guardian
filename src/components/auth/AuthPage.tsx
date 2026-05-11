import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { ParticleField } from "@/components/atmosphere/ParticleField";
import { GridOverlay } from "@/components/atmosphere/GridOverlay";
import { useState } from "react";
import { Eye, EyeOff, Github, Mail, Shield, Lock, User as UserIcon } from "lucide-react";
import forestBg from "@/assets/forest-bg.jpg";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 overflow-hidden relative">
      {/* LEFT — cinematic hero */}
      <div className="relative hidden lg:flex items-end p-12 overflow-hidden">
        <img src={forestBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050c07]/50 via-[#050c07]/30 to-[#050c07]" />
        <div className="absolute inset-0">
          <ParticleField density={50} />
        </div>
        <GridOverlay />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-xl"
        >
          <div className="tag mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
            Secure access · Encrypted channel
          </div>
          <h1 className="text-5xl xl:text-6xl font-semibold leading-[1.05] tracking-tight">
            Listen to the <span className="text-grad-emerald">forest.</span><br />
            Defend what speaks <em className="not-italic text-grad-emerald">first.</em>
          </h1>
          <p className="mt-6 text-base text-foreground/70 max-w-md">
            BioAcoustic Guardian is the cinematic AI command center for real-time forest surveillance —
            chainsaws, gunshots, poachers, biodiversity, all heard before they're seen.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { v: "521", l: "Audio datasets" },
              { v: "98.7%", l: "Detection accuracy" },
              { v: "24/7", l: "Live monitoring" },
            ].map((s) => (
              <div key={s.l} className="glass holo-border rounded-2xl p-4">
                <div className="text-xl font-semibold text-grad-emerald">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-foreground/55 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* floating telemetry */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-12 right-12 glass-strong holo-border rounded-2xl p-4 w-72 float-y"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] tracking-widest uppercase font-mono text-emerald-300/80">Live telemetry</div>
            <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
          </div>
          <div className="space-y-2 text-xs font-mono text-foreground/75">
            <div className="flex justify-between"><span>SECTOR</span><span className="text-emerald-300">North Block · A-04</span></div>
            <div className="flex justify-between"><span>SENSORS</span><span>156 / 156 online</span></div>
            <div className="flex justify-between"><span>UPTIME</span><span>99.81%</span></div>
            <div className="flex justify-between"><span>AI ENGINE</span><span className="text-emerald-300">YAMNet · ready</span></div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — auth */}
      <div className="relative flex items-center justify-center p-6 sm:p-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-[140px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md glass-strong holo-border rounded-3xl p-8 sm:p-10 shadow-deep"
        >
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <div className="tag">
              <Shield className="h-3 w-3" /> SHA-256
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">
            {mode === "login" ? "Welcome back, Ranger." : "Join the Guardian network."}
          </h2>
          <p className="text-sm text-foreground/60 mt-1">
            {mode === "login" ? "Authenticate to enter the command center." : "Create your operator credentials."}
          </p>

          {/* mode switch */}
          <div className="mt-6 grid grid-cols-2 p-1 rounded-full glass relative">
            <motion.div
              layout
              className="absolute inset-y-1 w-1/2 rounded-full"
              animate={{ x: mode === "login" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ background: "var(--grad-emerald)", boxShadow: "0 0 30px oklch(0.78 0.20 150 / 0.5)" }}
            />
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative z-10 py-2 text-sm font-medium rounded-full transition ${mode === m ? "text-emerald-950" : "text-foreground/70"}`}
              >
                {m === "login" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => navigate("/dashboard"), 50); }}
          >
            {mode === "signup" && (
              <Field icon={<UserIcon className="h-4 w-4" />} placeholder="Operator name" type="text" />
            )}
            <Field icon={<Mail className="h-4 w-4" />} placeholder="ranger@guardian.io" type="email" />
            <Field
              icon={<Lock className="h-4 w-4" />}
              placeholder="••••••••••"
              type={showPw ? "text" : "password"}
              right={
                <button type="button" onClick={() => setShowPw((v) => !v)} className="text-foreground/50 hover:text-emerald-300 transition">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-foreground/70">
                <input type="checkbox" className="accent-emerald-500 h-3.5 w-3.5" defaultChecked />
                Remember this device
              </label>
              <a className="text-emerald-300 hover:text-emerald-200 transition">Forgot password?</a>
            </div>

            <button type="submit" className="btn-cta w-full mt-2">
              {mode === "login" ? "Enter command center" : "Create operator"} →
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-[10px] tracking-widest text-foreground/40 font-mono">
            <div className="h-px flex-1 bg-foreground/10" /> OR CONTINUE WITH <div className="h-px flex-1 bg-foreground/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-ghost justify-center"><Github className="h-4 w-4" /> GitHub</button>
            <button className="btn-ghost justify-center">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v3.2h5.35c-.23 1.6-1.7 4.7-5.35 4.7-3.22 0-5.85-2.66-5.85-5.95S8.78 7.1 12 7.1c1.83 0 3.06.78 3.76 1.45l2.57-2.48C16.7 4.6 14.55 3.6 12 3.6 6.98 3.6 2.92 7.65 2.92 12.7S6.98 21.8 12 21.8c6.92 0 9.2-4.85 9.2-7.4 0-.5-.05-.9-.12-1.3z"/></svg>
              Google
            </button>
          </div>

          <Link to="/" className="block mt-6 text-center text-xs text-foreground/50 hover:text-emerald-300 transition">
            ← Back to landing
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  icon, right, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <label className="block relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-300/70">{icon}</span>
      <input className="field pl-10 pr-10" {...props} />
      {right && <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{right}</span>}
    </label>
  );
}
