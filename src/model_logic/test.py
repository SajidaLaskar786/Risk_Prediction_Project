"""from src.model_logic.gdm_predict import predict_gdm

sample = {
    "Age": 35,
    "Gravida": 3,
    "Gestational_Age_weeks": 30,
    "Previous_GDM": "yes",
    "Family_Diabetes": "yes",
    "PCOD": "yes",
    "Waist_cm": 98,
    "BP_Systolic": 150,
    "BP_Diastolic": 95,
    "Physical_Activity": "never",
    "Excess_Thirst": "yes",
    "Frequent_Urination": "yes",
    "Excess_Hunger": "yes",
    "Dark_Skin_Patches": "yes"
}

print(predict_gdm(sample))"""


from src.model_logic.anemia_predict import predict_anemia

# =========================
# DEFINE TEST DATA
# =========================

test_1 = {
    "Height_cm": 168,
    "Weight_kg": 62,
    "Iron_Intake": "good",
    "Diet_Quality": "good",
    "Fatigue": "no",
    "Dizziness": "no",
    "Pale_Eyelids": "no",
    "Pale_Nails": "no",
    "Tongue_Color": "normal",
    "Anemia_History": "no"
}

test_2 = {
    "Height_cm": 160,
    "Weight_kg": 50,
    "Iron_Intake": "average",
    "Diet_Quality": "average",
    "Fatigue": "yes",
    "Dizziness": "no",
    "Pale_Eyelids": "slight",
    "Pale_Nails": "no",
    "Tongue_Color": "pale",
    "Anemia_History": "no"
}

test_3 = {
    "Height_cm": 150,
    "Weight_kg": 40,
    "Iron_Intake": "poor",
    "Diet_Quality": "poor",
    "Fatigue": "yes",
    "Dizziness": "yes",
    "Pale_Eyelids": "yes",
    "Pale_Nails": "yes",
    "Tongue_Color": "very pale",
    "Anemia_History": "yes"
}

# =========================
# RUN TESTS
# =========================

tests = [test_1, test_2, test_3]

for i, t in enumerate(tests, 1):
    print(f"\n🧪 Test {i}")
    print(predict_anemia(t))