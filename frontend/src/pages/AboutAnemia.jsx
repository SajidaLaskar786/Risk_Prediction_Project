import React from "react";
import bloodImg from "../assets/blood.png";

function AboutAnemia() {

  const symptoms = [
    "Fatigue",
    "Dizziness",
    "Pale eyelids",
    "Pale nails",
    "Weakness",
    "Shortness of breath"
  ];

  const foods = [
    "Spinach",
    "Dates",
    "Pomegranate",
    "Beans",
    "Eggs",
    "Green leafy vegetables"
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f4] p-5">

      <div className="max-w-md mx-auto">

        {/* HERO */}
        <div className="bg-[#b2cdb8] rounded-[32px] p-6 flex flex-col items-center text-center">

          <img
            src={bloodImg}
            alt="Anemia"
            className="w-32 "
          />

          <h1 className="text-3xl font-bold text-[#1f3d2b] mt-5">
            About Anemia
          </h1>

          <p className="text-gray-700 mt-3 leading-7">
            Anemia occurs when the body does not have enough healthy red blood cells or hemoglobin.
          </p>

        </div>

        {/* WHAT IS ANEMIA */}
        <div className="bg-white rounded-[28px] p-6 shadow-md mt-5">

          <h2 className="text-2xl font-bold text-[#1f3d2b] mb-3">
            What is Anemia?
          </h2>

          <p className="text-gray-600 leading-7">
            During pregnancy, anemia can reduce oxygen supply to both mother and baby. Early detection and proper nutrition are important for healthy pregnancy outcomes.
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
            Iron-Rich Foods
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
            Visit the nearest health center immediately if severe fatigue, breathing difficulty, fainting, or weakness is observed during pregnancy.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AboutAnemia;