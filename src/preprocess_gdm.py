import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder, StandardScaler

print("🔹 Loading dataset...")
df = pd.read_excel("data/gdm_dataset_final.xlsx")

print("✅ Data Loaded")
print(df.head())

# =========================
# HANDLE MISSING VALUES
# =========================
print("\n🔹 Checking missing values...")
print(df.isnull().sum())

df = df.dropna()

# =========================
# ENCODING
# =========================
print("\n🔹 Encoding categorical features...")

encoders = {}

categorical_cols = [
    "Previous_GDM",
    "Family_Diabetes",
    "PCOD",
    "Physical_Activity",
    "Excess_Thirst",
    "Frequent_Urination",
    "Excess_Hunger",
    "Dark_Skin_Patches"
]

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

print("✅ Encoding done")

# =========================
# TARGET ENCODING
# =========================
target_encoder = LabelEncoder()
df["GDM_Risk"] = target_encoder.fit_transform(df["GDM_Risk"])

print("✅ Target encoded")

# =========================
# SPLIT FEATURES & TARGET
# =========================
X = df.drop("GDM_Risk", axis=1)
y = df["GDM_Risk"]

# =========================
# SCALING
# =========================
print("\n🔹 Scaling features...")
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print("✅ Scaling done")

# =========================
# SAVE FILES
# =========================
joblib.dump(scaler, "Models/trained_models/gdm_scaler.pkl")
joblib.dump(encoders, "Models/trained_models/gdm_encoders.pkl")
joblib.dump(target_encoder, "Models/trained_models/gdm_target_encoder.pkl")

# Save processed data
processed_df = pd.DataFrame(X_scaled, columns=X.columns)
processed_df["GDM_Risk"] = y.values

processed_df.to_csv("data/gdm_processed.csv", index=False)

print("\n✅ Preprocessing complete!")