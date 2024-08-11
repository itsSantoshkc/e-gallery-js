"use client";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const GalleryImage = (props) => {
  const { data: session } = useSession();

  const userId = session?.user.id === undefined ? null : session?.user.id;

  const AddItemInCart = async () => {
    const cartItemData = {
      userId: userId,
      itemQuantity: 1,
      itemPrice: props.price,
    };
    const respose = await fetch("http://localhost:3000/api/cart/" + props.id, {
      method: "post",
      body: JSON.stringify(cartItemData),
    });
    const responseData = await respose.json();
    toast.success("Item has been added to cart");
    return responseData;
  };

  return (
    <div className="relative w-full h-full overflow-hidden cursor-pointer rounded-xl group ">
      <div className="w-full h-full ">
        <img
          className="object-cover w-full h-full transition-all duration-300 group-hover:bg-blend-multiply group-hover:blur-sm rounded-xl group-hover:scale-110 "
          src={props.image}
        />
      </div>
      <div className="absolute bottom-0 flex flex-col items-center justify-center w-full text-white transition-all duration-300 translate-y-full bg-black bg-opacity-50 border-0 opacity-0 rounded-xl h-1/2 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center w-full ">
          <Link href={`/product/${props.id}`}>
            <h1 className="flex items-center p-2 px-3 text-xl font-bold transition-colors duration-300 group-card hover:text-indigo-400 ">
              {props.name}
              <FaExternalLinkAlt className="mx-2 text-sm" />
            </h1>
          </Link>
        </div>
        <p className="p-2 px-3 text-sm text-justify">{props.description}</p>

        <div className="flex items-center justify-between w-full px-3">
          <h3 className="font-bold">By : {props.ownerName}</h3>
          <Button
            onClick={AddItemInCart}
            className=" bg-stone-500 hover:bg-stone-400"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
