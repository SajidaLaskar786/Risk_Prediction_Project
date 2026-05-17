import React from "react";
import { ArrowRight } from "lucide-react";
import pregnantImg from "../assets/pregnant.png";
import reportImg from "../assets/report.png";
import { useNavigate } from "react-router-dom";


function MainCard() {
    const navigate = useNavigate();
  return (
    <div className="bg-[#b2cdb8] rounded-3xl p-6 shadow-sm">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* LEFT SECTION */}
        <div className="flex items-start gap-10">

        {/* ICON */}
        <div className="flex justify-center">
            <img
            src={reportImg}
            alt="Report"
            className="w-[70px] md:w-[100px] object-cover rounded-3xl"
            />
        </div>

          {/* TEXT */}
          <div>

            <h2 className="text-2xl font-bold text-green-700">
              Predict Maternal Risk
            </h2>

            <p className="text-gray-600 mt-3 leading-7 max-w-[400px]">
              Assess risk of Anemia and Gestational Diabetes Mellitus (GDM)
              using AI-powered prediction.
            </p>

            {/* BUTTON */}
            <button
                onClick={() => navigate("/predict")}
                className="bg-[#388e55] text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
                onClick={() => navigate("/predict")}
                >
                Start Prediction
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
            <img
                src={pregnantImg}
                alt="Pregnant Woman"
                className="w-[220px] md:w-[280px] object-cover rounded-3xl"
            />
        </div>

      </div>

    </div>
  );
}

export default MainCard;