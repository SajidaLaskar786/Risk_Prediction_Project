#from src.model_logic.gdm_predict import predict_gdm
"""from src.model_logic.anemia_predict import predict_anemia


    gdm
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
}"""

"""
    gdm
    sample = {
    "Age": 30,
    "Gravida": 2,
    "Gestational_Age_weeks": 30,
    "Previous_GDM": "no",
    "Family_Diabetes": "no",
    "PCOD": "no",
    "Waist_cm": 63,
    "BP_Systolic": 120,
    "BP_Diastolic": 69,
    "Physical_Activity": "never",
    "Excess_Thirst": "no",
    "Frequent_Urination": "no",
    "Excess_Hunger": "yes",
    "Dark_Skin_Patches": "yes"
}"""

sample = {
    	"Height_cm":155,
        "Weight_kg":42,
        "Iron_Intake":"poor",
        "Diet_Quality":"poor",
        "Fatigue":"yes",
        "Dizziness":"yes",
        "Pale_Eyelids":"yes",
        "Pale_Nails":"yes",
        "Tongue_Color":"very pale",
        "Anemia_History":"yes"

}


#print(predict_gdm(sample))
#print(predict_anemia(sample_medium))

from src.model_logic.anemia_predict import predict_anemia

#tests = [test_1, test_2, test_3, test_4, test_5, test_6]

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


print(predict_anemia(test_3))