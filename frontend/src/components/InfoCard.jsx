import React from "react";

function InfoCard({ image, title, description, color }) {
  return (
    <div className={`${color} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition duration-300`}>

      {/* IMAGE */}
      <div className="flex justify-center">

        <img
          src={image}
          alt={title}
          className="w-28 h-28 object-contain rounded-2xl"
        />

      </div>

      {/* TEXT */}
      <div className="mt-5 text-center">

        <h3 className="text-2xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-gray-600 mt-3 leading-7">
          {description}
        </p>

      </div>

      {/* BUTTON */}
      <div className="flex justify-center">

        <button className="mt-6 bg-white px-6 py-3 rounded-2xl font-semibold shadow-sm hover:scale-105 transition">
            Learn More
        </button>

    </div>

    </div>
  );
}

export default InfoCard;