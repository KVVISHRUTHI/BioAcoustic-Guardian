# 🌿 Bioacoustic Guardian

A Flask-based backend system for analyzing environmental audio to detect illegal logging activity and classify biodiversity-related sound events. The system processes uploaded audio files, runs inference through an audio analysis pipeline, applies a decision layer for threat classification, and logs results with contextual metadata.

---

## ✨ Features

- 📡 REST API for audio upload and analysis  
- 🎧 ML-based audio inference pipeline integration  
- 🧠 Decision engine for THREAT vs BIODIVERSITY classification  
- 🚨 Structured alert generation with severity scoring  
- 🗂️ JSON-based persistent logging system  
- 🔔 Extensible notification layer (optional integration)  
- 🧪 Feedback endpoint for validation of predictions  
- 🌐 CORS-enabled backend for frontend/mobile integration  

---

## 🛠️ Tech Stack

- Python  
- Flask  
- Flask-CORS  
- TensorFlow / Keras (audio classification model)  
- Werkzeug (file handling)  
- JSON (lightweight persistence layer)  

---

## 🏗️ System Architecture

Audio File → Flask API (`/analyze`) → Audio Analysis Engine → Decision Engine → Alert Generator → Logger → API Response

---

## 📁 Project Structure

<p align="center">
  <img src="https://github.com/user-attachments/assets/4ed8fa2a-5250-4179-9ace-7ad1abb5ff3d" width="700"/>
</p>

---

## 🔌 API Endpoints

### 🎯 Analyze Audio

**POST** `/analyze`

Uploads an audio file and returns classification output.

**Form Data:**
- `audio` → audio file  
- `location` → string (e.g., Forest Zone A)  
- `coords` → latitude, longitude  

**Response Example:**

<p align="center">
  <img src="https://github.com/user-attachments/assets/937bc4f4-3ec8-4faf-8915-1e92153a9678" width="450"/>
</p>

---

### 📊 Get Alerts

**GET** `/alerts`

Returns stored threat detection logs in JSON format.

---

### 🌱 Get Biodiversity Logs

**GET** `/biodiversity`

Returns non-threat ecological sound event logs.

---

### 📝 Feedback

**POST** `/feedback`

Stores user validation for model predictions.

---

## 🚀 Setup Instructions

<p align="center">
  <img src="https://github.com/user-attachments/assets/8ced8159-bbf2-4126-a9f1-2db1e7242c5f" width="750"/>
</p>

Server runs at:
http://127.0.0.1:5000

---

## 🧪 API Testing (PowerShell)

<p align="center">
  <img src="https://github.com/user-attachments/assets/cb7b452b-bbaf-425c-993c-e7063f38df47" width="550"/>
</p>

---

## 🧩 Core Components

### 🧠 Audio Analysis Engine
Processes audio input and extracts classification outputs using a trained ML model.

### ⚖️ Decision Engine
Transforms model output into:
- **THREAT** → illegal logging / vehicle / machinery detection  
- **BIODIVERSITY** → natural environmental sound classification  

### 🗂️ Logging System
Stores structured event history in JSON format for traceability and debugging.

---

## 📌 Status

- Backend API → Functional  
- ML Pipeline → Integrated  
- Logging System → Active  
- Deployment → Local (development stage)  

---

## 📎 Notes

- Designed as a modular backend system  
- Can be extended to real-time streaming (IoT / edge devices)  
- Deployment-ready architecture (cloud integration possible)  
```
