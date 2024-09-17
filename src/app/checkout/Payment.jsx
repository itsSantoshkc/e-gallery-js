"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = ({ cartItems }) => {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stripe`, {
      method: "POST",
      body: JSON.stringify(cartItems),
    });
    const data = await res.json();
    return data.clientSecret;
  }, []);

  const options = { fetchClientSecret };
  return (
    <Dialog className="w-[50vw]">
      <DialogTrigger className="w-full p-2 text-xs rounded-xl md:text-lg md:w-3/4 text-stone-600 bg-stone-300 hover:bg-stone-200">
        Pay
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
          <DialogDescription>Enter payment details</DialogDescription>
        </DialogHeader>
        {/* <div className="flex items-center justify-center">
          <form action="" className="grid grid-cols-3 px-3">
            <div className="flex flex-col col-span-3">
              <label className="font-semibold text-stone-600" htmlFor="cardno">
                Card No :
              </label>
              <input
                type="text"
                placeholder="Enter your card number "
                className="w-full h-12 px-2 border rounded-lg focus:text-stone-400 text-stone-600 border-stone-300 placeholder:text-stone-400"
              />
            </div>
            <div className="flex items-center col-span-3 gap-5 mt-4 justify-evenly">
              <div className="flex flex-col w-1/2">
                <label
                  className="font-semibold text-stone-600"
                  htmlFor="cardno"
                >
                  CC :
                </label>
                <input
                  type="text"
                  placeholder="Security Number"
                  className="h-12 px-2 border rounded-lg focus:text-stone-400 text-stone-600 border-stone-300 placeholder:text-stone-400"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  className="font-semibold text-stone-600"
                  htmlFor="cardno"
                >
                  Exp Date :
                </label>
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="h-12 px-2 border rounded-lg focus:text-stone-400 text-stone-600 border-stone-300 placeholder:text-stone-400"
                />
              </div>
            </div>
            <div className="col-span-3 mt-4">
              <button
                className="w-full h-12 text-xl font-semibold text-white bg-stone-500 rounded-xl"
                type="submit"
              >
                Pay
              </button>
            </div>
          </form>
        </div> */}
        <div>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="w-full" />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Payment;
