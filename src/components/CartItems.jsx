"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { HiMiniMinusCircle, HiMiniPlusCircle } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const CartItems = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(false);

  const handleIncrementItemQuantity = async () => {
    setLoading(true);
    await props.cartItemQuantity(props.productId, 1);
    setLoading(false);
  };
  const handleDecrementItemQuantity = async () => {
    setLoading(true);
    await props.cartItemQuantity(props.productId, -1);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="flex items-center h-32 py-5 justify-evenly">
          <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
        </div>
      )}
      {!loading && (
        <div className="flex items-center h-full py-5 justify-evenly">
          <div className="flex flex-col mx-2 ">
            <div className="h-full p-2 border rounded-lg ">
              <img
                className="object-fill w-16 h-16 "
                src={props.productImage}
              />
            </div>
            <span className="py-1 font-bold">
              $ {props.ProductPrice * props.itemQuantity}
            </span>
          </div>
          <div className="flex flex-col justify-center w-3/5 h-full x">
            <Link href={`http://localhost:3000/product/${props.productId}`}>
              <h3 className="mt-2 font-bold transition-colors duration-300 cursor-pointer hover:text-blue-400">
                {props.ProductName}
              </h3>
            </Link>
            <span className="flex items-center justify-start w-auto ">
              <span className="px-2 py-0.5 text-xs text-center bg-gray-300 border rounded-xl">
                By: {props.ownerName}
              </span>
            </span>

            <div className="flex items-center justify-between w-full mt-2 ">
              <div className="flex items-center w-1/2 rounded-2xl">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="w-full text-2xl font-bold text-center rounded-sm cursor-pointer "
                        onClick={handleDecrementItemQuantity}
                      >
                        <HiMiniMinusCircle className="w-full text-2xl font-bold text-center " />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Remove an Item</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="w-full text-xl text-center border-b">
                  {props.itemQuantity}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleIncrementItemQuantity}
                        className="w-full text-2xl font-bold text-center rounded-sm cursor-pointer "
                      >
                        <HiMiniPlusCircle className="w-full text-2xl font-bold text-center " />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Add an Item</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <MdDelete
                        onClick={() => props.cartItemDelete(props.productId)}
                        className="text-2xl text-red-600 cursor-pointer"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Delete Item</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
      <Separator />
    </>
  );
};

export default CartItems;
