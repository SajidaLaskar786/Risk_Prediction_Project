import joblib
import pandas as pd

# ================================
# LOAD FILES
# ================================
model = joblib.load("Models/trained_models/anemia_model.pkl")
scaler = joblib.load("Models/trained_models/anemia_scaler.pkl")
encoders = joblib.load("Models/trained_models/anemia_encoders.pkl")
label_encoder = joblib.load("Models/trained_models/anemia_target_encoder.pkl")

print("\n Model loaded successfully!\n")

# ================================
# USER INPUT
# ================================
height_cm = float(input("Enter Height (cm): "))
weight_kg = float(input("Enter Weight (kg): "))

iron_intake = input("Iron Intake (good/average/poor): ").lower().capitalize()   # good → Good
diet_quality = input("Diet Quality (good/average/poor): ").lower().capitalize()

fatigue = input("Fatigue (yes/no): ").lower().capitalize()
dizziness = input("Dizziness (yes/no): ").lower().capitalize()

pale_eyelids = input("Pale Eyelids (no/slight/yes): ").lower().capitalize()
pale_nails = input("Pale Nails (yes/no): ").lower().capitalize()

tongue = input("Tongue Color (normal/pale/very pale): ").lower().title()             # very pale → Very Pale
history = input("Anemia History (yes/no): ").lower().capitalize()

# ================================
# BMI CALCULATION
# ================================
height_m = height_cm / 100
bmi = weight_kg / (height_m ** 2)

print(f"\n Calculated BMI: {round(bmi,2)}")

# ================================
# CREATE DATAFRAME
# ================================
df = pd.DataFrame([{
    "Iron_Intake": iron_intake,
    "Diet_Quality": diet_quality,
    "Fatigue": fatigue,
    "Dizziness": dizziness,
    "Pale_Eyelids": pale_eyelids,
    "Pale_Nails": pale_nails,
    "Tongue_Color": tongue,
    "Anemia_History": history,
      "BMI": bmi
}])

# ================================
# ENCODING
# ================================
for col in encoders:
    if df[col].iloc[0] not in encoders[col].classes_:
        print(f"❌ Invalid value for {col}: {df[col].iloc[0]}")
        exit()

for col in encoders:
    df[col] = encoders[col].transform(df[col])

# Safety check
if df.isnull().values.any():
    print("\n❌ Invalid input detected. Please check values.")
    print(df)
    exit()

# ================================
# SCALING
# ================================
df_scaled = scaler.transform(df)

# ================================
# MODEL PREDICTION
# ================================
prediction = model.predict(df_scaled)
result = label_encoder.inverse_transform(prediction)[0]

# ================================
# 🔥 HYBRID LOGIC (IMPORTANT)
# ================================
symptom_score = 0

if fatigue == "Yes": symptom_score += 1
if dizziness == "Yes": symptom_score += 1

if pale_eyelids == "Yes":
    symptom_score += 2
elif pale_eyelids == "Slight":
    symptom_score += 1

if pale_nails == "Yes":
    symptom_score += 2

if tongue == "Pale":
    symptom_score += 1
elif tongue == "Very Pale":
    symptom_score += 3

if history == "Yes":
    symptom_score += 1

# Rule correction
if symptom_score >= 6:
    result = "High"
elif symptom_score >= 3 and result == "Low":
    result = "Medium"

# BMI rule
if bmi < 18.5 and result == "Low":
    result = "Medium"

# ================================
# FINAL OUTPUT
# ================================
print(f"\n🩸 Final Anemia Risk: {result}")