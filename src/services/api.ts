// Backend-ready API service layer.
// Wire up VITE_API_BASE_URL when the backend is deployed.

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) throw new Error("API base not configured");
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  analyze: (file: File, lat?: number, lng?: number) => {
    const fd = new FormData();
    fd.append("audio", file);
    if (lat != null) fd.append("lat", String(lat));
    if (lng != null) fd.append("lng", String(lng));
    return fetch(`${BASE}/analyze`, { method: "POST", body: fd }).then((r) => r.json());
  },
  alerts: () => http("/alerts"),
  biodiversity: () => http("/biodiversity"),
  feedback: (alertId: string, kind: "confirm" | "false_alarm") =>
    http("/feedback", { method: "POST", body: JSON.stringify({ alertId, kind }) }),
};
