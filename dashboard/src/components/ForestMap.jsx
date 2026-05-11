import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { fetchAlerts } from "../api";

const CENTER = [11.1271, 78.6569];

export default function ForestMap() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const load = () => fetchAlerts().then(r => setAlerts(r.data));
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200" style={{height: 320}}>
      <MapContainer center={CENTER} zoom={10} style={{height:"100%",width:"100%"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {alerts.map((a, i) => {
          const [lat, lng] = (a.coords || "11.1271,78.6569").split(",").map(Number);
          const color = a.severity === "CRITICAL" ? "#dc2626"
                      : a.severity === "HIGH"     ? "#ea580c" : "#eab308";
          return (
            <CircleMarker key={i} center={[lat, lng]}
              radius={10} color={color} fillColor={color} fillOpacity={0.6}>
              <Popup>
                <strong>{a.alert_type}</strong><br/>
                {a.location}<br/>
                {Math.round(a.confidence * 100)}% confidence
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}