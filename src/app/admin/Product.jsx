import Link from "next/link";
import React from "react";

const Product = (props) => {
  const date = new Date(props.orderDate).toDateString();
  return (
    <div className="flex h-full min-w-full p-2 my-2 border rounded-xl">
      <div className="flex items-center w-full">
        <div className="w-full p-2 px-4">
          <Link href={`/product/${props.id}`}>
            <h1 className="text-base font-bold transition-colors duration-300 cursor-pointer hover:text-indigo-400 md:text-lg text-gray-950">
              {props.title}
            </h1>
          </Link>
          <p className="mt-2 text-sm text-justify text-gray-500 md:text-base">
            {props.description}
          </p>
          <div className="flex items-center justify-end w-full text-gray-500">
            <h1 className="mt-2 text-sm font-semibold text-justify md:text-base">
              Created on: {date}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
