"use client";
import { Button } from "@react-email/components";
import { createHmac, randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const EsewaPayment = ({ userId }) => {
  const handleEsewa = async () => {
    const response = await fetch("http://localhost:3000/api/esewa", {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    });
    if (response.status === 200) {
      const responseData = await response.json();
      window.location.href = responseData.url;
    }
  };
  return (
    <Button onClick={handleEsewa} className="bg-green-500">
      Pay with E- sewa
    </Button>
  );
};

export default EsewaPayment;
