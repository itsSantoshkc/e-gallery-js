"use client";
import { Button } from "@react-email/components";
import { createHmac, randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const CashOnDelivery = ({ userId }) => {
  const handleEsewa = async () => {
    const response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    });
    if (response.status === 200) {
      const responseData = await response.json();
      window.location.href = responseData.url;
    }
  };
  return (
    <button
      onClick={handleCOD}
      className="p-2 font-semibold text-white transition-colors duration-300 bg-green-500 cursor-pointer hover:bg-green-700 rounded-xl"
    >
      Pay with E- sewa
    </button>
  );
};

export default CashOnDelivery;
