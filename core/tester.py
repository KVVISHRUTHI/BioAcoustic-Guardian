import os
import sys
import json
from core.engine import analyze

TEST_FILES = {
    "audio_samples/chainsaw_test.wav":  ("THREAT",       "ILLEGAL_LOGGING"),
    "audio_samples/gunshot_test.wav":   ("THREAT",       "POACHING"),
    "audio_samples/bird_test.wav":      ("BIODIVERSITY", "SPECIES_DETECTED"),
}

PASS = "\033[92m PASS \033[0m"
FAIL = "\033[91m FAIL \033[0m"
WARN = "\033[93m WARN \033[0m"

def run_tests():
    print("\n=== BioAcoustic Guardian — Engine Test Suite ===\n")
    results = []

    for path, (expected_decision, expected_alert) in TEST_FILES.items():
        if not os.path.exists(path):
            print(f"[SKIP] {path} — file not found")
            continue

        print(f"Testing: {path}")
        result = analyze(path)

        decision   = result.get("decision")
        alert_type = result.get("alert_type")
        confidence = result.get("confidence", 0)
        top_label  = result.get("top_label", "")

        decision_ok = decision == expected_decision
        alert_ok    = alert_type == expected_alert or decision == "LOW_CONFIDENCE"

        status = PASS if (decision_ok and alert_ok) else (WARN if decision == "LOW_CONFIDENCE" else FAIL)

        print(f"  Status     : {status}")
        print(f"  Top label  : {top_label}")
        print(f"  Confidence : {confidence:.3f}")
        print(f"  Decision   : {decision}  (expected: {expected_decision})")
        print(f"  Alert type : {alert_type}  (expected: {expected_alert})")
        print()

        results.append({
            "file": path,
            "passed": decision_ok and alert_ok,
            "decision": decision,
            "confidence": confidence
        })

    passed = sum(1 for r in results if r["passed"])
    total  = len(results)
    print(f"=== Results: {passed}/{total} passed ===\n")

    if passed < total:
        print("Troubleshooting tips:")
        for r in results:
            if not r["passed"]:
                if r["decision"] == "LOW_CONFIDENCE":
                    print(f"  → {r['file']}: confidence {r['confidence']:.2f} is below threshold.")
                    print(f"    Temporarily set CONFIDENCE_THRESHOLD=0.50 in .env and re-run.")
                else:
                    print(f"  → {r['file']}: got decision '{r['decision']}' — check threat_map.py labels.")

if __name__ == "__main__":
    run_tests()