THREAT_CLASSES = {
    "Chainsaw": {"alert": "ILLEGAL_LOGGING", "severity": "HIGH"},
    "Sawing": {"alert": "ILLEGAL_LOGGING", "severity": "HIGH"},
    "Lawn mower": {"alert": "ILLEGAL_LOGGING", "severity": "HIGH"},
    "Engine": {"alert": "ILLEGAL_LOGGING", "severity": "MEDIUM"},
    "Light engine (high frequency)": {"alert": "ILLEGAL_LOGGING", "severity": "MEDIUM"},

    "Vehicle": {"alert": "ILLEGAL_LOGGING", "severity": "MEDIUM"},
    "Motor vehicle (road)": {"alert": "INTRUDER", "severity": "MEDIUM"},
    "Motorcycle": {"alert": "INTRUDER", "severity": "MEDIUM"},
    "Boat, Water vehicle": {"alert": "INTRUDER", "severity": "LOW"},

    "Gunshot, gunfire": {"alert": "POACHING", "severity": "CRITICAL"},
    "Explosion": {"alert": "POACHING", "severity": "CRITICAL"},
    "Firework": {"alert": "POACHING", "severity": "CRITICAL"},
}

BIODIVERSITY_CLASSES = [
    "Bird",
    "Bird vocalization, bird call, bird song",
    "Chirping, tweeting",
    "Frog",
    "Insect",
    "Cricket",
    "Wild animals",
    "Animal",
    "Owl",
]

IGNORE_CLASSES = [
    "Rain",
    "Thunder",
    "Wind",
    "Water",
    "Stream",
    "Silence",
    "White noise",
    "Rustling leaves",
]