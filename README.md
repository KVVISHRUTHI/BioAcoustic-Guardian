# 🌿 Bioacoustic Guardian

> Real-time forest audio intelligence — detecting illegal logging, poaching activity, and biodiversity signals through machine listening.

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=flat-square)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.x-lightgrey?style=flat-square)](https://flask.palletsprojects.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange?style=flat-square)](https://www.tensorflow.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## What It Does

Bioacoustic Guardian listens to forest environments and acts on what it hears. Upload an audio clip and the system runs it through a trained ML model, applies a threat-classification decision engine, and returns a structured JSON response — flagging illegal activity or cataloguing biodiversity events. Designed for ranger operations, conservation monitoring, and hackathon demos where a phone buzzing mid-presentation says more than any slide.

**Chainsaw detected → `THREAT / ILLEGAL_LOGGING / HIGH`**  
**Bird call detected → `BIODIVERSITY / SPECIES_DETECTED`**

---

## Features

- REST API for audio upload and real-time classification
- ML inference pipeline using YAMNet (Google's pretrained audio model)
- Decision engine separating `THREAT`, `BIODIVERSITY`, `SAFE`, and `LOW_CONFIDENCE` outcomes
- Severity scoring (`CRITICAL` / `HIGH` / `MEDIUM`) on all threat alerts
- GPS-aware alert metadata — location and coordinates travel with every decision
- JSON-based persistent logging for alerts and biodiversity records
- Ranger feedback endpoint for result validation and future retraining
- Optional SMS alert dispatch via Twilio (configurable)
- CORS-enabled for direct frontend integration

---

## Tech Stack

| Layer | Technology |
|---|---|
| API server | Python, Flask, Flask-CORS |
| Audio classification | TensorFlow Hub, YAMNet |
| Audio I/O | SoundFile, NumPy |
| File handling | Werkzeug |
| Notifications | Twilio (optional) |
| Persistence | JSON flat files |
| Config | python-dotenv |

---

## System Architecture

```
Audio File
    │
    ▼
POST /analyze (Flask API)
    │
    ▼
Audio Preprocessing
(mono conversion, sample rate normalisation)
    │
    ▼
YAMNet Inference
(521-class audio classification)
    │
    ▼
Decision Engine
(threat_map matching, confidence thresholding)
    │
    ├──► THREAT ──► Alert Generator ──► SMS Notifier (Twilio)
    │                                ──► logs/alerts.json
    │
    ├──► BIODIVERSITY ──► logs/biodiversity.json
    │
    └──► SAFE / LOW_CONFIDENCE ──► JSON response only
    │
    ▼
API Response (JSON)
```

---

## Project Structure

```
bioacoustic-guardian/
├── app.py                   # Flask server — all API endpoints
├── .env                     # Secrets and config (never commit this)
├── requirements.txt
│
├── core/
│   ├── __init__.py
│   ├── classifier.py        # YAMNet model wrapper
│   ├── engine.py            # Decision logic — THREAT vs BIODIVERSITY
│   ├── threat_map.py        # Label-to-alert mapping and severity config
│   ├── notifier.py          # Twilio SMS dispatch
│   ├── logger.py            # JSON read/write for alerts and bio logs
│   └── tester.py            # Batch CLI test harness
│
├── models/
│   └── yamnet_class_map.csv # YAMNet class ID → human label mapping
│
├── audio_samples/
│   ├── chainsaw_test.wav
│   ├── gunshot_test.wav
│   ├── bird_test.wav
│   └── uploads/             # Runtime upload directory
│
└── logs/
    ├── alerts.json          # Threat event log
    └── biodiversity.json    # Species detection log
```

---

## API Reference

### `POST /analyze`

Accepts an audio file and returns a classification decision.

**Form data:**

| Field | Type | Description |
|---|---|---|
| `audio` | file | WAV audio file |
| `location` | string | Human-readable zone name |
| `coords` | string | GPS coordinates (`lat,lng`) |

**Example response:**

```json
{
  "file": "audio_samples/uploads/chainsaw_test.wav",
  "top_label": "Chainsaw",
  "confidence": 0.912,
  "location": "Forest Zone A",
  "coords": "11.1271,78.6569",
  "decision": "THREAT",
  "alert_type": "ILLEGAL_LOGGING",
  "severity": "HIGH",
  "all_detections": [...]
}
```

**Decision values:** `THREAT` · `BIODIVERSITY` · `SAFE` · `LOW_CONFIDENCE`

---

### `GET /alerts`

Returns the full threat detection log as a JSON array.

```json
[
  {
    "timestamp": "2025-04-16T08:42:10.123456",
    "decision": "THREAT",
    "alert_type": "ILLEGAL_LOGGING",
    "severity": "HIGH",
    "location": "Forest Zone A",
    "coords": "11.1271,78.6569",
    "confidence": 0.912,
    "sms_sid": "SM1234...",
    "feedback": null
  }
]
```

---

### `GET /biodiversity`

Returns aggregated species detection counts.

```json
{
  "Bird vocalization, bird call, bird song": 14,
  "Frog": 3,
  "Cricket": 7
}
```

---

### `POST /feedback`

Records ranger confirmation or false-alarm flag against a logged alert.

**Request body:**

```json
{
  "sms_sid": "SM1234abcd...",
  "confirmed": true
}
```

**Response:**

```json
{ "status": "saved" }
```

---

## Setup

### 1. Clone and create environment

```bash
git clone https://github.com/your-username/bioacoustic-guardian.git
cd bioacoustic-guardian
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Download the YAMNet class map

```bash
curl -o models/yamnet_class_map.csv \
  https://raw.githubusercontent.com/tensorflow/models/master/research/audioset/yamnet/yamnet_class_map.csv
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_FROM_NUMBER=+1xxxxxxxxxx
RANGER_PHONE_NUMBER=+91xxxxxxxxxx
CONFIDENCE_THRESHOLD=0.80
DEBUG_MODE=false
```

> Twilio free trial accounts can only SMS to verified numbers. Add your number at [twilio.com/console](https://console.twilio.com) before running.

### 4. Initialise logs

```bash
echo "[]" > logs/alerts.json
echo "[]" > logs/biodiversity.json
```

### 5. Run the server

```bash
python app.py
```

Server starts at `http://127.0.0.1:5000`

---

## Testing

### Run the full batch test suite

```bash
python -m core.tester
```

Expected output:

```
=== BioAcoustic Guardian — Engine Test Suite ===

Testing: audio_samples/chainsaw_test.wav
  Status     :  PASS
  Top label  : Chainsaw
  Confidence : 0.912
  Decision   : THREAT  (expected: THREAT)

Testing: audio_samples/bird_test.wav
  Status     :  PASS
  Top label  : Bird vocalization, bird call, bird song
  Confidence : 0.834
  Decision   : BIODIVERSITY  (expected: BIODIVERSITY)

=== Results: 3/3 passed ===
```

### Test via curl (Linux / macOS)

```bash
# Analyze audio
curl -X POST http://localhost:5000/analyze \
  -F "audio=@audio_samples/chainsaw_test.wav" \
  -F "location=Forest Zone A" \
  -F "coords=11.1271,78.6569"

# Fetch alert log
curl http://localhost:5000/alerts

# Fetch biodiversity counts
curl http://localhost:5000/biodiversity
```

### Test via PowerShell (Windows)

```powershell
$form = @{ audio = Get-Item "audio_samples\chainsaw_test.wav"; location = "Forest Zone A"; coords = "11.1271,78.6569" }
Invoke-RestMethod -Uri "http://localhost:5000/analyze" -Method POST -Form $form
```

---

## Threat Classification Map

| Audio label | Alert type | Severity |
|---|---|---|
| Chainsaw, Sawing, Wood | `ILLEGAL_LOGGING` | HIGH |
| Gunshot, Machine gun, Explosion | `POACHING` | CRITICAL |
| Vehicle, Motorcycle | `INTRUDER` | MEDIUM |

Biodiversity signals (Bird, Frog, Insect, Cricket, Owl, etc.) are logged separately and do not trigger SMS alerts.

---

## Troubleshooting

**`LOW_CONFIDENCE` on every file** — audio may be stereo or MP3. Convert to mono WAV: `ffmpeg -i input.mp3 -ac 1 output.wav`. Temporarily lower `CONFIDENCE_THRESHOLD=0.50` in `.env` to verify label detection logic, then restore to `0.80`.

**`decision: SAFE` when expecting `THREAT`** — run `python -m core.engine your_file.wav` and inspect `top_label`. If the label differs from strings in `threat_map.py`, add it. The engine uses substring matching, so `"Power saw"` won't match `"Sawing"` without an explicit entry.

**`ModuleNotFoundError: No module named 'core'`** — always run from project root using `python -m core.engine`, never `cd core && python engine.py`. Also ensure `core/__init__.py` exists: `touch core/__init__.py`.

**Twilio SMS not arriving** — confirm your destination number is verified in the Twilio console (required on free tier). Check `logs/alerts.json` for a logged `sms_sid` — if present, the API call succeeded and the issue is on Twilio's side.

---

## Status

| Component | Status |
|---|---|
| Backend API | ✅ Functional |
| ML pipeline | ✅ Integrated |
| Logging system | ✅ Active |
| SMS alerts | ✅ Functional (Twilio) |
| React dashboard | 🔧 In progress |
| Edge deployment (Raspberry Pi) | 📋 Planned |

---

## Contributing

Pull requests welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## License

MIT
