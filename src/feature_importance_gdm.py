import joblib
import pandas as pd
import matplotlib.pyplot as plt

# ================================
# LOAD MODEL
# ================================
model = joblib.load("Models/trained_models/gdm_model.pkl")

# ================================
# LOAD DATA (for column names)
# ================================
df = pd.read_excel("data/gdm_dataset_final.xlsx")

X = df.drop(columns=["GDM_Risk"])

# ================================
# FEATURE IMPORTANCE
# ================================
importance = model.feature_importances_

feature_importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": importance
}).sort_values(by="Importance", ascending=False)

print("\n🔥 Feature Importance:\n")
print(feature_importance)

# ================================
# PLOT
# ================================
plt.figure(figsize=(10,6))
plt.barh(feature_importance["Feature"], feature_importance["Importance"])
plt.gca().invert_yaxis()
plt.title("Feature Importance (GDM Model)")
plt.show()