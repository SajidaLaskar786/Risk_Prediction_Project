import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PredictPage() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("gdm");

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
    history: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_MODEL_SERVICE_URL}/mht`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          weight_kg: Number(formData.weight_kg),
        }),
      });

      const data = await response.json();

      console.log(data);

      navigate("/result", {
      state: data
    });
    } catch (error) {
      console.error(error);
      alert("API Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] p-4 md:p-8">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-green-800">
          Maternal Risk Prediction
        </h1>

        <p className="text-gray-600 mt-2">
          Enter patient information carefully
        </p>

        {/* TABS */}
        <div className="flex bg-white rounded-2xl p-2 mt-6 shadow-md">

          <button
            onClick={() => setActiveTab("gdm")}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              activeTab === "gdm"
                ? "bg-green-600 text-white"
                : "text-gray-600"
            }`}
          >
            GDM Details
          </button>

          <button
            onClick={() => setActiveTab("anemia")}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              activeTab === "anemia"
                ? "bg-green-600 text-white"
                : "text-gray-600"
            }`}
          >
            Anemia Details
          </button>

        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

          {/* ================= GDM ================= */}
          {activeTab === "gdm" && (
            <div className="space-y-5">

              <div>
                <label className="font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="w-full mt-2 p-4 rounded-2xl border"
                />
              </div>

              <div>
                <label className="font-medium">Gravida</label>
                <input
                  type="number"
                  name="gravida"
                  value={formData.gravida}
                  onChange={handleChange}
                  placeholder="Enter gravida"
                  className="w-full mt-2 p-4 rounded-2xl border"
                />
              </div>

              <div>
                <label className="font-medium">Gestational Weeks</label>
                <input
                  type="number"
                  name="gest_weeks"
                  value={formData.gest_weeks}
                  onChange={handleChange}
                  placeholder="Enter weeks"
                  className="w-full mt-2 p-4 rounded-2xl border"
                />
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="prev_gdm"
                  checked={formData.prev_gdm}
                  onChange={handleChange}
                />
                Previous GDM
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="family"
                  checked={formData.family}
                  onChange={handleChange}
                />
                Family History of Diabetes
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="pcod"
                  checked={formData.pcod}
                  onChange={handleChange}
                />
                PCOD / PCOS
              </label>

              <div>
                <label className="font-medium">Waist Circumference</label>
                <input
                  type="number"
                  name="waist"
                  value={formData.waist}
                  onChange={handleChange}
                  placeholder="Enter waist"
                  className="w-full mt-2 p-4 rounded-2xl border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="font-medium">BP Systolic</label>
                  <input
                    type="number"
                    name="bp_sys"
                    value={formData.bp_sys}
                    onChange={handleChange}
                    placeholder="Systolic"
                    className="w-full mt-2 p-4 rounded-2xl border"
                  />
                </div>

                <div>
                  <label className="font-medium">BP Diastolic</label>
                  <input
                    type="number"
                    name="bp_dia"
                    value={formData.bp_dia}
                    onChange={handleChange}
                    placeholder="Diastolic"
                    className="w-full mt-2 p-4 rounded-2xl border"
                  />
                </div>

              </div>

              <div>
                <label className="font-medium">Physical Activity</label>

                <select
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border"
                >
                  <option value="">Select activity</option>
                  <option value="Active">Active</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="thirst"
                  checked={formData.thirst}
                  onChange={handleChange}
                />
                Excess Thirst
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="urination"
                  checked={formData.urination}
                  onChange={handleChange}
                />
                Frequent Urination
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="hunger"
                  checked={formData.hunger}
                  onChange={handleChange}
                />
                Excess Hunger
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="dark"
                  checked={formData.dark}
                  onChange={handleChange}
                />
                Dark Skin Patches
              </label>

              <button
                onClick={() => setActiveTab("anemia")}
                className="w-full bg-[#388e55] text-white py-4 rounded-2xl font-semibold mt-4"
              >
                Next → Anemia Details
              </button>

            </div>
          )}

          {/* ================= ANEMIA ================= */}
          {activeTab === "anemia" && (
            <div className="space-y-5">

              <div>
                <label className="font-medium">Height (cm)</label>
                <input
                  type="number"
                  name="height_cm"
                  value={formData.height_cm}
                  onChange={handleChange}
                  placeholder="Enter height"
                  className="w-full mt-2 p-4 rounded-2xl border"
                />
              </div>

              <div>
                <label className="font-medium">Weight (kg)</label>
                <input
                  type="number"
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleChange}
                  placeholder="Enter weight"
                  className="w-full mt-2 p-4 rounded-2xl border"
                />
              </div>

              <div>
                <label className="font-medium">Iron Intake</label>

                <select
                  name="iron_intake"
                  value={formData.iron_intake}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border"
                >
                  <option value="">Select intake</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="font-medium">Diet Quality</label>

                <select
                  name="diet_quality"
                  value={formData.diet_quality}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border"
                >
                  <option value="">Select diet</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="fatigue"
                  checked={formData.fatigue}
                  onChange={handleChange}
                />
                Fatigue
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="dizziness"
                  checked={formData.dizziness}
                  onChange={handleChange}
                />
                Dizziness
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="pale_eyelids"
                  checked={formData.pale_eyelids}
                  onChange={handleChange}
                />
                Pale Eyelids
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="pale_nails"
                  checked={formData.pale_nails}
                  onChange={handleChange}
                />
                Pale Nails
              </label>

              <div>
                <label className="font-medium">Tongue Color</label>

                <select
                  name="tongue"
                  value={formData.tongue}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border"
                >
                  <option value="">Select color</option>
                  <option value="Normal">Normal</option>
                  <option value="Pale">Pale</option>
                  <option value="Very Pale">Very Pale</option>
                </select>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="history"
                  checked={formData.history}
                  onChange={handleChange}
                />
                Anemia History
              </label>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#388e55] text-white py-4 rounded-2xl font-semibold mt-4"
              >
                Predict Maternal Risk
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default PredictPage;