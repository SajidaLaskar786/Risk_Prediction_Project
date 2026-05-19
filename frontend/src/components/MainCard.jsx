
import React from "react";
import pregnantImg from "../assets/pregnant.png";
import { useNavigate } from "react-router-dom";

function MainCard() {

  const navigate = useNavigate();

  
return (

  <div className="bg-[#eef6ef] rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden">

    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

      {/* LEFT */}
      <div className="flex-1 text-center lg:text-left">

        <h2 className="text-3xl md:text-4xl font-bold text-green-900 leading-tight">
          Predict Maternal Risk
        </h2>

        <p className="text-gray-700 mt-4 leading-7 max-w-[420px] text-base md:text-lg mx-auto lg:mx-0">
          Assess risk of Anemia and Gestational Diabetes Mellitus (GDM)
          using AI-powered prediction.
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-center gap-4">

        <img
          src={pregnantImg}
          alt="Pregnant Woman"
          className="w-[170px] md:w-[230px] object-contain"
        />

        <button
          onClick={() => navigate("/predict")}
          className="bg-[#388e55] text-white px-7 py-4 rounded-2xl font-semibold hover:scale-105 transition"
        >
          Start Prediction
        </button>

      </div>

    </div>

  </div>

);


}

export default MainCard;

