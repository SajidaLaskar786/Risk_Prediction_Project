import pandas as pd
import numpy as np
import random

np.random.seed(42)

data = []

# Helper functions
def random_choice(options, probs):
    return np.random.choice(options, p=probs)

# =========================
# GENERATE DATA
# =========================
for i in range(300):

    # Balanced classes
    if i < 100:
        risk = "Low"
    elif i < 200:
        risk = "Medium"
    else:
        risk = "High"

    # -------------------------
    # BASE FEATURE LOGIC
    # -------------------------

    if risk == "Low":
        iron = random_choice(["Good", "Average", "Poor"], [0.7, 0.2, 0.1])
        diet = random_choice(["Good", "Average", "Poor"], [0.7, 0.2, 0.1])
        fatigue = random_choice(["No", "Yes"], [0.8, 0.2])
        dizziness = random_choice(["No", "Yes"], [0.85, 0.15])
        pale_eyes = random_choice(["No", "Slight", "Yes"], [0.7, 0.2, 0.1])
        pale_nails = random_choice(["No", "Yes"], [0.8, 0.2])
        tongue = random_choice(["Normal", "Pale", "Very Pale"], [0.8, 0.15, 0.05])
        history = random_choice(["No", "Yes"], [0.85, 0.15])

    elif risk == "Medium":
        iron = random_choice(["Good", "Average", "Poor"], [0.3, 0.5, 0.2])
        diet = random_choice(["Good", "Average", "Poor"], [0.3, 0.5, 0.2])
        fatigue = random_choice(["No", "Yes"], [0.5, 0.5])
        dizziness = random_choice(["No", "Yes"], [0.6, 0.4])
        pale_eyes = random_choice(["No", "Slight", "Yes"], [0.3, 0.4, 0.3])
        pale_nails = random_choice(["No", "Yes"], [0.5, 0.5])
        tongue = random_choice(["Normal", "Pale", "Very Pale"], [0.4, 0.4, 0.2])
        history = random_choice(["No", "Yes"], [0.5, 0.5])

    else:  # High
        iron = random_choice(["Good", "Average", "Poor"], [0.1, 0.3, 0.6])
        diet = random_choice(["Good", "Average", "Poor"], [0.1, 0.3, 0.6])
        fatigue = random_choice(["No", "Yes"], [0.2, 0.8])
        dizziness = random_choice(["No", "Yes"], [0.3, 0.7])
        pale_eyes = random_choice(["No", "Slight", "Yes"], [0.1, 0.3, 0.6])
        pale_nails = random_choice(["No", "Yes"], [0.3, 0.7])
        tongue = random_choice(["Normal", "Pale", "Very Pale"], [0.1, 0.4, 0.5])
        history = random_choice(["No", "Yes"], [0.3, 0.7])

    # -------------------------
    # NUMERIC FEATURES (OVERLAP)
    # -------------------------
    height = np.random.randint(145, 170)
    weight = np.random.randint(40, 75)
    age = np.random.randint(18, 35)
    gravida = np.random.randint(1, 4)
    gest_age = np.random.randint(10, 36)

    # -------------------------
    # LABEL NOISE (VERY IMPORTANT)
    # -------------------------
    if np.random.rand() < 0.08:  # 8% noise
        risk = random.choice(["Low", "Medium", "High"])

    # -------------------------
    # APPEND ROW
    # -------------------------
    data.append([
        age, height, weight, gravida, gest_age,
        iron, diet, fatigue, dizziness,
        pale_eyes, pale_nails, tongue, history,
        risk
    ])

# =========================
# CREATE DATAFRAME
# =========================
columns = [
    "Age", "Height_cm", "Weight_kg", "Gravida", "Gestational_Age_weeks",
    "Iron_Intake", "Diet_Quality", "Fatigue", "Dizziness",
    "Pale_Eyelids", "Pale_Nails", "Tongue_Color", "Anemia_History",
    "Anemia_Risk"
]

df = pd.DataFrame(data, columns=columns)

# =========================
# SAVE FILE
# =========================
df.to_excel("data/anemia_dataset.xlsx", index=False)

print(" Realistic dataset generated successfully!")