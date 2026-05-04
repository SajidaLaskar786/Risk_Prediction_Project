import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier

# =========================
# LOAD DATA
# =========================
df = pd.read_excel("data/anemia_dataset.xlsx")

# =========================
# BMI CALCULATION
# =========================
df["Height_m"] = df["Height_cm"] / 100
df["BMI"] = df["Weight_kg"] / (df["Height_m"] ** 2)

# =========================
# ENCODE CATEGORICAL
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

for col in categorical_cols:
    df[col] = df[col].astype("category").cat.codes

# Encode target
df["Anemia_Risk"] = df["Anemia_Risk"].astype("category").cat.codes

# =========================
# CORRELATION MATRIX
# =========================
plt.figure(figsize=(12, 8))
sns.heatmap(df.corr(), annot=False, cmap="coolwarm")
plt.title("Feature Correlation Heatmap")
plt.show()

# =========================
# FEATURE IMPORTANCE
# =========================
X = df.drop("Anemia_Risk", axis=1)
y = df["Anemia_Risk"]

model = RandomForestClassifier()
model.fit(X, y)

importance = pd.Series(model.feature_importances_, index=X.columns)
importance = importance.sort_values(ascending=False)

print("\n🔍 Feature Importance:\n")
print(importance)

# Plot
importance.plot(kind='bar', figsize=(10,5))
plt.title("Feature Importance")
plt.show()