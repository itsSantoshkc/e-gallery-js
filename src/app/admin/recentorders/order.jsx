import React from "react";

const Order = (props) => {
  return (
    <div className="flex h-full p-4 my-4 border rounded-xl">
      <div className="flex items-center w-full">
        <div className="w-40 h-40 overflow-hidden min-w-40 min-h-40 rounded-xl md:w-32 md:h-32">
          <img
            className="object-cover min-w-full min-h-full transition-all duration-300 cursor-pointer hover:rounded-xl hover:scale-110 rounded-xl"
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold transition-colors duration-300 cursor-pointer hover:text-indigo-400 md:text-2xl text-gray-950">
            {props.title}
          </h1>
          <p className="mt-2 text-sm text-justify text-gray-500 md:text-base">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
