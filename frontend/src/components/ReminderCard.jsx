import React from "react";
import reminderImg from "../assets/reminder.png";

function ReminderCard() {
  return (
    <div className="bg-green-50 border border-green-100 rounded-3xl p-6 flex items-start gap-5 shadow-sm">

      {/* ICON */}
      <div className="flex justify-center">

        <img
            src={reminderImg}
            alt="Reminder"
            className="w-24 h-24 object-contain rounded-2xl"
        />

</div>

      {/* TEXT */}
      <div>

        <h3 className="text-2xl font-bold text-green-700">
          Reminder
        </h3>

        <p className="text-gray-600 mt-3 leading-7">
          Encourage pregnant women to visit the nearest
          health center regularly for proper maternal care.
        </p>

      </div>

    </div>
  );
}

export default ReminderCard;