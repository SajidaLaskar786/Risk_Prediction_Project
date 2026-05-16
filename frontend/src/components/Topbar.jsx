import React from "react";
import { Menu } from "lucide-react";
import hospitalImg from "../assets/hospital.png";

function Topbar() {
  return (
    <div className="bg-white px-5 py-4 flex items-center justify-between rounded-3xl shadow-sm">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* HAMBURGER */}
        <button className="md:hidden p-2 rounded-xl hover:bg-gray-100">

          <Menu size={28} />

        </button>

        {/* WELCOME */}
        <div>

          <p className="text-gray-500 text-sm">
            Welcome,
          </p>

          <h1 className="text-2xl font-bold text-gray-800">
            ASHA Worker 👋
          </h1>

        </div>

      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="mt-8 flex justify-center">

        <img
            src={hospitalImg}
            alt="HOSPITAL IMG"
            className="w-27 h-20 object-cover rounded-3xl"
        />

    </div>

    </div>
  );
}

export default Topbar;