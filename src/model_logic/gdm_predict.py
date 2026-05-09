import joblib
import pandas as pd
from difflib import get_close_matches

# ================================
# LOAD MODELS (only once)
# ================================
model = joblib.load("models/trained_models/gdm_model.pkl")
scaler = joblib.load("models/trained_models/gdm_scaler.pkl")
encoders = joblib.load("models/trained_models/gdm_encoders.pkl")
label_encoder = joblib.load("models/trained_models/gdm_target_encoder.pkl")

# ================================
# SMART INPUT (TYPO HANDLING)
# ================================
def smart_input(value, valid_options):
    value = str(value).strip().lower()
    valid_lower = [v.lower() for v in valid_options]

    # exact match
    if value in valid_lower:
        return valid_options[valid_lower.index(value)]

    # fuzzy match
    match = get_close_matches(value, valid_lower, n=1, cutoff=0.6)

    if match:
        return valid_options[valid_lower.index(match[0])]

    raise ValueError(f"Invalid input '{value}'. Allowed: {valid_options}")

# ================================
# MAIN FUNCTION
# ================================
def predict_gdm(data: dict):

    try:
        # ================================
        # CLEAN + VALIDATE INPUT
        # ================================
        cleaned = {
            "Age": int(data["Age"]),
            "Gravida": int(data["Gravida"]),
            "Gestational_Age_weeks": int(data["Gestational_Age_weeks"]),

            "Previous_GDM": smart_input(data["Previous_GDM"], ["Yes", "No"]),
            "Family_Diabetes": smart_input(data["Family_Diabetes"], ["Yes", "No", "Not Sure"]),
            "PCOD": smart_input(data["PCOD"], ["Yes", "No", "Not Sure"]),

            "Waist_cm": float(data["Waist_cm"]),
            "BP_Systolic": int(data["BP_Systolic"]),
            "BP_Diastolic": int(data["BP_Diastolic"]),

            "Physical_Activity": smart_input(
                data["Physical_Activity"],
                ["Active", "Moderate", "Rarely", "Never"]
            ),

            "Excess_Thirst": smart_input(data["Excess_Thirst"], ["Yes", "No"]),
            "Frequent_Urination": smart_input(data["Frequent_Urination"], ["Yes", "No"]),
            "Excess_Hunger": smart_input(data["Excess_Hunger"], ["Yes", "No"]),
            "Dark_Skin_Patches": smart_input(data["Dark_Skin_Patches"], ["Yes", "No"])
        }

        # ================================
        # CREATE DATAFRAME
        # ================================
        df = pd.DataFrame([cleaned])

        # ================================
        # ENCODE
        # ================================
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
        if (
        cleaned["Waist_cm"] > 90 and 
        (cleaned["BP_Systolic"] > 140 or cleaned["BP_Diastolic"] > 90)
        ):
         result = "High"

        # ================================
        # RETURN RESULT
        # ================================
        return {
            "risk": result
        }

    except KeyError as e:
        return {"error": f"Missing field: {str(e)}"}

    except ValueError as e:
        return {"error": str(e)}

    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}