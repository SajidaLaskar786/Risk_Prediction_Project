import React from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MainCard from "../components/MainCard";
import InfoCard from "../components/InfoCard";
import ReminderCard from "../components/ReminderCard";
import anemiaImg from "../assets/anemia.png";
import gdmImg from "../assets/gdm.png";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();
  return (
    <div className="bg-[#f5f9f6] min-h-screen flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8">

        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="mt-8">

          {/* TITLE */}
          <div className="mb-6">

            <h2 className="text-3xl font-bold text-gray-800">
              What would you like to do today?
            </h2>

            <p className="text-gray-500 mt-2">
              Select an option below to continue
            </p>

          </div>

          {/* MAIN CARD */}
          <MainCard />

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            {/* ANEMIA */}
            <InfoCard
              image={anemiaImg}
              title="Anemia"
              description="Learn symptoms, causes, prevention and maternal risks related to anemia."
              color="bg-blue-95"
              onClick={() => navigate("/about-anemia")}
            />

            {/* GDM */}
            <InfoCard
              image={gdmImg}
              title="Gestational Diabetes"
              description="Understand GDM risks, symptoms and preventive maternal healthcare."
              color="bg-blue-95"
              onClick={() => navigate("/about-gdm")}
            />

          </div>

          {/* REMINDER */}
          <div className="mt-8">

            <ReminderCard />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;