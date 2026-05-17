import React from "react";
import aboutImg from "../assets/about.png";

function AboutSystem() {

  const features = [
    "AI-powered maternal risk prediction",
    "Combined GDM and Anemia screening",
    "Healthcare recommendations",
    "ASHA worker friendly interface",
    "Fast and simple patient screening",
    "Educational healthcare awareness"
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f4] p-5">

      <div className="max-w-md mx-auto">

        {/* HERO */}
        <div className="bg-[#b2cdb8] rounded-[32px] p-6 flex flex-col items-center text-center">

          <img
            src={aboutImg}
            alt="System"
            className="w-40 "
          />

          <h1 className="text-3xl font-bold text-[#1f3d2b] ">
            About Our System
          </h1>

          <p className="text-gray-700 mt-3 leading-7">
            AI-powered maternal healthcare screening system designed for early risk detection.
          </p>

        </div>

        {/* OVERVIEW */}
        <div className="bg-white rounded-[28px] shadow-md p-6 mt-5">

          <h2 className="text-2xl font-bold text-[#1f3d2b] mb-4">
            System Overview
          </h2>

          <p className="text-gray-600 leading-7">
            This system helps ASHA workers identify Gestational Diabetes Mellitus (GDM) and Anemia risks during pregnancy using machine learning models and healthcare-based recommendations.
          </p>

        </div>

        {/* FEATURES */}
        <div className="bg-white rounded-[28px] shadow-md p-6 mt-5">

          <h2 className="text-2xl font-bold text-[#1f3d2b] mb-5">
            Key Features
          </h2>

          <div className="space-y-4">

            {features.map((feature, index) => (

              <div
                key={index}
                className="bg-[#eef5ef] rounded-2xl p-4 text-gray-700 font-medium"
              >
                • {feature}
              </div>

            ))}

          </div>

        </div>

        {/* TECHNOLOGY */}
        <div className="bg-white rounded-[28px] shadow-md p-6 mt-5">

          <h2 className="text-2xl font-bold text-[#1f3d2b] mb-4">
            Technologies Used
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-[#eef5ef] rounded-2xl p-4 text-center">
              React JS
            </div>

            <div className="bg-[#eef5ef] rounded-2xl p-4 text-center">
              FastAPI
            </div>

            <div className="bg-[#eef5ef] rounded-2xl p-4 text-center">
              Machine Learning
            </div>

            <div className="bg-[#eef5ef] rounded-2xl p-4 text-center">
              Tailwind CSS
            </div>

          </div>

        </div>

        {/* OBJECTIVE */}
        <div className="bg-green-50 border border-green-200 rounded-[28px] p-6 mt-5">

          <h2 className="text-2xl font-bold text-green-700 mb-3">
            Healthcare Objective
          </h2>

          <p className="text-gray-700 leading-7">
            Our goal is to support early maternal risk detection and improve pregnancy healthcare accessibility in rural and community healthcare environments.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AboutSystem;