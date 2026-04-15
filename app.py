from core.decision_engine import compute_threat

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from core.engine import analyze
from core.notifier import send_alert
from core.logger import log_alert, log_biodiversity, get_alerts, get_biodiversity, save_feedback
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "audio_samples/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/analyze", methods=["POST"])
def analyze_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files["audio"]
    location = request.form.get("location", "Forest Zone A")
    coords = request.form.get("coords", "11.1271,78.6569")

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        result = analyze(filepath, location, coords)
    except Exception as e:
        return jsonify({"error": "analysis_failed", "details": str(e)}), 500

    notification_response = None

    # ALERT LOGIC
    if result.get("decision") == "THREAT":
        try:
            notification_response = send_alert(
                result["alert_type"],
                result["severity"],
                location,
                coords,
                result["confidence"],
                filename
            )
        except Exception as e:
            print("[NOTIFICATION ERROR]", e)
            notification_response = None

    # LOG ALERT (always safe now)
    try:
        log_alert(result, notification_response)
    except Exception as e:
        print("[LOGGER ERROR]", e)

    # BIODIVERSITY LOGGING
    if result.get("decision") == "BIODIVERSITY":
        try:
            log_biodiversity(result)
        except Exception as e:
            print("[BIODIVERSITY LOG ERROR]", e)

    return jsonify(result)


@app.route("/alerts", methods=["GET"])
def alerts():
    return jsonify(get_alerts())


@app.route("/biodiversity", methods=["GET"])
def biodiversity():
    return jsonify(get_biodiversity())


@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.json
    save_feedback(data.get("notification_response"), data.get("confirmed"))
    return jsonify({"status": "saved"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)