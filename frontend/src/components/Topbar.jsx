
import React from "react";
import { Menu } from "lucide-react";
import hospitalImg from "../assets/hospital.png";

function Topbar({ setShowSidebar }) {

  return (
    <div className="bg-white px-4 md:px-6 py-4 flex items-center justify-between rounded-3xl shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* MOBILE MENU */}
        <button
          onClick={() => setShowSidebar(true)}
          className="md:hidden p-2 rounded-xl hover:bg-gray-100"
        >
          <Menu size={28} />
        </button>

        {/* TEXT */}
        <div>

          <p className="text-gray-500 text-sm">
            Welcome,
          </p>

          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            ASHA Worker 👋
          </h1>

        </div>

      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center">

        <img
          src={hospitalImg}
          alt="Hospital"
          className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-3xl"
        />

      </div>

    </div>
  );
}

export default Topbar;

