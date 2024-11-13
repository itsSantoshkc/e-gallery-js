import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React, { useState } from "react";
import { HiMiniMinusCircle, HiMiniPlusCircle } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

const CheckoutItems = (props) => {
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
        <TableRow className="text-center text-[11px]  bg-stone-300 hover:bg-stone-300 md:text-base">
          <TableCell colSpan={5}>
            <div className="flex items-center justify-center w-full h-32 py-5 bg-stone-300">
              <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
            </div>
          </TableCell>
        </TableRow>
      )}
      {!loading && (
        <TableRow className="text-center text-[11px]  bg-stone-300 hover:bg-stone-300 md:text-base">
          <TableCell colSpan={2} className="font-medium md:text-center ">
            <div className="flex items-center w-full">
              <img className="w-24 h-28 rounded-xl" src={props.image} />
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}product/${props.productId}`}
              >
                <h1 className="ml-3 text-base transition-colors duration-300 cursor-pointer lg:text-xl hover:text-blue-400">
                  {" "}
                  - {props.name}
                </h1>
              </Link>
            </div>
          </TableCell>

          <TableCell
            colSpan={1}
            className="text-sm font-semibold md:text-base lg:text-xl"
          >
            Rs. {props.totalAmount}
          </TableCell>
          <TableCell colSpan={1} className="text-center ">
            <div className="flex items-center justify-center ">
              <div className="flex items-center justify-center w-3/4 text-xl xl:w-1/3">
                <button
                  onClick={handleIncrementItemQuantity}
                  className="w-full mx-1 text-2xl font-bold text-center rounded-sm cursor-pointer lg:mx-0 "
                >
                  <HiMiniPlusCircle className="w-full text-2xl font-bold text-center " />
                </button>

                {props.itemQuantity}

                <button
                  onClick={handleDecrementItemQuantity}
                  className="w-full mx-1 text-2xl font-bold text-center rounded-sm cursor-pointer lg:mx-0 "
                >
                  <HiMiniMinusCircle className="w-full text-2xl font-bold text-center " />
                </button>
              </div>
            </div>
          </TableCell>
          <TableCell
            colSpan={1}
            className="text-2xl text-center text-red-500 md:text-right"
          >
            <MdDelete
              onClick={() => props.cartItemDelete(props.productId)}
              className="cursor-pointer"
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CheckoutItems;
