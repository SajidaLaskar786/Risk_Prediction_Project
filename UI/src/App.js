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
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSelectBool = (name, value) => {
    setFormData({
      ...formData,
      [name]: value === "Yes"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        height_cm: Number(formData.height_cm),
        weight_kg: Number(formData.weight_kg)
      })
    });

    const data = await response.json();
    console.log(data);
    setResult(data);
  };

  return (
    <div style={{ padding: "20px", background: "#e8f5e9" }}>
      <h2>Maternal Health Predictor</h2>

      <form onSubmit={handleSubmit}>

        {/* ---------------- GDM ---------------- */}
        <h3>GDM</h3>

        <input name="age" placeholder="Age" onChange={handleChange} />
        <input name="gravida" placeholder="Gravida" onChange={handleChange} />
        <input name="gest_weeks" placeholder="Gest Weeks" onChange={handleChange} />

        <label>
          Prev GDM
          <input type="checkbox" name="prev_gdm" onChange={handleChange} />
        </label>

        <label>
          Family Diabetes
          <input type="checkbox" name="family" onChange={handleChange} />
        </label>

        <label>
          PCOD
          <input type="checkbox" name="pcod" onChange={handleChange} />
        </label>

        <input name="waist" placeholder="Waist" onChange={handleChange} />
        <input name="bp_sys" placeholder="BP Sys" onChange={handleChange} />
        <input name="bp_dia" placeholder="BP Dia" onChange={handleChange} />

        <input name="activity" placeholder="Activity" onChange={handleChange} />

        <label>
          Thirst
          <input type="checkbox" name="thirst" onChange={handleChange} />
        </label>

        <label>
          Urination
          <input type="checkbox" name="urination" onChange={handleChange} />
        </label>

        <label>
          Hunger
          <input type="checkbox" name="hunger" onChange={handleChange} />
        </label>

        <label>
          Dark Skin
          <input type="checkbox" name="dark" onChange={handleChange} />
        </label>

        {/* ---------------- ANEMIA ---------------- */}
        <h3>Anemia</h3>

        <input name="height_cm" placeholder="Height" onChange={handleChange} />
        <input name="weight_kg" placeholder="Weight" onChange={handleChange} />

        <select name="iron_intake" onChange={handleChange}>
          <option value="">Iron Intake</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>

        <select name="diet_quality" onChange={handleChange}>
          <option value="">Diet Quality</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>

        <select onChange={(e) => handleSelectBool("fatigue", e.target.value)}>
          <option>Fatigue</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select onChange={(e) => handleSelectBool("dizziness", e.target.value)}>
          <option>Dizziness</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select onChange={(e) => handleSelectBool("pale_eyelids", e.target.value)}>
          <option>Pale Eyelids</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select onChange={(e) => handleSelectBool("pale_nails", e.target.value)}>
          <option>Pale Nails</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="tongue" onChange={handleChange}>
          <option value="">Tongue Color</option>
          <option value="Normal">Normal</option>
          <option value="Pale">Pale</option>
          <option value="Very Pale">Very Pale</option>
        </select>

        <select onChange={(e) => handleSelectBool("history", e.target.value)}>
          <option>Anemia History</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <br /><br />
        <button type="submit">Predict</button>
      </form>

      {/* RESULT */}
      {result && (
        <div style={{ marginTop: "20px", background: "white", padding: "10px" }}>
          <h3>Result:</h3>
          <p>GDM Risk: {result?.gdm?.risk}</p>
          <p>Anemia Risk: {result?.anemia?.risk}</p>
        </div>
      )}
    </div>
  );
}

export default App;