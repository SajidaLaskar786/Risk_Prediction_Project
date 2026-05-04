import pandas as pd
import random

data = []

# =========================
# HELPERS
# =========================
def random_yes(prob):
    return "Yes" if random.random() < prob else "No"

def physical_activity(level):
    if level == "low":
        return random.choice(["Active", "Moderate"])
    elif level == "medium":
        return random.choice(["Moderate", "Rarely"])
    else:
        return random.choice(["Rarely", "Never"])

# =========================
# SCORE FUNCTION (same logic)
# =========================
def calculate_score(row):
    score = 0

    if row["Previous_GDM"] == "Yes": score += 3
    if row["Family_Diabetes"] == "Yes": score += 2
    if row["Waist_cm"] > 90: score += 2
    if row["BP_Systolic"] > 130 or row["BP_Diastolic"] > 85: score += 2
    if row["Age"] > 30: score += 1  # 🔻 reduced impact

    if row["PCOD"] == "Yes": score += 1
    if row["Gravida"] >= 3: score += 1
    if row["Physical_Activity"] in ["Rarely", "Never"]: score += 1

    if row["Excess_Thirst"] == "Yes": score += 1
    if row["Frequent_Urination"] == "Yes": score += 1
    if row["Dark_Skin_Patches"] == "Yes": score += 2
    if row["Excess_Hunger"] == "Yes": score += 0.5

    return score

def assign_label(score):
    if score <= 3:
        return "Low"
    elif score <= 7:
        return "Medium"
    else:
        return "High"

def add_noise(label):
    if random.random() < 0.12:
        if label == "Low":
            return random.choice(["Low", "Medium"])
        elif label == "Medium":
            return random.choice(["Low", "Medium", "High"])
        else:
            return random.choice(["Medium", "High"])
    return label

# =========================
# DATA GENERATION
# =========================
def generate_row(target):

    # 🔹 AGE OVERLAP (fix dominance)
    if target == "Low":
        age = random.randint(18, 32)
    elif target == "Medium":
        age = random.randint(22, 35)
    else:
        age = random.randint(25, 40)

    # 🔹 CORE FEATURES
    if target == "Low":
        row = {
            "Age": age,
            "Gravida": random.randint(1, 2),
            "Gestational_Age_weeks": random.randint(10, 28),
            "Previous_GDM": "No",
            "Family_Diabetes": random.choice(["No", "Not Sure"]),
            "PCOD": random.choice(["No", "Not Sure"]),
            "Waist_cm": random.randint(65, 82),
            "BP_Systolic": random.randint(100, 120),
            "BP_Diastolic": random.randint(60, 80),
            "Physical_Activity": physical_activity("low"),
            "Excess_Thirst": random_yes(0.2),
            "Frequent_Urination": random_yes(0.2),
            "Excess_Hunger": random_yes(0.3),
            "Dark_Skin_Patches": random_yes(0.1)
        }

    elif target == "Medium":
        row = {
            "Age": age,
            "Gravida": random.randint(1, 3),
            "Gestational_Age_weeks": random.randint(12, 32),
            "Previous_GDM": random_yes(0.3),
            "Family_Diabetes": random_yes(0.5),
            "PCOD": random.choice(["Yes", "No", "Not Sure"]),
            "Waist_cm": random.randint(75, 95),
            "BP_Systolic": random.randint(110, 135),
            "BP_Diastolic": random.randint(70, 90),
            "Physical_Activity": physical_activity("medium"),
            "Excess_Thirst": random_yes(0.5),
            "Frequent_Urination": random_yes(0.5),
            "Excess_Hunger": random_yes(0.5),
            "Dark_Skin_Patches": random_yes(0.4)
        }

    else:  # HIGH
        row = {
            "Age": age,
            "Gravida": random.randint(2, 5),
            "Gestational_Age_weeks": random.randint(14, 36),
            "Previous_GDM": random_yes(0.75),  # 🔥 strong
            "Family_Diabetes": "Yes",
            "PCOD": random_yes(0.6),
            "Waist_cm": random.randint(85, 110),
            "BP_Systolic": random.randint(130, 160),
            "BP_Diastolic": random.randint(85, 105),
            "Physical_Activity": physical_activity("high"),
            "Excess_Thirst": random_yes(0.75),
            "Frequent_Urination": random_yes(0.75),
            "Excess_Hunger": random_yes(0.6),
            "Dark_Skin_Patches": random_yes(0.7)
        }

    # =========================
    # SCORE + LABEL
    # =========================
    score = calculate_score(row)
    label = assign_label(score)
    label = add_noise(label)

    row["GDM_Risk"] = label

    return row


# =========================
# BUILD DATASET
# =========================
for _ in range(100):
    data.append(generate_row("Low"))

for _ in range(100):
    data.append(generate_row("Medium"))

for _ in range(100):
    data.append(generate_row("High"))

df = pd.DataFrame(data)

# shuffle
df = df.sample(frac=1).reset_index(drop=True)

# save
df.to_excel("data/gdm_dataset_final.xlsx", index=False)

print("✅ FINAL GDM dataset generated!")