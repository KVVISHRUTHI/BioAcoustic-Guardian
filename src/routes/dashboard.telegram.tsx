import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Zap, Radio } from "lucide-react";

interface Msg { id: string; text: string; status: "sending" | "delivered" | "ack"; time: string; }

export default function TelegramPage() {
  const [connected] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "m1", text: "CRITICAL · Chainsaw detected · North Block A-04", status: "ack", time: "2m ago" },
    { id: "m2", text: "CRITICAL · Gunshot detected · East Zone B-02", status: "delivered", time: "6m ago" },
    { id: "m3", text: "HIGH · Vehicle intrusion · South Block C-07", status: "ack", time: "15m ago" },
  ]);
  const [pulse, setPulse] = useState(false);

  const sendAlert = () => {
    setPulse(true);
    const id = Math.random().toString(36).slice(2);
    const m: Msg = { id, text: "EMERGENCY BROADCAST · All units respond to North Block A-04", status: "sending", time: "now" };
    setMsgs((x) => [m, ...x]);
    setTimeout(() => setMsgs((x) => x.map((y) => y.id === id ? { ...y, status: "delivered" } : y)), 900);
    setTimeout(() => setMsgs((x) => x.map((y) => y.id === id ? { ...y, status: "ack" } : y)), 2400);
    setTimeout(() => setPulse(false), 1200);
  };

  return (
    <div className="space-y-5">
      <div className="glass-strong holo-border rounded-3xl p-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="tag tag-cyber mb-3">Communications</div>
          <h1 className="text-3xl font-semibold tracking-tight">Telegram operations.</h1>
          <p className="mt-2 text-foreground/65 max-w-xl">Real-time ranger comms, alert delivery telemetry and emergency broadcast.</p>
        </div>
        <div className={`tag ${connected ? "" : "tag-alert"}`}>
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-400 pulse-dot" : "bg-red-400"}`} />
          {connected ? "Bot connected" : "Disconnected"}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* QR / Bot panel */}
        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative flex flex-col items-center text-center">
            <motion.div animate={{ scale: pulse ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.5), transparent 60%)", filter: "blur(30px)" }} />
              <div className="relative h-32 w-32 rounded-full grid place-items-center"
                   style={{ background: "linear-gradient(135deg, #22d3ee, #4ade80)", boxShadow: "0 0 60px rgba(34,211,238,0.6)" }}>
                <Send className="h-14 w-14 text-emerald-950" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-semibold mt-6">@GuardianBot</h2>
            <p className="text-sm text-foreground/60 mt-1">Live link to ranger units</p>

            <div className="mt-6 grid grid-cols-2 gap-3 w-full">
              <Stat l="Delivery rate" v="99.4%" />
              <Stat l="Avg latency" v="2.1s" />
              <Stat l="Subscribed" v="48" />
              <Stat l="Acks today" v="312" />
            </div>

            <div className="mt-6 grid grid-cols-12 grid-rows-12 gap-[3px] w-40 h-40 p-3 bg-white/5 rounded-2xl holo-border">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="rounded-[1px]" style={{ background: Math.random() > 0.45 ? "#6ee7b7" : "transparent" }} />
              ))}
            </div>
            <div className="text-[10px] mt-2 text-foreground/50 font-mono uppercase tracking-widest">Scan to connect</div>
          </div>
        </div>

        {/* Activity */}
        <div className="lg:col-span-3 glass-strong holo-border rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Live activity</h2>
            <span className="tag"><Radio className="h-3 w-3" /> streaming</span>
          </div>

          <button onClick={sendAlert} className="btn-cta w-full justify-center mb-4">
            <Zap className="h-4 w-4" /> Trigger emergency broadcast
          </button>

          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass holo-border rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0"
                       style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)" }}>
                    <Send className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{m.text}</div>
                    <div className="text-[11px] text-foreground/50 font-mono">{m.time}</div>
                  </div>
                  {m.status === "sending" && <span className="tag tag-amber">sending…</span>}
                  {m.status === "delivered" && <span className="tag tag-cyber">delivered</span>}
                  {m.status === "ack" && <span className="tag"><CheckCircle2 className="h-3 w-3" /> acknowledged</span>}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="glass-strong holo-border rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Bot commands</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { cmd: "/start", desc: "Start the bot", icon: Send },
            { cmd: "/alerts", desc: "Recent alerts", icon: AlertTriangle },
            { cmd: "/status", desc: "Bot status", icon: Radio },
            { cmd: "/help", desc: "All commands", icon: Zap },
          ].map((c) => (
            <div key={c.cmd} className="glass holo-border rounded-xl p-3 flex items-center gap-3">
              <c.icon className="h-4 w-4 text-cyan-300" />
              <div className="flex-1">
                <div className="font-mono text-sm">{c.cmd}</div>
                <div className="text-[11px] text-foreground/55">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ l, v }: { l: string; v: string }) {
  return (
    <div className="glass holo-border rounded-xl p-3 text-left">
      <div className="text-[10px] uppercase tracking-widest text-foreground/50">{l}</div>
      <div className="mt-1 text-lg">{v}</div>
    </div>
  );
}
