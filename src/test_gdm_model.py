import joblib
import pandas as pd

# ================================
# LOAD FILES
# ================================
model = joblib.load("Models/trained_models/gdm_model.pkl")
scaler = joblib.load("Models/trained_models/gdm_scaler.pkl")
encoders = joblib.load("Models/trained_models/gdm_encoders.pkl")
label_encoder = joblib.load("Models/trained_models/gdm_target_encoder.pkl")

print("\n✅ GDM Model loaded successfully!\n")

from difflib import get_close_matches

def smart_input(user_value, valid_options):
    user_value = user_value.strip().lower()

    # normalize valid options
    valid_lower = [v.lower() for v in valid_options]

    # exact match
    if user_value in valid_lower:
        return valid_options[valid_lower.index(user_value)]

    # fuzzy match
    match = get_close_matches(user_value, valid_lower, n=1, cutoff=0.6)

    if match:
        corrected = valid_options[valid_lower.index(match[0])]
        print(f"⚠️ Interpreted '{user_value}' as '{corrected}'")
        return corrected

    print(f"❌ Invalid input: {user_value}")
    print(f"Allowed: {valid_options}")
    exit()

# ================================
# SAFE INPUT FUNCTION
# ================================
def clean_input(text):
    return text.strip().lower().capitalize()

def clean_title(text):
    return text.strip().lower().title()

# ================================
# USER INPUT
# ================================
age = int(input("Age: "))
gravida = int(input("Number of Pregnancies (Gravida): "))
gest_weeks = int(input("Gestational Age (weeks): "))

prev_gdm = smart_input(input("Previous GDM (yes/no): "), ["Yes", "No"])
family = smart_input(input("Family Diabetes (yes/no/not sure): "), ["Yes", "No", "Not Sure"])
pcod = smart_input(input("PCOD (yes/no/not sure): "), ["Yes", "No", "Not Sure"])

waist = float(input("Waist (cm): "))
bp_sys = int(input("BP Systolic: "))
bp_dia = int(input("BP Diastolic: "))

activity = smart_input(
    input("Physical Activity (active/moderate/rarely/never): "),
    ["Active", "Moderate", "Rarely", "Never"]
)

thirst = smart_input(input("Excess Thirst (yes/no): "), ["Yes", "No"])
urination = smart_input(input("Frequent Urination (yes/no): "), ["Yes", "No"])
hunger = smart_input(input("Excess Hunger (yes/no): "), ["Yes", "No"])
dark = smart_input(input("Dark Skin Patches (yes/no): "), ["Yes", "No"])

# ================================
# CREATE DATAFRAME
# ================================
df = pd.DataFrame([{
    "Age": age,
    "Gravida": gravida,
    "Gestational_Age_weeks": gest_weeks,
    "Previous_GDM": prev_gdm,
    "Family_Diabetes": family,
    "PCOD": pcod,
    "Waist_cm": waist,
    "BP_Systolic": bp_sys,
    "BP_Diastolic": bp_dia,
    "Physical_Activity": activity,
    "Excess_Thirst": thirst,
    "Frequent_Urination": urination,
    "Excess_Hunger": hunger,
    "Dark_Skin_Patches": dark
}])

# ================================
# VALIDATE + ENCODE
# ================================
for col in encoders:
    if df[col].iloc[0] not in encoders[col].classes_:
        print(f"\n❌ Invalid input for {col}: {df[col].iloc[0]}")
        print(f"Allowed values: {list(encoders[col].classes_)}")
        exit()

for col in encoders:
    df[col] = encoders[col].transform(df[col])

# ================================
# SCALE
# ================================
df_scaled = scaler.transform(df)

# ================================
# MODEL PREDICTION
# ================================
prediction = model.predict(df_scaled)
result = label_encoder.inverse_transform(prediction)[0]

# ================================
# 🔥 HYBRID LOGIC
# ================================
score = 0

# 🔴 Strong factors
if prev_gdm == "Yes": score += 3
if family == "Yes": score += 2
if waist > 90: score += 2
if bp_sys > 140 or bp_dia > 90: score += 2
if dark == "Yes": score += 2

# 🟠 Medium
if age > 30: score += 1
if pcod == "Yes": score += 1
if activity in ["Rarely", "Never"]: score += 1
if thirst == "Yes": score += 1
if urination == "Yes": score += 1

# 🟡 Mild
if hunger == "Yes": score += 0.5

# ================================
# RULE CORRECTION
# ================================
# Strong override rule (NEW)
if (waist > 90 and (bp_sys > 140 or bp_dia > 90)):
    result = "High"

elif score >= 6:
    result = "High"

elif score >= 3 and result == "Low":
    result = "Medium"
elif score >= 3 and result == "Low":
    result = "Medium"

# ================================
# FINAL OUTPUT
# ================================
print(f"\n Final GDM Risk: {result}")