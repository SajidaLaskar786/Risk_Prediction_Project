import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const overallRisk =
    gdmRisk === "High" || anemiaRisk === "High"
      ? "HIGH RISK"
      : "LOW RISK";

  return (
    <div className="min-h-screen bg-[#f4f7f4] p-5">

      <div className="max-w-md mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Prediction Result
        </h1>

        {/* OVERALL CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

          <p className="text-gray-500 font-medium">
            Overall Risk
          </p>

          <h2
            className={`text-4xl font-bold mt-3 ${
              overallRisk === "HIGH RISK"
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {overallRisk}
          </h2>

        </div>

        {/* GDM CARD */}
        <div className="bg-white rounded-3xl shadow-md p-5 mt-5">

          <h3 className="text-lg font-semibold text-gray-700">
            GDM Risk
          </h3>

          <p
            className={`text-2xl font-bold mt-2 ${
              gdmRisk === "High"
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {gdmRisk}
          </p>

        </div>

        {/* ANEMIA CARD */}
        <div className="bg-white rounded-3xl shadow-md p-5 mt-5">

          <h3 className="text-lg font-semibold text-gray-700">
            Anemia Risk
          </h3>

          <p
            className={`text-2xl font-bold mt-2 ${
              anemiaRisk === "High"
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {anemiaRisk}
          </p>

        </div>

        {/* RECOMMENDATION */}
        <div className="bg-green-50 rounded-3xl p-5 mt-5 border border-green-200">

          <h3 className="font-bold text-green-800 mb-3">
            Recommendations
          </h3>

          <ul className="space-y-2 text-gray-700">

            <li>
              • Visit nearest health center regularly
            </li>

            <li>
              • Maintain healthy diet and hydration
            </li>

            <li>
              • Follow doctor recommendations
            </li>

            <li>
              • Monitor pregnancy carefully
            </li>

          </ul>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#388e55] text-white py-4 rounded-2xl font-semibold mt-6"
        >
          Back To Home
        </button>

      </div>

    </div>
  );
}

export default ResultPage;