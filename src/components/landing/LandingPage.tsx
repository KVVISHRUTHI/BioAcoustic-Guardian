import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Logo } from "@/components/brand/Logo";
import { ParticleField } from "@/components/atmosphere/ParticleField";
import { GridOverlay } from "@/components/atmosphere/GridOverlay";
import tigerImg from "@/assets/tiger.jpg";
import forestBg from "@/assets/forest-bg.jpg";
import {
  Activity, Radar, Bird, Crosshair, Bell, Brain, MessageSquare, BarChart3,
  TreePine, ShieldAlert, Leaf, FlaskConical, Users, Cpu, Waves, Cloud, MapPin,
  Mail, Phone, MapPinned, ArrowRight, Sparkles
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="relative">
      <Nav />
      <Hero />
      <Section id="features" eyebrow="Capabilities" title="A sensory cortex for the wild." subtitle="Eight interlocking AI modules that turn ambient sound into actionable intelligence.">
        <FeatureGrid />
      </Section>
      <Section id="solutions" eyebrow="Solutions" title="From silent forests to defended ecosystems." subtitle="Deployed across conservation programs, ranger battalions and biodiversity research labs.">
        <SolutionsGrid />
      </Section>
      <Section id="technology" eyebrow="Technology" title="The acoustic intelligence stack.">
        <TechStack />
      </Section>
      <Section id="about" eyebrow="About" title="Built for the planet's last quiet places." subtitle="Aligned with UN SDG 15: Life on Land. Built with rangers, conservationists and AI researchers across 4 continents.">
        <AboutGrid />
      </Section>
      <Section id="contact" eyebrow="Contact" title="Open a secure channel." subtitle="Tell us where the forest is. We'll bring the ears.">
        <ContactBlock />
      </Section>
      <Footer />
    </div>
  );
}

function Nav() {
  const items = [
    { label: "Home", href: "#top" },
    { label: "Features", href: "#features" },
    { label: "Solutions", href: "#solutions" },
    { label: "Technology", href: "#technology" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))]">
      <div className="glass-strong holo-border rounded-full px-5 py-2.5 flex items-center justify-between">
        <Logo size={32} />
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {items.map((i) => (
            <a key={i.label} href={i.href} className="px-3 py-1.5 rounded-full text-foreground/70 hover:text-emerald-300 hover:bg-emerald-500/10 transition">
              {i.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:inline-flex btn-ghost text-sm py-2 px-4">Login</Link>
          <Link to="/login" className="btn-cta text-sm py-2 px-4">Sign up</Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100vh] pt-32 pb-24 overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img src={forestBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050c07]/60 via-[#050c07]/40 to-[#050c07]" />
        <ParticleField density={70} />
      </motion.div>
      <GridOverlay />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-6"><Sparkles className="h-3 w-3" /> AI-powered environmental intelligence</span>
            <h1 className="text-5xl sm:text-6xl lg:text-[88px] leading-[0.95] font-semibold tracking-tight">
              BioAcoustic<br />
              <span className="text-grad-emerald">Guardian.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/70 leading-relaxed">
              An acoustic AI command center that listens to the wild, detects threats,
              tracks biodiversity and helps rangers act in real time —
              before the chainsaw bites, before the gunshot echoes.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/dashboard" className="btn-cta">Start monitoring <ArrowRight className="h-4 w-4" /></Link>
              <a href="#features" className="btn-ghost">Explore the platform</a>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {[
                { v: "521", l: "Audio datasets" },
                { v: "98.7%", l: "Detection accuracy" },
                { v: "24/7", l: "Live monitoring" },
                { v: "50K+", l: "Hours analyzed" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass holo-border rounded-2xl p-4"
                >
                  <div className="text-3xl font-semibold text-grad-emerald">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-widest text-foreground/55 mt-1">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-square rounded-[36px] overflow-hidden glass-strong holo-border shadow-deep"
          >
            <img src={tigerImg} alt="Bengal tiger in dark jungle" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050c07] via-transparent to-transparent" />

            {/* radar overlay */}
            <div className="absolute inset-6 rounded-full border border-emerald-400/20" />
            <div className="absolute inset-12 rounded-full border border-emerald-400/15" />
            <div className="absolute inset-20 rounded-full border border-emerald-400/10" />
            <div className="absolute inset-6 rounded-full overflow-hidden">
              <div
                className="radar-sweep absolute inset-0"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, rgba(74,222,128,0.35) 30deg, transparent 60deg)"
                }}
              />
            </div>

            {/* HUD chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute top-4 left-4 glass rounded-xl px-3 py-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
                LIVE · 14.218°N · 75.821°E
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-3"
            >
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest mb-2 text-foreground/60">
                <span>Acoustic signature</span>
                <span className="text-emerald-300">Tiger · 96.4%</span>
              </div>
              <div className="flex items-end gap-1 h-10">
                {Array.from({ length: 36 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ background: "linear-gradient(180deg, #4ade80, #65a30d)" }}
                    animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                    transition={{ duration: 0.8 + Math.random() * 0.6, repeat: Infinity, repeatType: "reverse" }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* floating ambient cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="hidden md:block absolute -left-8 top-12 glass-strong rounded-2xl px-4 py-3 w-56"
          >
            <div className="text-[10px] tracking-widest uppercase font-mono text-emerald-300/80">Threat detected</div>
            <div className="text-sm mt-1">Chainsaw · North Block A-04</div>
            <div className="text-[11px] text-foreground/60 font-mono mt-1">2s ago · severity HIGH</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="hidden md:block absolute -right-6 bottom-12 glass-strong rounded-2xl px-4 py-3 w-52"
          >
            <div className="text-[10px] tracking-widest uppercase font-mono text-emerald-300/80">Biodiversity</div>
            <div className="text-sm mt-1">Hornbill · 92.1% confidence</div>
            <div className="text-[11px] text-foreground/60 font-mono mt-1">East Zone · Block C</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, subtitle, children }: { id: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-28 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="tag mb-4">{eyebrow}</div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-foreground/65">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Crosshair, title: "Illegal logging detection", desc: "Real-time chainsaw signatures classified at <2s latency." },
  { icon: ShieldAlert, title: "Gunshot detection", desc: "Caliber-aware acoustic fingerprinting across 14 weapon classes." },
  { icon: Bird, title: "Biodiversity monitoring", desc: "Species-level recognition for 1,200+ birds, mammals, amphibians." },
  { icon: Radar, title: "Wildlife tracking", desc: "Continuous bioacoustic positioning of endangered species." },
  { icon: Activity, title: "Ranger intelligence system", desc: "Tactical event feeds, GPS overlays, escalation playbooks." },
  { icon: Brain, title: "AI acoustic analysis", desc: "YAMNet + custom CNNs trained on 50K hours of canopy audio." },
  { icon: MessageSquare, title: "Instant Telegram alerts", desc: "Sub-3s alert delivery to ranger units with acknowledgement loop." },
  { icon: BarChart3, title: "Real-time analytics", desc: "Live dashboards, threat heatmaps, biodiversity trend lines." },
];

function FeatureGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 4) * 0.06 }}
          className="group relative glass holo-border rounded-2xl p-6 hover:bg-emerald-500/[0.04] transition"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none"
               style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(74,222,128,0.12), transparent 60%)" }} />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl mb-5"
               style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.18), rgba(34,211,238,0.1))", border: "1px solid rgba(74,222,128,0.25)" }}>
            <f.icon className="h-5 w-5 text-emerald-300" />
          </div>
          <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
          <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

const SOLUTIONS = [
  { icon: TreePine, title: "Forest conservation", desc: "Continuous canopy auditing across reserves and buffer zones." },
  { icon: ShieldAlert, title: "Anti-poaching intelligence", desc: "Threat triangulation, ranger dispatch, ethical evidence trails." },
  { icon: Leaf, title: "Environmental monitoring", desc: "Air, water and soundscape composite health scoring." },
  { icon: Bell, title: "Biodiversity protection", desc: "Endangered-species priority feeds with conservation playbooks." },
  { icon: FlaskConical, title: "Ecological research", desc: "Open data API for academic partners and field biologists." },
  { icon: Users, title: "Ranger support systems", desc: "Mobile-ready tactical UI, voice-led briefings, shift handovers." },
];

function SolutionsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {SOLUTIONS.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 3) * 0.07 }}
          className="glass-strong holo-border rounded-3xl p-7 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <s.icon className="h-7 w-7 text-emerald-300 mb-5" />
          <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
          <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

const TECH = [
  { icon: Brain, title: "YAMNet + TensorFlow", desc: "521-class baseline + custom transfer-learned heads." },
  { icon: Waves, title: "Waveform analysis", desc: "Mel-spectrograms, MFCC, harmonic decomposition." },
  { icon: Cpu, title: "Edge deployment", desc: "Ruggedized Raspberry Pi / Coral nodes with solar power." },
  { icon: MapPin, title: "Geospatial intelligence", desc: "Triangulated GPS fixes via multi-sensor TDOA." },
  { icon: Cloud, title: "Cloud pipeline", desc: "Stream → infer → alert → archive at <3s p95." },
  { icon: Activity, title: "Real-time architecture", desc: "Event-driven, horizontally scalable, zero-loss tolerant." },
];

function TechStack() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {TECH.map((t, i) => (
        <motion.div
          key={t.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 3) * 0.07 }}
          className="relative glass holo-border rounded-2xl p-6 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[11px] text-emerald-300/70 tracking-widest">0{i + 1}</span>
            <div className="h-px flex-1 bg-foreground/10" />
            <t.icon className="h-4 w-4 text-emerald-300" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
          <p className="mt-2 text-sm text-foreground/60">{t.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function AboutGrid() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 glass-strong holo-border rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <h3 className="text-2xl font-semibold tracking-tight">Our mission.</h3>
        <p className="mt-4 text-foreground/70 leading-relaxed max-w-2xl">
          The world loses 10 million hectares of forest a year — most of it heard before it's ever seen.
          Guardian turns acoustic intelligence into a frontline defense system: every chainsaw, every gunshot,
          every fading bird call becomes a signal that protects what remains.
        </p>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { v: "12+", l: "Conservation partners" },
            { v: "4", l: "Continents deployed" },
            { v: "SDG 15", l: "Life on land aligned" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl p-4">
              <div className="text-2xl font-semibold text-grad-emerald">{s.v}</div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/55 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass holo-border rounded-3xl p-8"
      >
        <h3 className="text-xl font-semibold tracking-tight">Conservation vision.</h3>
        <ul className="mt-5 space-y-3 text-sm text-foreground/70">
          {[
            "Zero-poaching reserves by 2032",
            "Protect 1M+ hectares of canopy",
            "Open biodiversity data to all researchers",
            "Train 5,000+ rangers on AI tooling",
          ].map((x) => (
            <li key={x} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              {x}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={(e) => e.preventDefault()}
        className="lg:col-span-3 glass-strong holo-border rounded-3xl p-8 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <input className="field" placeholder="Your name" />
          <input className="field" placeholder="Organization" />
        </div>
        <input className="field" placeholder="Email" type="email" />
        <input className="field" placeholder="Region of operation" />
        <textarea className="field min-h-[140px] resize-none" placeholder="Tell us about your forest, your rangers, your challenges…" />
        <button className="btn-cta">Open secure channel <ArrowRight className="h-4 w-4" /></button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 space-y-4"
      >
        {[
          { icon: Mail, label: "Email", value: "support@bioacousticguardian.org" },
          { icon: Phone, label: "Hotline", value: "+1 (415) 555-0142 · 24/7" },
          { icon: MapPinned, label: "HQ", value: "Bengaluru · São Paulo · Nairobi" },
        ].map((c) => (
          <div key={c.label} className="glass holo-border rounded-2xl p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
              <c.icon className="h-4 w-4 text-emerald-300" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/55">{c.label}</div>
              <div className="mt-1 text-sm">{c.value}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-12 border-t border-foreground/10 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo size={28} />
        <div className="text-xs text-foreground/50 font-mono">
          © {new Date().getFullYear()} BioAcoustic Guardian · Built for the planet's last quiet places.
        </div>
      </div>
    </footer>
  );
}
