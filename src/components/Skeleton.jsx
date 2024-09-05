import React from "react";
import { TableCell, TableRow } from "./ui/table";

export const CardSkeleton = (props) => {
  return <div className="w-full h-full bg-gray-300 animate-pulse"></div>;
};

export const CartItemSkeleton = () => {
  return (
    <div className="flex items-center h-full py-5 justify-evenly animate-pulse">
      <div className="flex flex-col mx-2 ">
        <div className="h-full p-2 ">
          <div className="object-fill w-16 h-16 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full md:w-4/5 ">
        <div className="block w-5/6 h-3 mt-1 bg-gray-200 rounded-xl md:w-4/5"></div>
        <div className="block w-5/6 h-3 mt-2 bg-gray-200 rounded-xl md:w-4/5"></div>
        <div className="block w-5/6 h-3 mt-2 bg-gray-200 rounded-xl md:w-4/5"></div>
        <span className="flex items-center justify-start w-auto "></span>
      </div>
    </div>
  );
};

export const ProductImageSkeleton = () => {
  return (
    <div className="w-screen max-h-screen bg-gray-200 animate-pulse"></div>
  );
};

export const CheckoutItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        className="bg-gray-300 hover:bg-gray-300 md:text-base animate-pulse"
      >
        <div className="text-center text-[11px] w-full h-full bg-gray-300 hover:bg-gray-300 md:text-base animate-pulse">
          <div className="grid w-full h-full grid-cols-5 p-4 text-center border-b border-gray-200">
            <div className="flex items-center col-span-2 space-x-3 md:text-center">
              <div className="w-24 bg-gray-200 h-28 rounded-xl"></div>
              <div className="flex flex-col justify-around h-full w-36 ">
                <div className="w-full h-4 bg-gray-200 rounded-xl"></div>
                <div className="w-full h-4 bg-gray-200 rounded-xl"></div>
                <div className="w-full h-4 bg-gray-200 rounded-xl"></div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="w-24 h-6 bg-gray-200 rounded"></div>
            </div>

            <div className="col-span-1 md:text-right">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export const LikedProductSkeleton = () => {
  return (
    <div className="flex h-full p-4 my-4 border rounded-xl animate-pulse">
      <div className="flex items-center w-full md:w-5/6">
        <div className="w-40 h-40 overflow-hidden bg-gray-200 min-w-40 min-h-40 rounded-xl md:w-32 md:h-32"></div>
        <div className="p-4">
          <div className="w-2/3 h-5 mt-2 mb-2 bg-gray-200 rounded"></div>
          <div className="w-full h-4 mb-2 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="hidden w-1/6 min-h-full md:flex ">
        <div className="flex items-center justify-center w-full h-full ">
          <div className="w-32 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
