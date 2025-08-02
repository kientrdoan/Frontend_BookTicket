"use client";

import React from "react";

export default function SeatCell({ seatLabel, isDisabled, isSelected, onSelect }) {
  const getImageSrc = () => {
    if (isDisabled) return "/images/seat_disabled.svg";
    if (isSelected) return "/images/seat_selecting.svg";
    return "/images/seat_active.svg";
  };

  return (
    <td
      onClick={() => {
        if (!isDisabled) onSelect(seatLabel);
      }}
      className={`relative mt-1 flex justify-center text-center ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <img
        width={45}
        src={getImageSrc()}
        alt="seat icon"
        className="select-none"
      />
      <span className="absolute text-sm font-semibold text-[#A2ABB3] top-[0.55rem] pointer-events-none">
        {seatLabel}
      </span>
    </td>
  );
}
