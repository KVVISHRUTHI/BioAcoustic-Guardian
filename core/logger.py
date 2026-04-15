import os
import json
from datetime import datetime

ALERTS_FILE = "data/alerts.json"
BIODIVERSITY_FILE = "data/biodiversity.json"


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
    with open(path, "w") as f:
        json.dump(data, f, indent=2)


def log_alert(result, sms_sid=None):
    alerts = _load(ALERTS_FILE)
    alerts.append({
        "timestamp": datetime.utcnow().isoformat(),
        "decision": result.get("decision"),
        "alert_type": result.get("alert_type"),
        "severity": result.get("severity"),
        "sms_sid": sms_sid
    })
    _save(ALERTS_FILE, alerts)


def log_biodiversity(result):
    data = _load(BIODIVERSITY_FILE)
    data.append({
        "timestamp": datetime.utcnow().isoformat(),
        "data": result
    })
    _save(BIODIVERSITY_FILE, data)


def get_alerts():
    return _load(ALERTS_FILE)


def get_biodiversity():
    return _load(BIODIVERSITY_FILE)


def save_feedback(sms_sid, confirmed):
    feedback_file = "data/feedback.json"
    data = _load(feedback_file)

    data.append({
        "notification": {
            "provider": "telegram",
            "payload": sms_sid
    }
        "confirmed": confirmed,
        "timestamp": datetime.utcnow().isoformat()
    })

    _save(feedback_file, data)