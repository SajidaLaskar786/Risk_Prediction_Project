import React from "react";
import ashaImg from "../assets/asha.png";
import {
  Home,
  Activity,
  Droplets,
  HeartPulse,
  Info,
  HelpCircle
} from "lucide-react";

function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-[260px] bg-white border-r min-h-screen p-5">

      {/* LOGO */}
      <div className="mb-10">

        <h1 className="text-2xl font-bold text-green-700 leading-8">
          Maternal Health
        </h1>

      </div>

      {/* MENU */}
      <div className="flex flex-col gap-3">

        <button className="flex items-center gap-3 bg-green-100 text-green-700 p-4 rounded-2xl font-semibold">
          <Home size={22} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 p-4 rounded-2xl">
          <Activity size={22} />
          Predict Maternal Risk
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 p-4 rounded-2xl">
          <Droplets size={22} />
          About Anemia
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 p-4 rounded-2xl">
          <HeartPulse size={22} />
          About GDM
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 p-4 rounded-2xl">
          <Info size={22} />
          About Our System
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 p-4 rounded-2xl">
          <HelpCircle size={22} />
          How To Use
        </button>

      </div>
      {/* ASHA IMAGE */}
<div className="mt-auto flex justify-center pt-10">

  <img
    src={ashaImg}
    alt="ASHA Worker"
    className="w-[220px] md:w-[280px] object-cover rounded-3xl"
  />

</div>

    </div>
  );
}

export default Sidebar;