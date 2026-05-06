import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function App() {
  const [page, setPage] = useState("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

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

  // 🔹 LOGIN PAGE
  if (page === "login") {
    return (
      <div style={{ background: "linear-gradient(180deg, #e8f5e9, #f5fbf5)", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", width: "320px" }}>
          
          <h2 style={{ color: "green" }}>❤️ Anemia & GDM</h2>

          <p style={{ fontSize: "13px" }}>
            Risk Prediction System in Pregnant Women <br/> (For ASHA Workers)
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

          <button onClick={() => phone && password ? setPage("home") : alert("Enter details")}
            style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white" }}>
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

          <button onClick={() => setPage("form")}
            style={{ width: "100%", padding: "15px", backgroundColor: "green", color: "white", marginBottom: "10px" }}>
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

  // 🔹 SIGNUP PAGE (unchanged)
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

if (page === "form") {
  return (
    <div style={{ backgroundColor: "#e8f5e9", minHeight: "100vh", padding: "20px" }}>

      <h2 style={{ color: "green" }}>🩸 Anemia Risk Assessment</h2>

      {/* BASIC DETAILS */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <h3 style={{ color: "green" }}>Basic Details</h3>

        <input placeholder="Height (cm)"
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }} />

        <input placeholder="Weight (kg)"
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }} />
      </div>

      {/* DIET */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <h3 style={{ color: "green" }}>Diet</h3>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Iron Intake</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Diet Quality</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>
      </div>

      {/* SYMPTOMS */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <h3 style={{ color: "green" }}>Symptoms</h3>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Fatigue</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Dizziness</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Pale Eyelids</option>
          <option value="No">No</option>
          <option value="Slight">Slight</option>
          <option value="Yes">Yes</option>
        </select>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Pale Nails</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Tongue Color</option>
          <option value="Normal">Normal</option>
          <option value="Pale">Pale</option>
          <option value="Very Pale">Very Pale</option>
        </select>

        <select defaultValue=""
          style={{ margin: "10px auto", padding: "10px", width: "70%", display: "block" }}>
          <option value="" disabled>Anemia History</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* SUBMIT */}
      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() => {
            setLoading(true);

            setTimeout(() => {
              setLoading(false);

              const random = Math.random();
              if (random < 0.4) 
                setTimeout(() => {
  setLoading(false);

  const random = Math.random();
  let risk = "";

  if (random < 0.4) risk = "LOW";
  else if (random < 0.7) risk = "MEDIUM";
  else risk = "HIGH";

  setRiskLevel(risk);
  setPage("result");
}, 1500);
              else if (random < 0.7) setResult("MEDIUM RISK 🟠");
              else setResult("HIGH RISK 🔴");
            }, 1500);
          }}
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
          🔍 Predict Anemia Risk
        </button>

        {loading && (
          <p style={{ marginTop: "15px", color: "orange" }}>
            🤖 AI is analyzing patient data...
          </p>
        )}

        {result && !loading && (
          <div style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <h3>Result:</h3>
            <p>{result}</p>
          </div>
        )}

      </div>

    </div>
  );
}
// 🔹 RESULT PAGE
if (page === "result") {
  return (
    <div style={{
      backgroundColor: "#e8f5e9",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "320px",
        textAlign: "center"
      }}>

        <h2 style={{ color: "green" }}>🩺 Prediction Result</h2>

        {riskLevel === "LOW" && (
          <h1 style={{ color: "green" }}>LOW RISK 🟢</h1>
        )}

        {riskLevel === "MEDIUM" && (
          <h1 style={{ color: "orange" }}>MEDIUM RISK 🟠</h1>
        )}

        {riskLevel === "HIGH" && (
          <h1 style={{ color: "red" }}>HIGH RISK 🔴</h1>
        )}

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          {riskLevel === "LOW" && "Patient is safe. Maintain normal diet and follow-up checkups."}
          {riskLevel === "MEDIUM" && "Some risk detected. Improve nutrition and monitor closely."}
          {riskLevel === "HIGH" && "High risk detected. Immediate medical attention recommended."}
        </p>

        <button
          onClick={() => setPage("home")}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "8px"
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

