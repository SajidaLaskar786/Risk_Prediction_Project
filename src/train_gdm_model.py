import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier


# ================================
# LOAD DATA
# ================================
df = pd.read_excel("data/gdm_dataset_final.xlsx")

print("✅ Data Loaded")
print(df.head())


# ================================
# ENCODING
# ================================
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

print("✅ Categorical Encoding Done")


# ================================
# TARGET ENCODING
# ================================
target_encoder = LabelEncoder()
df["GDM_Risk"] = target_encoder.fit_transform(df["GDM_Risk"])

print("✅ Target Encoding Done")


# ================================
# FEATURES & TARGET
# ================================
X = df.drop(columns=["GDM_Risk"])
y = df["GDM_Risk"]


# ================================
# TRAIN TEST SPLIT
# ================================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)


# ================================
# SCALING
# ================================
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("✅ Scaling Done")


# ================================
# MODELS
# ================================
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(),
    "Random Forest": RandomForestClassifier(),
    "Gradient Boosting": GradientBoostingClassifier(),
    "KNN": KNeighborsClassifier()
}


# ================================
# TRAIN & EVALUATE
# ================================
best_model = None
best_score = 0

for name, model in models.items():
    print(f"\n🔹 Training {name}...")

    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average="weighted")
    rec = recall_score(y_test, y_pred, average="weighted")
    f1 = f1_score(y_test, y_pred, average="weighted")

    print(f"Accuracy : {acc:.3f}")
    print(f"Precision: {prec:.3f}")
    print(f"Recall   : {rec:.3f}")
    print(f"F1 Score : {f1:.3f}")

    if f1 > best_score:
        best_score = f1
        best_model = model


# ================================
# SAVE FILES
# ================================
joblib.dump(best_model, "Models/trained_models/gdm_model.pkl")
joblib.dump(scaler, "Models/trained_models/gdm_scaler.pkl")
joblib.dump(encoders, "Models/trained_models/gdm_encoders.pkl")
joblib.dump(target_encoder, "Models/trained_models/gdm_target_encoder.pkl")

print("\n✅ Best Model Saved!")
print(f"🏆 Best F1 Score: {best_score:.3f}")