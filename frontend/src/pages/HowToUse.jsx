import React from "react";
import guideImg from "../assets/guide.png";

function HowToUse() {

  const steps = [
    {
      title: "Open Prediction Form",
      desc: "Click on Predict Maternal Risk from dashboard."
    },
    {
      title: "Enter Patient Details",
      desc: "Fill all GDM and Anemia details carefully."
    },
    {
      title: "Submit Prediction",
      desc: "Click Predict Risk to run AI screening."
    },
    {
      title: "View Results",
      desc: "Analyze GDM and Anemia risk levels."
    },
    {
      title: "Follow Recommendations",
      desc: "Provide guidance based on prediction result."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f4] p-5">

      <div className="max-w-md mx-auto">

        {/* HERO */}
        <div className="bg-[#b2cdb8] rounded-[32px] p-1 flex flex-col items-center text-center">

          <img
            src={guideImg}
            alt="Guide"
            className="w-40 "
          />

          <h1 className="text-3xl font-bold text-[#1f3d2b] mt-1">
            How To Use
          </h1>

          <p className="text-gray-700 mt-3 leading-7">
            Simple step-by-step guide for maternal health screening.
          </p>

        </div>

        {/* STEPS */}
        <div className="mt-5 space-y-5">

          {steps.map((step, index) => (

            <div
              key={index}
              className="bg-white rounded-[28px] shadow-md p-5 flex gap-4 items-start"
            >

              {/* NUMBER */}
              <div className="min-w-[50px] h-[50px] bg-[#388e55] text-white rounded-2xl flex items-center justify-center font-bold text-xl">

                {index + 1}

              </div>

              {/* TEXT */}
              <div>

                <h3 className="text-xl font-bold text-[#1f3d2b]">
                  {step.title}
                </h3>

                <p className="text-gray-600 mt-2 leading-7">
                  {step.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* NOTE */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-[28px] p-6 mt-5">

          <h2 className="text-2xl font-bold text-yellow-700 mb-3">
            Important Note
          </h2>

          <p className="text-gray-700 leading-7">
            Ensure patient details are entered correctly for accurate maternal health prediction.
          </p>

        </div>

      </div>

    </div>
  );
}

export default HowToUse;