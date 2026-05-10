import { useEffect, useState } from "react";

export interface AlertItem {
  id: string;
  type: "chainsaw" | "gunshot" | "vehicle" | "human" | "fire";
  severity: "critical" | "high" | "medium" | "low";
  zone: string;
  time: string;
  lat: number;
  lng: number;
  confidence: number;
  status: "new" | "acknowledged" | "resolved" | "investigating";
}

export interface BiodiversityData {
  totalSpecies: number;
  endangered: number;
  detectionsToday: number;
  forestHealth: number;
  topSpecies: { name: string; count: number }[];
  trendThisWeek: number[];
  trendLastWeek: number[];
  conservation: { least: number; vulnerable: number; endangered: number; critical: number };
}

export const MOCK_ALERTS: AlertItem[] = [
  { id: "a1", type: "chainsaw", severity: "critical", zone: "North Block · A-04", time: "10:34 AM", lat: 14.231, lng: 75.812, confidence: 96.4, status: "new" },
  { id: "a2", type: "gunshot", severity: "critical", zone: "East Zone · B-02", time: "09:15 AM", lat: 14.198, lng: 75.844, confidence: 92.1, status: "investigating" },
  { id: "a3", type: "vehicle", severity: "high", zone: "South Block · C-07", time: "08:42 AM", lat: 14.182, lng: 75.801, confidence: 88.2, status: "acknowledged" },
  { id: "a4", type: "fire", severity: "high", zone: "West Zone · D-01", time: "07:28 AM", lat: 14.245, lng: 75.789, confidence: 81.5, status: "resolved" },
  { id: "a5", type: "human", severity: "medium", zone: "Buffer Zone · E-03", time: "06:46 AM", lat: 14.215, lng: 75.835, confidence: 75.3, status: "new" },
  { id: "a6", type: "chainsaw", severity: "critical", zone: "North Block · B-08", time: "06:14 AM", lat: 14.252, lng: 75.819, confidence: 94.7, status: "investigating" },
];

export const MOCK_BIODIVERSITY: BiodiversityData = {
  totalSpecies: 143,
  endangered: 16,
  detectionsToday: 326,
  forestHealth: 82,
  topSpecies: [
    { name: "Asian Elephant", count: 124 },
    { name: "Hornbill", count: 89 },
    { name: "Gaur", count: 67 },
    { name: "Leopard", count: 54 },
    { name: "Sambar Deer", count: 41 },
  ],
  trendThisWeek: [220, 245, 268, 251, 290, 305, 326],
  trendLastWeek: [200, 215, 230, 222, 248, 260, 278],
  conservation: { least: 92, vulnerable: 35, endangered: 12, critical: 4 },
};

// simulated client hooks
export function useLiveTime() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

export function useTickingCounter(start: number, range = 3, intervalMs = 4000) {
  const [v, setV] = useState(start);
  useEffect(() => {
    const i = setInterval(() => setV((x) => Math.max(0, x + Math.round((Math.random() - 0.4) * range))), intervalMs);
    return () => clearInterval(i);
  }, [range, intervalMs]);
  return v;
}
