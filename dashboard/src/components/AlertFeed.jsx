import { useEffect, useState } from "react";
import { fetchAlerts } from "../api";

const SEVERITY_COLOR = {
  CRITICAL: "bg-red-100 text-red-800 border-red-200",
  HIGH:     "bg-orange-100 text-orange-800 border-orange-200",
  MEDIUM:   "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export default function AlertFeed() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const load = () => fetchAlerts().then(r => setAlerts([...r.data].reverse()));
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 h-full">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
        Live alerts
      </h2>
      {alerts.length === 0 && (
        <p className="text-sm text-gray-400">No alerts yet. Upload an audio file.</p>
      )}
      <div className="space-y-2 overflow-y-auto max-h-80">
        {alerts.map((a, i) => (
          <div key={i} className={`border rounded-lg p-3 text-xs ${SEVERITY_COLOR[a.severity] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{a.alert_type}</span>
              <span className="opacity-60">{a.severity}</span>
            </div>
            <div className="opacity-70">{a.location} — {Math.round(a.confidence * 100)}% confidence</div>
            <div className="opacity-50 mt-1">{new Date(a.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}