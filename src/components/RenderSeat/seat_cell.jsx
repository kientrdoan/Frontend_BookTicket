// SeatCell.js
import React from "react";
import seat_active from "../../assets/images/seat_active.svg";
import seat_selecting from "../../assets/images/seat_selecting.svg";
import seat_disabled from "../../assets/images/seat_disabled.svg";

export default function SeatCell({ seatLabel, isDisabled, isSelected, onSelect }) {
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
        src={
          isDisabled
            ? seat_disabled
            : isSelected
            ? seat_selecting
            : seat_active
        }
        alt='seat icon'
      />
      <span className='absolute text-sm font-semibold text-[#A2ABB3] top-[0.55rem]'>
        {seatLabel}
      </span>
    </td>
  );
}
