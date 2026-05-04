import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import LabelEncoder, StandardScaler

# =========================
# LOAD DATA
# =========================
df = pd.read_excel("data/anemia_dataset.xlsx")
print(" Data Loaded")

# =========================
# FEATURE ENGINEERING (BMI)
# =========================
df["Height_m"] = df["Height_cm"] / 100
df["BMI"] = df["Weight_kg"] / (df["Height_m"] ** 2)

print(" BMI Calculated")

# =========================
# DROP UNUSED FEATURES
# =========================
df.drop(["Height_cm", "Weight_kg", "Height_m"], axis=1, inplace=True)

# (Optional: based on your analysis)
df.drop(["Age", "Gravida", "Gestational_Age_weeks"], axis=1, inplace=True)

print(" Unnecessary Features Dropped")

# =========================
# ENCODE CATEGORICAL FEATURES
# =========================
categorical_cols = [
    "Iron_Intake",
    "Diet_Quality",
    "Fatigue",
    "Dizziness",
    "Pale_Eyelids",
    "Pale_Nails",
    "Tongue_Color",
    "Anemia_History"
]

encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

print(" Categorical Encoding Done")

# =========================
# ENCODE TARGET
# =========================
target_encoder = LabelEncoder()
df["Anemia_Risk"] = target_encoder.fit_transform(df["Anemia_Risk"])

print(" Target Encoded")

# =========================
# SPLIT FEATURES & TARGET
# =========================
X = df.drop("Anemia_Risk", axis=1)
y = df["Anemia_Risk"]

# =========================
# SCALING
# =========================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print(" Scaling Done")

# =========================
# SAVE EVERYTHING
# =========================
os.makedirs("Models/trained_models", exist_ok=True)

joblib.dump(X_scaled, "Models/trained_models/anemia_X.pkl")
joblib.dump(y, "Models/trained_models/anemia_y.pkl")
joblib.dump(scaler, "Models/trained_models/anemia_scaler.pkl")
joblib.dump(encoders, "Models/trained_models/anemia_encoders.pkl")
joblib.dump(target_encoder, "Models/trained_models/anemia_target_encoder.pkl")

print(" Preprocessing Complete & Saved!")