import os
from dotenv import load_dotenv
from core.classifier import classify_audio
from core.threat_map import THREAT_CLASSES, BIODIVERSITY_CLASSES

load_dotenv()
THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", 0.30))  # lowered for practical use

# Labels to ignore (too generic / useless)
IGNORE_LABELS = [
    "Animal",
    "Wild animals",
    "Outside, rural or natural"
]


def analyze(file_path, location="Forest Zone A", coords="11.1271,78.6569"):

    raw = classify_audio(file_path)

    if not raw:
        return {
            "file": file_path,
            "decision": "ERROR",
            "message": "No detections"
        }

    # -------- FIX 1: FILTER BAD LABELS --------
    filtered = [d for d in raw if d["label"] not in IGNORE_LABELS]

    if filtered:
        top = max(filtered, key=lambda x: x["confidence"])
    else:
        top = max(raw, key=lambda x: x["confidence"])

    label = top["label"]
    confidence = top["confidence"]

    print("DEBUG FILTERED LABEL:", label)

    result = {
        "file": file_path,
        "top_label": label,
        "confidence": confidence,
        "location": location,
        "coords": coords,
        "decision": "SAFE",
        "alert_type": None,
        "severity": None,
        "all_detections": raw
    }

    # -------- STEP 1: THRESHOLD --------
    if confidence < THRESHOLD:
        result["decision"] = "LOW_CONFIDENCE"
        return result

    # Build label pool for smarter matching
    labels_text = " ".join([d["label"].lower() for d in raw])

    # -------- STEP 2: THREAT DETECTION (STRONG LOGIC) --------
    for threat_label, meta in THREAT_CLASSES.items():
        if threat_label.lower() in labels_text:
            result["decision"] = "THREAT"
            result["alert_type"] = meta["alert"]
            result["severity"] = meta["severity"]
            return result

    # Additional heuristic (critical for hackathon robustness)
    if any(word in labels_text for word in ["chainsaw", "engine", "vehicle", "motor"]):
        result["decision"] = "THREAT"
        result["alert_type"] = "ILLEGAL_LOGGING"
        result["severity"] = "MEDIUM"
        return result

    # -------- STEP 3: BIODIVERSITY --------
    for bio_label in BIODIVERSITY_CLASSES:
        if bio_label.lower() in labels_text:
            result["decision"] = "BIODIVERSITY"
            result["alert_type"] = "SPECIES_DETECTED"
            return result

    if any(word in labels_text for word in ["bird", "chirp", "tweet", "crow"]):
        result["decision"] = "BIODIVERSITY"
        result["alert_type"] = "SPECIES_DETECTED"
        return result

    # -------- FALLBACK --------
    result["decision"] = "UNKNOWN"
    return result


if __name__ == '__main__':
    import sys, json

    path = sys.argv[1] if len(sys.argv) > 1 else 'audio_samples/chainsaw_test.wav'
    output = analyze(path)
    print(json.dumps(output, indent=2))