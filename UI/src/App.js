import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
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
    Height_cm: "",
    Weight_kg: "",
    Iron_Intake: "",
    Diet_Quality: "",
    Fatigue: "",
    Dizziness: "",
    Pale_Eyelids: "",
    Pale_Nails: "",
    Tongue_Color: "",
    Anemia_History: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/mht", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,

          // convert numbers
          age: Number(formData.age),
          gravida: Number(formData.gravida),
          gest_weeks: Number(formData.gest_weeks),
          waist: Number(formData.waist),
          bp_sys: Number(formData.bp_sys),
          bp_dia: Number(formData.bp_dia),
          Height_cm: Number(formData.Height_cm),
          Weight_kg: Number(formData.Weight_kg)
        })
      });

      const data = await response.json();
      setResult(data);
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("API Error");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e9" }}>
      <h2 style={{ color: "green" }}>Maternal Health Predictor</h2>

      <form onSubmit={handleSubmit}>

        {/* ---------------- GDM ---------------- */}
        <h3>GDM Details</h3>

        <input name="age" placeholder="Age" onChange={handleChange} />
        <input name="gravida" placeholder="Gravida" onChange={handleChange} />
        <input name="gest_weeks" placeholder="Gest Weeks" onChange={handleChange} />

        <label>
          Previous GDM
          <input type="checkbox" name="prev_gdm" onChange={handleChange} />
        </label>

        <label>
          Family Diabetes
          <input type="checkbox" name="family" onChange={handleChange} />
        </label>

        <input name="waist" placeholder="Waist (cm)" onChange={handleChange} />
        <input name="bp_sys" placeholder="BP Systolic" onChange={handleChange} />
        <input name="bp_dia" placeholder="BP Diastolic" onChange={handleChange} />

        <input name="activity" placeholder="Activity (Active/Moderate/Never)" onChange={handleChange} />

        <label>
          Excess Thirst
          <input type="checkbox" name="thirst" onChange={handleChange} />
        </label>

        <label>
          Frequent Urination
          <input type="checkbox" name="urination" onChange={handleChange} />
        </label>

        <label>
          Excess Hunger
          <input type="checkbox" name="hunger" onChange={handleChange} />
        </label>

        <label>
          Dark Skin Patches
          <input type="checkbox" name="dark" onChange={handleChange} />
        </label>

        {/* ---------------- ANEMIA ---------------- */}
        <h3>Anemia Details</h3>

        <input name="Height_cm" placeholder="Height (cm)" onChange={handleChange} />
        <input name="Weight_kg" placeholder="Weight (kg)" onChange={handleChange} />

        <select name="Iron_Intake" onChange={handleChange}>
          <option>Iron Intake</option>
          <option>Good</option>
          <option>Average</option>
          <option>Poor</option>
        </select>

        <select name="Diet_Quality" onChange={handleChange}>
          <option>Diet Quality</option>
          <option>Good</option>
          <option>Average</option>
          <option>Poor</option>
        </select>

        <select name="Fatigue" onChange={handleChange}>
          <option>Fatigue</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="Dizziness" onChange={handleChange}>
          <option>Dizziness</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="Pale_Eyelids" onChange={handleChange}>
          <option>Pale Eyelids</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="Pale_Nails" onChange={handleChange}>
          <option>Pale Nails</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="Tongue_Color" onChange={handleChange}>
          <option>Tongue Color</option>
          <option>Normal</option>
          <option>Pale</option>
          <option>Very Pale</option>
        </select>

        <select name="Anemia_History" onChange={handleChange}>
          <option>Anemia History</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <br /><br />

        <button type="submit" style={{ padding: "10px", background: "green", color: "white" }}>
          Predict
        </button>

      </form>

      {/* RESULT */}
      {loading && <p>Loading...</p>}

      {result && (
        <div style={{ marginTop: "20px", background: "white", padding: "10px" }}>
          <h3>Result:</h3>
          <p>GDM Risk: {result.gdm.risk}</p>
          <p>Anemia Risk: {result.anemia.risk}</p>
        </div>
      )}
    </div>
  );
}

export default App;