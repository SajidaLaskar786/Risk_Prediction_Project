import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function App() {
  const [page, setPage] = useState("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [riskLevel, setRiskLevel] = useState("");
  const [gdmRisk, setGdmRisk] = useState("");

  // BACKEND FORM DATA
 const initialFormData = {
    // GDM
    age: "",
    gravida: "",
    gest_weeks: "",
    prev_gdm: false,
    family: false,
    pcod: false,
    waist: "",
    bp_sys: "",
    bp_dia: "",
    activity: "",
    thirst: false,
    urination: false,
    hunger: false,
    dark: false,

    // ANEMIA
    height_cm: "",
    weight_kg: "",
    iron_intake: "",
    diet_quality: "",
    fatigue: false,
    dizziness: false,
    pale_eyelids: false,
    pale_nails: false,
    tongue: "",
    history: false
  };

  // REPLACE OLD formData useState WITH THIS
  const [formData, setFormData] = useState(initialFormData);

  const COLORS = ["#2e7d32", "#ff9800", "#d32f2f"];

  const anemiaData = [
    { name: "Low", value: 5 },
    { name: "Medium", value: 3 },
    { name: "High", value: 2 }
  ];

  const gdmData = [
    { name: "Low", value: 6 },
    { name: "Medium", value: 2 },
    { name: "High", value: 2 }
  ];

  // HANDLE INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // YES / NO BOOLEAN
  const handleSelectBool = (name, value) => {
    setFormData({
      ...formData,
      [name]: value === "Yes"
    });
  };

  // BACKEND PREDICTION
  const handlePrediction = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_MODEL_SERVICE_URL}/mht`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          ...formData,

          age: Number(formData.age),
          gravida: Number(formData.gravida),
          gest_weeks: Number(formData.gest_weeks),
          waist: Number(formData.waist),
          bp_sys: Number(formData.bp_sys),
          bp_dia: Number(formData.bp_dia),
          height_cm: Number(formData.height_cm),
          weight_kg: Number(formData.weight_kg)
        })
      });

      const data = await response.json();

      console.log(data);

      setRiskLevel(
        data?.anemia?.risk?.trim()?.toUpperCase() || "LOW"
      );

      setGdmRisk(
        data?.gdm?.risk?.trim()?.toUpperCase() || "LOW"
      );

      setLoading(false);

      setPage("result");

    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Backend connection failed");
    }
  };

  // 🔹 LOGIN PAGE
  if (page === "login") {
    return (
      <div style={{ background: "linear-gradient(180deg, #e8f5e9, #f5fbf5)", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", width: "320px" }}>

          <h2 style={{ color: "green" }}>❤️ Anemia & GDM</h2>

          <p style={{ fontSize: "13px" }}>
            Risk Prediction System in Pregnant Women <br /> (For ASHA Workers)
          </p>

          <input
            placeholder="📞 Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "90%" }}
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "90%" }}
          />

          <button
            onClick={() => phone && password ? setPage("home") : alert("Enter details")}
            style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white" }}
          >
            Login
          </button>

          <p>
            New user?
            <span onClick={() => setPage("signup")} style={{ color: "green", cursor: "pointer" }}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    );
  }

  // 🔹 DASHBOARD PAGE
  if (page === "home") {
    return (
      <div style={{ backgroundColor: "#e8f5e9", minHeight: "100vh", padding: "20px" }}>

        <h2 style={{ color: "green" }}>Welcome!!</h2>

        {/* ANEMIA */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3>Pregnant Women Anemia Risk</h3>

          <PieChart width={300} height={250}>
            <Pie data={anemiaData} dataKey="value" outerRadius={80}>
              {anemiaData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <p>🟢 Low | 🟠 Medium | 🔴 High</p>
        </div>

        {/* GDM */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3>Pregnant Women GDM Risk</h3>

          <PieChart width={300} height={250}>
            <Pie data={gdmData} dataKey="value" outerRadius={80}>
              {gdmData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <p>🟢 Low | 🟠 Medium | 🔴 High</p>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ marginTop: "30px" }}>

          <button
            onClick={() => setPage("gdmForm")}
            style={{ width: "100%", padding: "15px", backgroundColor: "green", color: "white", marginBottom: "10px" }}
          >
            ➕ Enter New Patient Record
          </button>

          <button style={{ width: "100%", padding: "15px", backgroundColor: "#a5d6a7", marginBottom: "10px" }}>
            🔁 Enter Repeat Patient Record
          </button>

          <button style={{ width: "100%", padding: "15px", backgroundColor: "#c8e6c9" }}>
            📋 View Previous Records
          </button>

        </div>

      </div>
    );
  }

  // 🔹 SIGNUP PAGE
  if (page === "signup") {
    return (
      <div style={{ backgroundColor: "#e8f5e9", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", width: "320px" }}>
          <h2 style={{ color: "green" }}>Sign Up</h2>

          <input placeholder="Phone" style={{ margin: "10px", padding: "10px", width: "90%" }} />
          <input placeholder="Password" style={{ margin: "10px", padding: "10px", width: "90%" }} />

          <button style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white" }}>
            Register
          </button>

          <p>
            Already have an account?
            <span onClick={() => setPage("login")} style={{ color: "green", cursor: "pointer" }}>
              Login
            </span>
          </p>
        </div>
      </div>
    );
  }

  // 🔹 GDM FORM PAGE
  if (page === "gdmForm") {
    return (
      <div style={{ backgroundColor: "#e8f5e9", minHeight: "100vh", padding: "20px" }}>

        <h2 style={{ color: "green" }}>🩺 Gestational Diabetes Assessment</h2>

        {/* BASIC DETAILS */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3>Basic Details</h3>

          <input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />

          <input
            name="gravida"
            placeholder="Gravida (Pregnancies)"
            value={formData.gravida}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />

          <input
            name="gest_weeks"
            placeholder="Gestational Age (weeks)"
            value={formData.gest_weeks}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />
        </div>

        {/* HISTORY */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3>Medical History</h3>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("prev_gdm", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Previous GDM</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("family", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Family Diabetes</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not Sure">Not Sure</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("pcod", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>PCOD Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </div>

        {/* BODY */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3>Physical Measures</h3>

          <input
            name="waist"
            placeholder="Waist (cm)"
            value={formData.waist}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />

          <input
            name="bp_sys"
            placeholder="BP Systolic"
            value={formData.bp_sys}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />

          <input
            name="bp_dia"
            placeholder="BP Diastolic"
            value={formData.bp_dia}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />
        </div>

        {/* SYMPTOMS */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3>Symptoms</h3>

          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Physical Activity</option>
            <option value="Active">Active</option>
            <option value="Moderate">Moderate</option>
            <option value="Rarely">Rarely</option>
            <option value="Never">Never</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("thirst", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Excess Thirst</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("urination", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Frequent Urination</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("hunger", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Excess Hunger</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("dark", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Dark Skin Patches</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button
          onClick={() => setPage("form")}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "8px"
          }}
        >
          Next → Anemia Assessment
        </button>

      </div>
    );
  }

  // 🔹 ANEMIA PAGE
  if (page === "form") {
    return (
      <div style={{ backgroundColor: "#e8f5e9", minHeight: "100vh", padding: "20px" }}>

        <h2 style={{ color: "green" }}>🩸 Anemia Risk Assessment</h2>

        {/* BASIC DETAILS */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3 style={{ color: "green" }}>Basic Details</h3>

          <input
            name="height_cm"
            placeholder="Height (cm)"
            value={formData.height_cm}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />

          <input
            name="weight_kg"
            placeholder="Weight (kg)"
            value={formData.weight_kg}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          />
        </div>

        {/* DIET */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3 style={{ color: "green" }}>Diet</h3>

          <select
            name="iron_intake"
            value={formData.iron_intake}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Iron Intake</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>

          <select
            name="diet_quality"
            value={formData.diet_quality}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Diet Quality</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        {/* SYMPTOMS */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <h3 style={{ color: "green" }}>Symptoms</h3>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("fatigue", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Fatigue</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("dizziness", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Dizziness</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("pale_eyelids", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Pale Eyelids</option>
            <option value="No">No</option>
            <option value="Slight">Slight</option>
            <option value="Yes">Yes</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("pale_nails", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Pale Nails</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            name="tongue"
            value={formData.tongue}
            onChange={handleChange}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Tongue Color</option>
            <option value="Normal">Normal</option>
            <option value="Pale">Pale</option>
            <option value="Very Pale">Very Pale</option>
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleSelectBool("history", e.target.value)}
            style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}
          >
            <option value="" disabled>Anemia History</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* SUBMIT */}
        <div style={{ marginTop: "20px" }}>

          <button
            onClick={handlePrediction}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "green",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            🔍 Predict Anemia and Gestational diabetes risk
          </button>

          {loading && (
            <p style={{ marginTop: "15px", color: "orange" }}>
              🤖 AI is analyzing patient data...
            </p>
          )}

        </div>
      </div>
    );
  }

  // 🔹 RESULT PAGE
  if (page === "result") {
    return (
      <div style={{
        background: "linear-gradient(180deg, #e8f5e9, #f1f8f4)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>

        <div style={{ width: "350px" }}>

          <h2 style={{ textAlign: "center", color: "green", marginBottom: "20px" }}>
            🩺 Prediction Result
          </h2>

          {/* 🩸 ANEMIA CARD */}
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ color: "#2e7d32" }}>🩸 Anemia Risk</h3>

            <h2 style={{
  color:
    riskLevel === "LOW"
      ? "green"
      : riskLevel === "MEDIUM" || riskLevel === "MODERATE"
      ? "orange"
      : "red"
}}>
  {riskLevel}{" "}
  {riskLevel === "LOW"
    ? "🟢"
    : riskLevel === "MEDIUM" || riskLevel === "MODERATE"
    ? "🟠"
    : "🔴"}
</h2>

            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              {riskLevel === "LOW" && "Hemoglobin levels appear stable. Maintain a balanced diet rich in iron and continue routine checkups."}
              {riskLevel === "MEDIUM" && "Mild anemia risk detected. Increase iron intake and monitor symptoms regularly."}
              {riskLevel === "HIGH" && "High anemia risk. Immediate medical evaluation and iron supplementation recommended."}
            </p>
          </div>

          {/* 🍬 GDM CARD */}
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ color: "#2e7d32" }}>🍬 GDM Risk</h3>

            <h2 style={{
  color:
    gdmRisk === "LOW"
      ? "green"
      : gdmRisk === "MEDIUM" || gdmRisk === "MODERATE"
      ? "orange"
      : "red"
}}>
  {gdmRisk}{" "}
  {gdmRisk === "LOW"
    ? "🟢"
    : gdmRisk === "MEDIUM" || gdmRisk === "MODERATE"
    ? "🟠"
    : "🔴"}
</h2>

            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              {gdmRisk === "LOW" && "Blood sugar levels appear normal. Maintain healthy lifestyle and regular monitoring."}
              {gdmRisk === "MEDIUM" && "Moderate risk of gestational diabetes. Monitor diet, exercise, and glucose levels closely."}
              {gdmRisk === "HIGH" && "High risk of gestational diabetes. Immediate medical consultation and glucose testing required."}
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
              setFormData(initialFormData);
              setRiskLevel("");
              setGdmRisk("");
              setPage("home");
            }}
            
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Go to Dashboard
          </button>

        </div>
      </div>
    );
  }
}
export default App;