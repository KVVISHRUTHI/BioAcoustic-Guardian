import os
import requests
from dotenv import load_dotenv

load_dotenv()

def send_alert(alert_type, severity, location, coords, confidence, filename):
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")

    maps_link = f"https://maps.google.com/?q={coords}"

    message = (
        f"BIOACOUSTIC ALERT\n"
        f"Type: {alert_type}\n"
        f"Severity: {severity}\n"
        f"Location: {location}\n"
        f"Confidence: {round(confidence * 100)}%\n"
        f"GPS: {maps_link}"
    )

    url = f"https://api.telegram.org/bot{token}/sendMessage"

    r = requests.post(url, json={
        "chat_id": chat_id,
        "text": message
    })

    return r.json()