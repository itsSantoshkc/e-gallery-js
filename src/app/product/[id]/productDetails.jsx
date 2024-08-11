import { AddItemInCart } from "@/helper/addToCart";
import React, { Suspense, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { toast } from "sonner";
import { likePost } from "./action";

const ProductDetails = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const handleIncrementItemQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  };
  const handleDecrementItemQuantity = () => {
    if (itemQuantity !== 0) {
      return setItemQuantity(itemQuantity - 1);
    }
    return setItemQuantity(0);
  };

  const handleAddToCart = async () => {
    if (itemQuantity <= 0) {
      toast.error("Please! Select how many item you want to add on cart");
      return null;
    }
    const cartItemData = {
      userId: props.userId,
      itemQuantity: itemQuantity,
      itemPrice: props.price,
      productId: props.paramId,
    };
    try {
      const response = await AddItemInCart(cartItemData);
      toast.success("Item has been added successfully");
      return response;
    } catch (error) {
      toast.error("An Error Occurred!!");
    }
  };

  return (
    <div className="bg-white  border flex justify-start items-center group flex-col fixed rounded-t-2xl bottom-0 duration-500 transition-all translate-y-[90%]   hover:translate-y-0 md:w-2/3 lg:w-[70%] xl:w-3/5 2xl:w-3/5 w-[90%]">
      <div className="h-2 my-4 bg-black rounded-full cursor-pointer w-44 animate-bounce"></div>
      <div className="flex flex-col items-center justify-center h-full px-4 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between w-full ">
          <h1 className="w-3/4 mt-2 text-3xl font-bold lg:text-4xl lg:mt-4">
            {props.name}
          </h1>
          <div className="flex items-center justify-center w-1/4 h-full text-xl">
            <CiHeart
              onClick={() => likePost(props.userId, props.id, props.totalLikes)}
              className="text-2xl hover:cursor-pointer fill-red-500"
            />
            {/* <FaHeart className="text-2xl hover:cursor-pointer fill-red-500" /> */}
            <span className="ml-3 text-xl text-slate-500">
              {props.totalLikes}
            </span>
          </div>
        </div>
        <h2 className="w-full my-1 font-semibold lg:my-3 lg:text-xl text-stone-800">
          By : {props.OwnerName}
        </h2>
        <p className="my-2 text-justify xl:text-xl xl:my-4 ">
          {props.description}
        </p>
        <div className="w-full flex *:mr-2 *:p *:px-2 lg:my-4 my-2 *:border *:rounded-xl">
          {props.labels?.map((label, idx) => (
            <div key={idx}>{label}</div>
          ))}
        </div>
        <div className="flex items-center justify-between w-full my-6">
          <div className="*:mr-4">
            <span
              onClick={handleDecrementItemQuantity}
              className="p-1 px-4 text-2xl text-white transition-colors duration-300 border cursor-pointer bg-stone-500 hover:border-stone-400 border-stone-500 hover:bg-stone-400 rounded-xl"
            >
              -
            </span>
            <span className="p-1 px-2 text-2xl border-b ">{itemQuantity}</span>
            <span
              onClick={handleIncrementItemQuantity}
              className="p-1 px-4 text-2xl text-white border cursor-pointer rounded-xl bg-stone-500 hover:border-stone-400 border-stone-500 hover:bg-stone-400 "
            >
              +
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-4 text-xl text-white rounded-xl bg-stone-500 hover:bg-stone-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
