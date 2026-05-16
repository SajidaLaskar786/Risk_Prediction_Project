import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, [navigate]);

  return (
    <div className="bg-green-100 h-screen flex flex-col items-center justify-center px-6">

      <div className="text-6xl mb-6">
        ❤️
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-green-800 text-center">
        Maternal Health Predictor
      </h1>

      <p className="text-gray-600 mt-4 text-center text-lg md:text-xl">
        AI-based Risk Detection System
      </p>

      <div className="mt-10">
        <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <p className="mt-4 text-green-700 font-medium">
        Loading...
      </p>

    </div>
  );
}

export default Splash;