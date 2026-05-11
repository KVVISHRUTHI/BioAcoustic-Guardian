import tensorflow_hub as hub
import tensorflow as tf
import soundfile as sf
import numpy as np
import csv
import os

MODEL_URL = 'https://tfhub.dev/google/yamnet/1'
CLASS_MAP = os.path.join(os.path.dirname(__file__),
                         '..', 'models', 'yamnet_class_map.csv')

_model = None

def load_model():
    global _model
    if _model is None:
        print("[INFO] Loading YAMNet model...")
        _model = hub.load(MODEL_URL)
    return _model

def load_class_names():
    names = {}
    with open(CLASS_MAP, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            names[int(row['index'])] = row['display_name']
    return names

def classify_audio(file_path):
    model = load_model()
    class_names = load_class_names()

    audio, sr = sf.read(file_path, dtype='float32')
    if audio.ndim > 1:
        audio = audio.mean(axis=1)

    scores, _, _ = model(audio)
    mean_scores = tf.reduce_mean(scores, axis=0).numpy()

    top_indices = np.argsort(mean_scores)[::-1][:10]
    results = []
    for idx in top_indices:
        results.append({
            "class_id": int(idx),
            "label": class_names.get(int(idx), "Unknown"),
            "confidence": float(mean_scores[idx])
        })
    return results

if __name__ == '__main__':
    import sys
    path = sys.argv[1] if len(sys.argv) > 1 else \
           '../audio_samples/chainsaw_test.wav'
    results = classify_audio(path)
    for r in results:
        print(f"{r['confidence']:.3f}  {r['label']}")