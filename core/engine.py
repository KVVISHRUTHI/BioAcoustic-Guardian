import os
from dotenv import load_dotenv
from core.classifier import classify_audio
from core.threat_map import THREAT_CLASSES, BIODIVERSITY_CLASSES, IGNORE_CLASSES

load_dotenv()
THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", 0.80))


def analyze(file_path, location="Forest Zone A", coords="11.1271,78.6569"):

    raw = classify_audio(file_path)
    top = raw[0]

    label = top["label"]
    confidence = top["confidence"]

    print("DEBUG LABEL:", label)

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

    # STEP 1: THRESHOLD CHECK
    if confidence < THRESHOLD:
        result["decision"] = "LOW_CONFIDENCE"
        return result

    # STEP 2: THREAT CHECK
    for threat_label, meta in THREAT_CLASSES.items():
        if (
          label.lower() in threat_label.lower()
          or threat_label.lower() in label.lower()
        ):
          result["decision"] = "THREAT"
          result["alert_type"] = meta["alert"]
          result["severity"] = meta["severity"]
          return result

    # STEP 3: BIODIVERSITY CHECK
    for bio_label in BIODIVERSITY_CLASSES:
        if bio_label.lower() in label.lower():
            result["decision"] = "BIODIVERSITY"
            result["alert_type"] = "SPECIES_DETECTED"
            return result

    result["decision"] = "UNKNOWN"
    return result


if __name__ == '__main__':
    import sys, json

    path = sys.argv[1] if len(sys.argv) > 1 else 'audio_samples/chainsaw_test.wav'
    output = analyze(path)
    print(json.dumps(output, indent=2))