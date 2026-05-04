import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

print("🔹 Loading processed data...")
df = pd.read_csv("data/gdm_processed.csv")

print("✅ Data Loaded")

# =========================
# CORRELATION
# =========================
print("\n🔹 Generating correlation matrix...")

corr = df.corr()

plt.figure(figsize=(12,8))
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("GDM Feature Correlation")
plt.show()

# =========================
# TARGET CORRELATION
# =========================
print("\n🔹 Correlation with GDM_Risk:\n")
print(corr["GDM_Risk"].sort_values(ascending=False))