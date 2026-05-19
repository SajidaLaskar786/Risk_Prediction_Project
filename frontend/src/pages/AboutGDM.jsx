import React from "react";
import gdmImg from "../assets/gdm.png";

function AboutGDM() {

  const symptoms = [
    "Excessive thirst",
    "Frequent urination",
    "Increased hunger",
    "Fatigue",
    "Blurred vision",
    "Dark skin patches"
  ];

  const foods = [
    "Whole grains",
    "Vegetables",
    "Fruits",
    "Protein-rich foods",
    "Nuts",
    "Low sugar diet"
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f4] p-5">

      <div className="max-w-md mx-auto">

        {/* HERO */}
        <div className="bg-[#b2cdb8] rounded-[32px] p-6 flex flex-col items-center text-center">

          <img
            src={gdmImg}
            alt="GDM"
            className="w-32 "
          />

          <h1 className="text-3xl font-bold text-[#1f3d2b] mt-5">
            About GDM
          </h1>

          <p className="text-gray-700 mt-3 leading-7">
            Gestational Diabetes Mellitus (GDM) is high blood sugar that develops during pregnancy.
          </p>

        </div>

        {/* ABOUT */}
        <div className="bg-white rounded-[28px] p-6 shadow-md mt-5">

          <h2 className="text-2xl font-bold text-[#1f3d2b] mb-3">
            What is GDM?
          </h2>

          <p className="text-gray-600 leading-7">
            GDM occurs when the body cannot properly regulate blood sugar during pregnancy. Early detection helps protect both mother and baby.
          </p>

        </div>

        {/* SYMPTOMS */}
        <div className="bg-white rounded-[28px] p-6 shadow-md mt-5">

          <h2 className="text-2xl font-bold text-[#1f3d2b] mb-5">
            Common Symptoms
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {symptoms.map((item, index) => (

              <div
                key={index}
                className="bg-[#eef5ef] rounded-2xl p-4 text-center font-medium text-gray-700"
              >
                {item}
              </div>

            ))}

          </div>

        </div>

        {/* FOOD SECTION */}
        <div className="bg-white rounded-[28px] p-6 shadow-md mt-5">

          <h2 className="text-2xl font-bold text-[#1f3d2b] mb-5">
            Healthy Food Habits
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {foods.map((food, index) => (

              <div
                key={index}
                className="bg-[#eef5ef] rounded-2xl p-4 text-center font-medium text-gray-700"
              >
                {food}
              </div>

            ))}

          </div>

        </div>

        {/* WARNING */}
        <div className="bg-red-50 border border-red-200 rounded-[28px] p-6 mt-5">

          <h2 className="text-2xl font-bold text-red-700 mb-3">
            When To Visit Health Center?
          </h2>

          <p className="text-gray-700 leading-7">
            Visit the nearest health center if excessive thirst, frequent urination, or weakness becomes severe during pregnancy.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AboutGDM;