import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import { fetchBiodiversity } from "../api";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function BiodiversityChart() {
  const [data, setData] = useState({});

  useEffect(() => {
    const load = () => fetchBiodiversity().then(r => setData(r.data));
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, []);

  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
        Biodiversity index
      </h2>
      {labels.length === 0
        ? <p className="text-sm text-gray-400">No species detected yet.</p>
        : <Bar
            data={{
              labels,
              datasets: [{ label: "Detections", data: values,
                backgroundColor: "#1D9E75", borderRadius: 4 }]
            }}
            options={{ indexAxis:"y", responsive:true,
              plugins:{ legend:{ display:false } },
              scales:{ x:{ ticks:{ stepSize:1 } } }
            }}
          />
      }
    </div>
  );
}