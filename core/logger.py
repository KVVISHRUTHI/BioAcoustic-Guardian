import os
import json
from datetime import datetime

ALERTS_FILE = "data/alerts.json"
BIODIVERSITY_FILE = "data/biodiversity.json"
FEEDBACK_FILE = "data/feedback.json"


def _load(path):
    if not os.path.exists(path):
        return []

    with open(path, "r") as f:
        try:
            content = f.read().strip()
            if not content:
                return []
            return json.loads(content)
        except json.JSONDecodeError:
            return []


def _save(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)


# 🔴 ALERT LOGGING (NORMALIZED)
def log_alert(result, notification=None):
    alerts = _load(ALERTS_FILE)

    message_id = None
    if notification and isinstance(notification, dict):
        message_id = notification.get("result", {}).get("message_id")

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "decision": result.get("decision"),
        "alert_type": result.get("alert_type"),
        "severity": result.get("severity"),
        "confidence": result.get("confidence"),
        "location": result.get("location"),
        "coords": result.get("coords"),

        # normalized notification (no raw dump)
        "notification": {
            "platform": "telegram",
            "message_id": message_id
        } if message_id else None
    }

    alerts.append(entry)
    _save(ALERTS_FILE, alerts)


# 🟢 BIODIVERSITY LOGGING (LEAN)
def log_biodiversity(result):
    data = _load(BIODIVERSITY_FILE)

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "label": result.get("top_label", "Unknown"),
        "confidence": result.get("confidence", 0)
    }

    data.append(entry)
    _save(BIODIVERSITY_FILE, data)


def get_alerts():
    return _load(ALERTS_FILE)


# 🔵 BIODIVERSITY AGGREGATION (DASHBOARD READY)
def get_biodiversity():
    raw = _load(BIODIVERSITY_FILE)

    counts = {}
    for entry in raw:
        label = entry.get("label", "Unknown")
        counts[label] = counts.get(label, 0) + 1

    return counts


# 🟡 FEEDBACK (CONSISTENT STRUCTURE)
def save_feedback(notification, confirmed):
    data = _load(FEEDBACK_FILE)

    message_id = None
    if notification and isinstance(notification, dict):
        message_id = notification.get("result", {}).get("message_id")

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "confirmed": confirmed,
        "notification": {
            "platform": "telegram",
            "message_id": message_id
        } if message_id else None
    }

    data.append(entry)
    _save(FEEDBACK_FILE, data)