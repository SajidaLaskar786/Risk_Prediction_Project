import joblib
import pandas as pd
import os

# ================================
# LOAD MODELS (one-time)
# ================================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
print(f"*********Loading models from: {BASE_DIR} *****")

model = joblib.load(os.path.join(BASE_DIR, "models/trained_models/anemia_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "models/trained_models/anemia_scaler.pkl"))
encoders = joblib.load(os.path.join(BASE_DIR, "models/trained_models/anemia_encoders.pkl"))
label_encoder = joblib.load(os.path.join(BASE_DIR, "models/trained_models/anemia_target_encoder.pkl"))


# ================================
# PREDICT FUNCTION
# ================================
def predict_anemia(data: dict):
    try:
        # ================================
        # CLEAN INPUT (case insensitive)
        # ================================
        cleaned = {
            "Height_cm": float(data["Height_cm"]),
            "Weight_kg": float(data["Weight_kg"]),
            "Iron_Intake": data["Iron_Intake"].lower().capitalize(),
            "Diet_Quality": data["Diet_Quality"].lower().capitalize(),
            "Fatigue": data["Fatigue"].lower().capitalize(),
            "Dizziness": data["Dizziness"].lower().capitalize(),
            "Pale_Eyelids": data["Pale_Eyelids"].lower().capitalize(),
            "Pale_Nails": data["Pale_Nails"].lower().capitalize(),
            "Tongue_Color": data["Tongue_Color"].lower().title(),
            "Anemia_History": data["Anemia_History"].lower().capitalize()
        }

        # ================================
        # BMI CALCULATION
        # ================================
        height_m = cleaned["Height_cm"] / 100
        bmi = cleaned["Weight_kg"] / (height_m ** 2)
        cleaned["BMI"] = bmi

        # ================================
        # DATAFRAME
        # ================================
        df = pd.DataFrame([cleaned])

        # ================================
        # VALIDATION + ENCODING
        # ================================
        for col in encoders:
            if df[col].iloc[0] not in encoders[col].classes_:
                return {
                    "error": f"Invalid value for {col}",
                    "allowed": list(encoders[col].classes_)
                }

        for col in encoders:
            df[col] = encoders[col].transform(df[col])

        # ================================
        # FEATURE ORDER (VERY IMPORTANT)
        # ================================
       # FORCE match training
        feature_order = list(scaler.feature_names_in_)
        df = df[feature_order]

        # ================================
        # SCALING
        # ================================
        df_scaled = scaler.transform(df)

        # ================================
        # ML PREDICTION
        # ================================
        prediction = model.predict(df_scaled)
        result = label_encoder.inverse_transform(prediction)[0]

        # ================================
        # 🔥 MINIMAL HYBRID LOGIC
        # ================================
        if (
            cleaned["Pale_Eyelids"] == "Yes" and
            cleaned["Tongue_Color"] == "Very Pale"
        ):
            result = "High"

        # ================================
        # RETURN
        # ================================
        return {
            "risk": result
        }

    except KeyError as e:
        return {"error": f"Missing field: {str(e)}"}

    except Exception as e:
        return {"error": str(e)}