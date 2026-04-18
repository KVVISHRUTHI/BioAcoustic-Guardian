import requests
import os

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def send_alert(alert_type, severity, location, coords, confidence, filename):
    try:
        message = (
            f"BIOACOUSTIC ALERT\n"
            f"Type: {alert_type}\n"
            f"Severity: {severity}\n"
            f"Location: {location}\n"
            f"Confidence: {int(confidence * 100)}%\n"
            f"GPS: https://maps.google.com/?q={coords}"
        )

        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

        response = requests.post(url, json={
            "chat_id": CHAT_ID,
            "text": message
        })

        return response.json()

    except Exception as e:
        print("[TELEGRAM ERROR]", e)
        return {
            "ok": False,
            "error": str(e)
        }