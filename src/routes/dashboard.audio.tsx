import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileAudio, X, Loader2, CheckCircle2 } from "lucide-react";
import { Waveform } from "@/components/dashboard/Waveform";
import { ForestMap, type Detection } from "@/components/dashboard/ForestMap";

export const Route = createFileRoute("/dashboard/audio")({
  component: AudioAnalysisPage,
});

interface Result { time: string; event: string; confidence: number; severity: "critical" | "high" | "medium" | "low" }

function AudioAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<"idle" | "uploading" | "analyzing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [detections, setDetections] = useState<Detection[]>([]);

  const start = (f: File) => {
    setFile(f);
    setPhase("uploading");
    setProgress(0);
    setResults([]);
    setDetections([]);
    let p = 0;
    const t = setInterval(() => {
      p += 4 + Math.random() * 7;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setProgress(100);
        setPhase("analyzing");
        setTimeout(() => {
          setResults([
            { time: "00:13.24", event: "Chainsaw", confidence: 96.4, severity: "critical" },
            { time: "00:32.11", event: "Gunshot", confidence: 92.1, severity: "critical" },
            { time: "00:45.00", event: "Human voice", confidence: 73.5, severity: "medium" },
            { time: "01:02.33", event: "Bird call · Hornbill", confidence: 88.1, severity: "low" },
            { time: "01:15.47", event: "Vehicle", confidence: 83.0, severity: "high" },
          ]);
          setDetections([
            { id: "d1", lat: 14.231, lng: 75.812, label: "Chainsaw · 96%", type: "threat", confidence: 96.4, time: "00:13" },
            { id: "d2", lat: 14.218, lng: 75.834, label: "Gunshot · 92%", type: "threat", confidence: 92.1, time: "00:32" },
            { id: "d3", lat: 14.205, lng: 75.821, label: "Hornbill · 88%", type: "biodiversity", confidence: 88.1, time: "01:02" },
          ]);
          setPhase("done");
        }, 1600);
      } else {
        setProgress(p);
      }
    }, 120);
  };

  return (
    <div className="space-y-5">
      <Header />

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 glass-strong holo-border rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Audio analysis</h2>
            <span className="tag tag-cyber">YAMNet · v2.1</span>
          </div>

          <Dropzone onFile={start} disabled={phase !== "idle" && phase !== "done"} />

          {file && (
            <div className="mt-4 glass holo-border rounded-2xl p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
                <FileAudio className="h-4 w-4 text-emerald-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{file.name}</div>
                <div className="text-[11px] text-foreground/50 font-mono">{(file.size / 1024).toFixed(0)} KB · 02:15</div>
              </div>
              {phase === "uploading" && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> {progress.toFixed(0)}%
                </div>
              )}
              {phase === "analyzing" && (
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analyzing…
                </div>
              )}
              {phase === "done" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
              <button onClick={() => { setFile(null); setPhase("idle"); setResults([]); setDetections([]); }} className="text-foreground/50 hover:text-emerald-300">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2 text-[11px] uppercase tracking-widest font-mono text-foreground/55">
              <span>Spectrum analyzer</span>
              <span className={results.some(r => r.severity === "critical") ? "text-red-300" : "text-emerald-300"}>
                {phase === "done" ? (results.some(r => r.severity === "critical") ? "Threat detected" : "Biodiversity") : "Awaiting input"}
              </span>
            </div>
            <Waveform intensity={results.some(r => r.severity === "critical") ? "alert" : "calm"} height={140} />
            <div className="mt-2 h-1 w-full rounded-full bg-foreground/10 overflow-hidden">
              <motion.div className="h-full" style={{ background: "var(--grad-emerald)" }} animate={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-strong holo-border rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-4">Analysis results</h2>
          <AnimatePresence mode="popLayout">
            {results.length === 0 ? (
              <motion.div key="empty" className="text-sm text-foreground/55 py-10 text-center">
                Upload an audio file to begin AI classification.
              </motion.div>
            ) : (
              <motion.div key="results" className="space-y-2">
                {results.map((r, i) => (
                  <motion.div
                    key={r.time + r.event}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass holo-border rounded-xl p-3 flex items-center gap-3"
                  >
                    <div className="font-mono text-[11px] text-foreground/55 w-16">{r.time}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{r.event}</div>
                      <div className="mt-1 h-1 rounded-full bg-foreground/10 overflow-hidden">
                        <div className="h-full" style={{
                          width: `${r.confidence}%`,
                          background: r.severity === "critical" ? "linear-gradient(90deg,#f87171,#ef4444)" : "var(--grad-emerald)"
                        }} />
                      </div>
                    </div>
                    <div className="text-xs font-mono text-foreground/70">{r.confidence}%</div>
                    <span className={`tag ${r.severity === "critical" ? "tag-alert" : r.severity === "high" ? "tag-amber" : ""}`}>{r.severity}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="glass-strong holo-border rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-foreground/55 font-mono">Geospatial intelligence</div>
            <h2 className="text-xl font-semibold mt-1">Detection map</h2>
          </div>
          <span className="tag">{detections.length} pinned</span>
        </div>
        <ForestMap detections={detections} height={420} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="glass-strong holo-border rounded-3xl p-6 flex items-end justify-between flex-wrap gap-4">
      <div>
        <div className="tag mb-3">Audio module</div>
        <h1 className="text-3xl font-semibold tracking-tight">Acoustic intelligence pipeline.</h1>
        <p className="mt-2 text-foreground/65 max-w-xl">Upload field recordings — Guardian classifies threats and biodiversity in seconds.</p>
      </div>
      <span className="tag tag-cyber">POST /analyze</span>
    </div>
  );
}

function Dropzone({ onFile, disabled }: { onFile: (f: File) => void; disabled?: boolean }) {
  const [over, setOver] = useState(false);
  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); const f = e.dataTransfer.files?.[0]; if (f && !disabled) onFile(f); }}
      className={`relative block rounded-2xl border-2 border-dashed cursor-pointer transition overflow-hidden ${over ? "border-emerald-400/80 bg-emerald-500/10" : "border-emerald-400/30 hover:border-emerald-400/60"} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input type="file" accept="audio/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      <div className="px-8 py-12 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl grid place-items-center mb-4"
             style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.18), rgba(34,211,238,0.1))", border: "1px solid rgba(74,222,128,0.3)" }}>
          <Upload className="h-6 w-6 text-emerald-300" />
        </div>
        <div className="text-base">Drag & drop audio files here</div>
        <div className="text-xs text-foreground/55 mt-1 font-mono">or click to choose · WAV / MP3 / FLAC · max 250 MB</div>
        <button type="button" className="btn-cta mt-5 text-sm py-2 px-4">Choose files</button>
      </div>
      {over && <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />}
    </label>
  );
}
