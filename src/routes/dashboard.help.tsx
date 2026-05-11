import { motion } from "framer-motion";
import { useState } from "react";
import { Search, BookOpen, Code, Video, FileText, MessageCircle, ChevronDown } from "lucide-react";

const FAQS = [
  { q: "How does Guardian classify acoustic signatures?", a: "Audio is streamed to YAMNet baseline + custom CNN heads for forest-specific events. Confidence > 80% triggers an alert." },
  { q: "What are the API endpoints?", a: "POST /analyze for audio uploads, GET /alerts for the live feed, GET /biodiversity for ecology data, POST /feedback to acknowledge or flag false positives." },
  { q: "How are rangers notified?", a: "All critical alerts are sent via the Telegram bot @GuardianBot with sub-3s p95 latency and require explicit acknowledgement." },
  { q: "Can I deploy on edge hardware?", a: "Yes. Ruggedized Raspberry Pi 5 / Coral TPU nodes with solar power. Edge inference + cloud backhaul." },
];

export default function HelpPage() {
  return (
    <div className="space-y-5">
      <div className="glass-strong holo-border rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="relative">
          <div className="tag mb-3">Help center</div>
          <h1 className="text-3xl font-semibold tracking-tight">How can we help, Ranger?</h1>
          <p className="mt-2 text-foreground/65">Setup guides, API references, tutorials and direct support.</p>
          <div className="mt-5 max-w-xl relative">
            <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input placeholder="Search help articles, API references…" className="field pl-11" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, t: "Getting started", d: "Quick setup guide" },
          { icon: FileText, t: "User manual", d: "Platform documentation" },
          { icon: Code, t: "API documentation", d: "Endpoint reference" },
          { icon: Video, t: "Video tutorials", d: "Step-by-step walkthroughs" },
        ].map((c, i) => (
          <motion.button key={c.t} whileHover={{ y: -3 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="glass-strong holo-border rounded-2xl p-5 text-left">
            <c.icon className="h-5 w-5 text-emerald-300 mb-3" />
            <div className="font-semibold">{c.t}</div>
            <div className="text-[11px] text-foreground/55 mt-1">{c.d}</div>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-4">Frequently asked</h2>
          <div className="space-y-2">
            {FAQS.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>
        </div>

        <div className="glass-strong holo-border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-2">Need more help?</h2>
          <p className="text-sm text-foreground/65">Our support team is online 24/7.</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="glass holo-border rounded-xl p-3">support@bioacousticguardian.org</div>
            <div className="glass holo-border rounded-xl p-3 font-mono">+1 (415) 555-0142</div>
          </div>
          <button className="btn-cta w-full mt-4 justify-center"><MessageCircle className="h-4 w-4" /> Contact support</button>
        </div>
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass holo-border rounded-xl">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="text-sm">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-emerald-300" /></motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <div className="px-4 pb-4 text-sm text-foreground/70">{a}</div>
      </motion.div>
    </div>
  );
}
