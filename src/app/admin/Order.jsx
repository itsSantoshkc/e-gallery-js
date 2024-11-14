import Link from "next/link";
import React from "react";

const Order = (props) => {
  const date = new Date(props.orderDate).toDateString();
  return (
    <div className="flex h-full min-w-full p-2 my-2 border rounded-xl">
      <div className="flex items-center min-w-full">
        <div className="w-full p-2 px-4 ">
          <div className="flex items-center justify-between">
            <Link href={`/product/${props.id}`}>
              <h1 className="text-base font-bold transition-colors duration-300 cursor-pointer hover:text-indigo-400 md:text-lg text-gray-950">
                {props.title}
              </h1>
            </Link>
            <h1 className="text-base font-bold text-green-500 md:text-lg">
              + Rs.{props.quantity * props.price}
            </h1>
          </div>

          <div className="flex items-center justify-between w-full text-gray-500 ">
            <h1 className="mt-2 text-sm font-semibold text-justify text-slate-500 md:text-base">
              Quantity Ordered : {props.quantity}
            </h1>
            <h1 className="mt-2 text-sm font-semibold text-justify md:text-base">
              Ordered on: {date}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
