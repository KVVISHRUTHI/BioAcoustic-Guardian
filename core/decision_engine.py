# core/decision_engine.py

THREAT_WEIGHTS = {
    "chainsaw": 0.95,
    "engine": 0.6,
    "lawn mower": 0.5,
    "motor vehicle": 0.4,
    "motorcycle": 0.35,
    "boat": 0.3,
    "idling": 0.25
}

ENVIRONMENT_MULTIPLIER = {
    "forest": 1.3,
    "rural": 1.1,
    "urban": 0.7
}


def infer_environment(label_list):
    labels = " ".join([d["label"].lower() for d in label_list])

    if any(x in labels for x in ["forest", "jungle", "wild"]):
        return "forest"
    if any(x in labels for x in ["city", "street", "urban"]):
        return "urban"
    return "rural"


def compute_threat(detections, location_text=""):
    score = 0.0

    for d in detections:
        label = d["label"].lower()
        conf = float(d["confidence"])

        for key, weight in THREAT_WEIGHTS.items():
            if key in label:
                score += conf * weight

    env = infer_environment(detections)
    score *= ENVIRONMENT_MULTIPLIER.get(env, 1.0)

    if score >= 0.8:
        decision = "THREAT"
        severity = "HIGH"
    elif score >= 0.45:
        decision = "POSSIBLE_THREAT"
        severity = "MEDIUM"
    elif score > 0.2:
        decision = "LOW_RISK"
        severity = "LOW"
    else:
        decision = "SAFE"
        severity = "NONE"

    return {
        "score": round(score, 3),
        "environment": env,
        "decision": decision,
        "severity": severity
    }