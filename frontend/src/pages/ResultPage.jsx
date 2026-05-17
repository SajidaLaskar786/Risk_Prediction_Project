import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import resultImg from "../assets/result.png";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // safety check
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No Result Found</p>
      </div>
    );
  }

  const gdmRisk = data?.gdm?.risk;
  const anemiaRisk = data?.anemia?.risk;

  // overall risk
  let overallRisk = "LOW RISK";

if (
  gdmRisk === "High" ||
  anemiaRisk === "High"
) {
  overallRisk = "HIGH RISK";
}

else if (
  gdmRisk === "Medium" ||
  anemiaRisk === "Medium"
) {
  overallRisk = "MEDIUM RISK";
}

  return (
    <div className="min-h-screen bg-[#f4f7f4] p-5">

      <div className="max-w-md mx-auto">

        {/* TITLE */}
        <div className="bg-[#b2cdb8] rounded-[32px] px-8 py-5 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">

  {/* LEFT */}
  <div className="flex-1">

    <p className="text-green-700 font-semibold uppercase tracking-wide text-sm">
      Maternal Health Result
    </p>

    <h1 className="text-3xl md:text-4xl font-bold text-[#1f3d2b] mt-2 leading-tight">
      Prediction Completed
    </h1>

   

    {/* OVERALL BADGE */}
    <div
      className={`inline-block mt-5 px-6 py-3 rounded-2xl text-lg font-bold ${
        overallRisk === "HIGH RISK"
        ? "bg-red-100 text-red-600"
        : overallRisk === "MEDIUM RISK"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
            }`}
    >
      {overallRisk}
    </div>

  </div>

  {/* RIGHT IMAGE */}
  <div className="flex justify-center rounded-3xl">

    <img
      src={resultImg}
      alt="Result"
      className="w-40 md:w-52 object-cover rounded-3xl shadow-md"
    />

  </div>

</div>

        {/* GDM CARD */}
        <div className="bg-white rounded-[28px] shadow-md p-6 mt-5 border border-red-100">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm text-gray-500 font-medium">
        Gestational Diabetes
      </p>

      <h3 className="text-2xl font-bold text-[#1f3d2b] mt-1">
        GDM Risk
      </h3>

    </div>

    <div className="text-4xl">
      🩺
    </div>

  </div>

  <div
    className={`mt-5 inline-block px-5 py-2 rounded-2xl text-lg font-bold ${
      gdmRisk === "High"
  ? "bg-red-100 text-red-600"
  : gdmRisk === "Medium"
  ? "bg-yellow-100 text-yellow-700"
  : "bg-green-100 text-green-700"
    }`}
  >
    {gdmRisk} Risk
  </div>

</div>

        {/* ANEMIA CARD */}
        <div className="bg-white rounded-[28px] shadow-md p-6 mt-5 border border-orange-100">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm text-gray-500 font-medium">
        Hemoglobin Assessment
      </p>

      <h3 className="text-2xl font-bold text-[#1f3d2b] mt-1">
        Anemia Risk
      </h3>

    </div>

    <div className="text-4xl">
      🩸
    </div>

  </div>

  <div
    className={`mt-5 inline-block px-5 py-2 rounded-2xl text-lg font-bold ${
      anemiaRisk === "High"
        ? "bg-red-100 text-red-600"
        : anemiaRisk === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {anemiaRisk} Risk
  </div>

</div>

        {/* RECOMMENDATION */}
        {/* RECOMMENDATION */}
<div
  className={`rounded-[28px] p-6 mt-5 border ${
    overallRisk === "HIGH RISK"
      ? "bg-red-50 border-red-200"
      : overallRisk === "MEDIUM RISK"
      ? "bg-yellow-50 border-yellow-200"
      : "bg-green-50 border-green-200"
  }`}
>

  <h3
    className={`font-bold text-xl mb-4 ${
      overallRisk === "HIGH RISK"
        ? "text-red-700"
        : overallRisk === "MEDIUM RISK"
        ? "text-yellow-700"
        : "text-green-700"
    }`}
  >
    Recommendations
  </h3>

  {/* HIGH RISK */}
  {overallRisk === "HIGH RISK" && (

    <ul className="space-y-3 text-gray-700 leading-7">

      <li>
        • Visit the nearest health center immediately
      </li>

      <li>
        • Regular monitoring of blood glucose and hemoglobin is recommended
      </li>

      <li>
        • Follow prescribed supplements and medications carefully
      </li>

      <li>
        • Schedule frequent pregnancy checkups
      </li>

      <li>
        • Maintain proper nutrition and hydration
      </li>

    </ul>

  )}

  {/* MEDIUM RISK */}
  {overallRisk === "MEDIUM RISK" && (

    <ul className="space-y-3 text-gray-700 leading-7">

      <li>
        • Follow regular antenatal monitoring
      </li>

      <li>
        • Improve dietary intake and hydration
      </li>

      <li>
        • Monitor blood glucose and hemoglobin periodically
      </li>

      <li>
        • Consult healthcare worker if symptoms increase
      </li>

      <li>
        • Continue healthy pregnancy lifestyle practices
      </li>

    </ul>

  )}

  {/* LOW RISK */}
  {overallRisk === "LOW RISK" && (

    <ul className="space-y-3 text-gray-700 leading-7">

      <li>
        • Continue regular antenatal checkups
      </li>

      <li>
        • Maintain balanced nutrition and hydration
      </li>

      <li>
        • Continue healthy pregnancy habits
      </li>

      <li>
        • Maintain iron-rich and nutritious diet
      </li>

      <li>
        • Monitor health regularly during pregnancy
      </li>

    </ul>

  )}

</div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#06402B] text-white py-4 rounded-2xl font-semibold mt-6"
        >
          Back To Home
        </button>

      </div>

    </div>
  );
}

export default ResultPage;