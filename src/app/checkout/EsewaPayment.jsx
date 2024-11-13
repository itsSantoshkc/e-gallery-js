"use client";

import React, { useRef } from "react";

const EsewaPayment = ({ userId }) => {
  const DialogTriggerRef = useRef(null);
  const handleEsewa = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/esewa`, {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    });
    if (response.status === 200) {
      const responseData = await response.json();
      window.location.href = responseData.url;
    }
  };

  return (
    <>
      <button
        onClick={handleEsewa}
        className="w-full p-2 font-semibold text-white transition-colors duration-300 bg-[#60bb46] cursor-pointer text-nowrap hover:bg-[#539D3B] rounded-xl"
      >
        Pay with E-Sewa
      </button>
    </>
  );
};

export default EsewaPayment;
