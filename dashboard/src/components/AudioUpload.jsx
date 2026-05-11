import { useState } from "react";
import { analyzeAudio } from "../api";

export default function AudioUpload() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setResult(null);
    const form = new FormData();
    form.append("audio", file);
    form.append("location", "Forest Zone A");
    form.append("coords", "11.1271,78.6569");
    try {
      const res = await analyzeAudio(form);
      setResult(res.data);
    } catch (err) {
      setResult({ error: "Analysis failed. Is Flask running?" });
    }
    setLoading(false);
  };

  const decisionColor = result?.decision === "THREAT"
    ? "border-red-400 bg-red-50 text-red-800"
    : result?.decision === "BIODIVERSITY"
    ? "border-green-400 bg-green-50 text-green-800"
    : "border-gray-200 bg-gray-50 text-gray-700";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
        Analyze audio
      </h2>
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition">
        <span className="text-sm text-gray-500">{loading ? "Analyzing..." : "Drop WAV file or click to upload"}</span>
        <input type="file" accept=".wav" className="hidden" onChange={handleFile} disabled={loading}/>
      </label>
      {result && (
        <div className={`mt-3 rounded-lg border p-3 text-sm font-medium ${decisionColor}`}>
          {result.error
            ? result.error
            : <>{result.decision} — {result.alert_type || result.top_label}
                <span className="font-normal ml-2 opacity-70">
                  {Math.round((result.confidence || 0) * 100)}% confidence
                </span>
              </>
          }
        </div>
      )}
    </div>
  );
}