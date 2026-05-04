import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import os

# Ensure models folder exists
os.makedirs("models", exist_ok=True)

# =========================
# 1. LOAD DATA
# =========================
df = pd.read_excel("data/anemia_dataset.xlsx")

print(" Data Loaded")
print(df.head())

# =========================
# 2. BMI CALCULATION
# =========================
df["Height_m"] = df["Height_cm"] / 100
df["BMI"] = df["Weight_kg"] / (df["Height_m"] ** 2)

print(" BMI Calculated")

# =========================
# 3. ENCODE CATEGORICAL DATA
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
# 4. ENCODE TARGET
# =========================
target_encoder = LabelEncoder()
df["Anemia_Risk"] = target_encoder.fit_transform(df["Anemia_Risk"])

print(" Target Encoded")

# =========================
# 5. SPLIT FEATURES & TARGET
# =========================
X = df.drop("Anemia_Risk", axis=1)
y = df["Anemia_Risk"]

# =========================
# 6. SCALE FEATURES
# =========================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print(" Scaling Done")

# =========================
# 7. SAVE EVERYTHING
# =========================
joblib.dump(scaler, "models/anemia_scaler.pkl")
joblib.dump(encoders, "models/anemia_encoders.pkl")
joblib.dump(target_encoder, "models/anemia_target_encoder.pkl")

pd.DataFrame(X_scaled).to_csv("data/anemia_X.csv", index=False)
pd.Series(y).to_csv("data/anemia_y.csv", index=False)

print(" Preprocessing Completed Successfully!")