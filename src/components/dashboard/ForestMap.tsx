import { useEffect, useRef } from "react";

export interface Detection {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: "threat" | "biodiversity" | "neutral";
  confidence?: number;
  time?: string;
}

interface Props {
  detections: Detection[];
  className?: string;
  height?: string | number;
}

export function ForestMap({ detections, className = "", height = 460 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const L = (await import("leaflet")).default;
      if (!mounted || !ref.current || mapRef.current) return;

      const map = L.map(ref.current, {
        center: [14.218, 75.821],
        zoom: 11,
        zoomControl: false,
        attributionControl: true,
      });
      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      drawMarkers(L);
    })();
    return () => {
      mounted = false;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const L = (await import("leaflet")).default;
      drawMarkers(L);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detections]);

  function drawMarkers(L: any) {
    if (!layerRef.current) return;
    layerRef.current.clearLayers();
    detections.forEach((d) => {
      const color = d.type === "threat" ? "#f87171" : d.type === "biodiversity" ? "#4ade80" : "#22d3ee";
      const html = `
        <div style="position:relative;width:28px;height:28px;">
          <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.25;animation:rip 2s infinite;"></div>
          <div style="position:absolute;inset:8px;border-radius:50%;background:${color};box-shadow:0 0 14px ${color};border:2px solid rgba(255,255,255,0.2);"></div>
        </div>
        <style>@keyframes rip{0%{transform:scale(0.6);opacity:0.6}100%{transform:scale(2);opacity:0}}</style>
      `;
      const icon = L.divIcon({ html, className: "", iconSize: [28, 28], iconAnchor: [14, 14] });
      const m = L.marker([d.lat, d.lng], { icon }).addTo(layerRef.current);
      m.bindPopup(`
        <div style="font-family:'Space Grotesk',sans-serif;min-width:180px;">
          <div style="font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#6ee7b7;font-family:'JetBrains Mono',monospace;">${d.type}</div>
          <div style="font-weight:600;margin-top:4px;color:#e6fff0">${d.label}</div>
          ${d.confidence ? `<div style="font-size:11px;color:#9ca3af;margin-top:2px">Confidence ${d.confidence}%</div>` : ""}
          ${d.time ? `<div style="font-size:11px;color:#9ca3af">${d.time}</div>` : ""}
          <div style="font-size:11px;font-family:'JetBrains Mono',monospace;color:#6ee7b7;margin-top:6px">${d.lat.toFixed(4)}°N · ${d.lng.toFixed(4)}°E</div>
        </div>
      `);
    });
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden holo-border ${className}`} style={{ height }}>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
      {/* tactical overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-3 left-3 tag">RADAR · LIVE</div>
        <div className="absolute bottom-3 left-3 glass-strong rounded-lg px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          {detections.length} active detections
        </div>
      </div>
    </div>
  );
}
