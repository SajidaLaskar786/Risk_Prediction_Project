import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import predictImg from "../assets/predict.png";

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

  const { name, value } = e.target;

  let finalValue = value;

  // convert true/false strings to boolean
  if (value === "true") {
    finalValue = true;
  }

  else if (value === "false") {
    finalValue = false;
  }

  setFormData({
    ...formData,
    [name]: finalValue
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

  {/* HEADER */}
  <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-6">

  {/* LEFT TEXT */}
  <div className="flex-1">

    <p className="text-green-700 font-semibold text-sm uppercase tracking-wide">
      Maternal Health Screening
    </p>

    <h1 className="text-4xl font-bold text-[#1f3d2b] mt-2 leading-tight">
      Predict Maternal Risk
    </h1>

    <p className="text-gray-500 mt-3 text-lg">
      Fill patient information carefully to assess
      GDM and Anemia risk.
    </p>

  </div>

  {/* RIGHT IMAGE */}
  <div className="flex justify-center">

    <img
      src={predictImg}
      alt="Maternal Health"
      className="w-32 md:w-40 object-contain"
    />

  </div>

</div>

  {/* TABS */}
  <div className="bg-white rounded-3xl p-2 shadow-md flex gap-2">

    <button
      onClick={() => setActiveTab("gdm")}
      className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
        activeTab === "gdm"
          ? "bg-[#2d6a4f] text-white shadow-md"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      GDM Details
    </button>

    <button
      onClick={() => setActiveTab("anemia")}
      className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
        activeTab === "anemia"
          ? "bg-[#2d6a4f] text-white shadow-md"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      Anemia Details
    </button>

  </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-[32px] shadow-lg p-6 md:p-8 mt-6 border border-[#edf2ee]">

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
                <label className="font-medium">Gravida (Number of Pregnancies)</label>
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
                <label className="font-medium">Gestational Age (Weeks)</label>
                <input
                  type="number"
                  name="gest_weeks"
                  value={formData.gest_weeks}
                  onChange={handleChange}
                  placeholder="Enter weeks"
                  className="w-full mt-2 p-4 rounded-2xl border"
                />
              </div>

              {/* PREVIOUS GDM */}
            <div>
              <label className="font-medium text-gray-700">
                Previous GDM
              </label>

              <select
                name="prev_gdm"
                value={formData.prev_gdm}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* FAMILY HISTORY */}
            <div>
              <label className="font-medium text-gray-700">
                Family History of Diabetes
              </label>

              <select
                name="family"
                value={formData.family}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* PCOD */}
            <div>
              <label className="font-medium text-gray-700">
                PCOD
              </label>

              <select
                name="pcod"
                value={formData.pcod}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

              <div>
                <label className="font-medium">Waist Circumference (cm)</label>
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

              {/* EXCESS THIRST */}
              <div>
                <label className="font-medium text-gray-700">
                  Excess Thirst
                </label>

                <select
                  name="thirst"
                  value={formData.thirst}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* FREQUENT URINATION */}
              <div>
                <label className="font-medium text-gray-700">
                  Frequent Urination
                </label>

                <select
                  name="urination"
                  value={formData.urination}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* EXCESS HUNGER */}
              <div>
                <label className="font-medium text-gray-700">
                  Excess Hunger
                </label>

                <select
                  name="hunger"
                  value={formData.hunger}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* DARK SKIN PATCHES */}
            <div>
              <label className="font-medium text-gray-700">
                Dark Skin Patches
              </label>

              <select
                name="dark"
                value={formData.dark}
                onChange={handleChange}
                className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

              <button
                onClick={() => setActiveTab("anemia")}
                className="w-full bg-[#2d6a4f] text-white py-4 rounded-2xl font-semibold mt-4"
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

              <div>
                <label className="font-medium text-gray-700">
                  Fatigue
                </label>

                <select
                  name="fatigue"
                  value={formData.fatigue}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* DIZZINESS */}
              <div>
                <label className="font-medium text-gray-700">
                  Dizziness
                </label>

                <select
                  name="dizziness"
                  value={formData.dizziness}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* PALE EYELIDS */}
              <div>
                <label className="font-medium text-gray-700">
                  Pale Eyelids
                </label>

                <select
                  name="pale_eyelids"
                  value={formData.pale_eyelids}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* PALE NAILS */}
              <div>
                <label className="font-medium text-gray-700">
                  Pale Nails
                </label>

                <select
                  name="pale_nails"
                  value={formData.pale_nails}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

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

              {/* ANEMIA HISTORY */}
              <div>
                <label className="font-medium text-gray-700">
                  Anemia History
                </label>

                <select
                  name="history"
                  value={formData.history}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-[#2d6a4f] transition"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#2d6a4f] text-white py-4 rounded-2xl font-semibold mt-4"
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