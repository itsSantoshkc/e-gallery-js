"use client";

import React, { useRef, useState } from "react";

const EsewaPayment = ({ userId }) => {
  const [loading, setLoading] = useState(false);

  const handleEsewa = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/esewa`, {
        method: "POST",
        body: JSON.stringify({ user_id: userId }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        window.location.href = responseData.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEsewa}
      disabled={loading}
      className="w-full p-2 font-semibold text-white transition-colors duration-300 bg-[#60bb46] cursor-pointer text-nowrap hover:bg-[#539D3B] rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Pay with E-Sewa"}
    </button>
  );
};

export default EsewaPayment;
