import joblib
import numpy as np
import os

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neighbors import KNeighborsClassifier

# =========================
# LOAD DATA
# =========================
X = joblib.load("Models/trained_models/anemia_X.pkl")
y = joblib.load("Models/trained_models/anemia_y.pkl")

print("✅ Processed Data Loaded")

# =========================
# TRAIN TEST SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# MODELS
# =========================
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(),
    "Random Forest": RandomForestClassifier(),
    "Gradient Boosting": GradientBoostingClassifier(),
    "KNN": KNeighborsClassifier()
}

best_model = None
best_score = 0

# =========================
# TRAINING LOOP
# =========================
for name, model in models.items():
    print(f"\n🔹 Training {name}...")

    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average="weighted", zero_division=0)
    rec = recall_score(y_test, y_pred, average="weighted")
    f1 = f1_score(y_test, y_pred, average="weighted")

    print(f"Accuracy : {acc:.3f}")
    print(f"Precision: {prec:.3f}")
    print(f"Recall   : {rec:.3f}")
    print(f"F1 Score : {f1:.3f}")

    # Save best model based on F1 score
    if f1 > best_score:
        best_score = f1
        best_model = model

# =========================
# SAVE BEST MODEL
# =========================
os.makedirs("Models/trained_models", exist_ok=True)

joblib.dump(best_model, "Models/trained_models/anemia_model.pkl")

print("\n✅ Best Model Saved!")
print(f"🏆 Best F1 Score: {best_score:.3f}")