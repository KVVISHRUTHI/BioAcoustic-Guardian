import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchAlerts      = () => API.get("/alerts");
export const fetchBiodiversity = () => API.get("/biodiversity");
export const analyzeAudio     = (formData) =>
  API.post("/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })