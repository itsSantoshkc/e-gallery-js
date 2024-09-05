import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const Like = (props) => {
  const { data: session, status } = useSession();

  const AddItemInCart = async () => {
    const cartItemData = {
      userId: session.user.id,
      itemQuantity: 1,
      itemPrice: props.price,
    };
    const respose = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/cart/${props.id}`,
      {
        method: "post",
        body: JSON.stringify(cartItemData),
      }
    );
    const responseData = await respose.json();
    toast.success("Item has been added to cart");
    return responseData;
  };

  return (
    <div className="flex h-full p-4 my-4 border rounded-xl">
      <div className="flex items-center w-full lg:w-5/6">
        <Link href={`/product/${props.id}`}>
          <div className="w-40 h-40 overflow-hidden min-w-40 min-h-40 rounded-xl md:w-32 md:h-32">
            <img
              className="object-cover min-w-full min-h-full transition-all duration-300 cursor-pointer hover:rounded-xl hover:scale-110 rounded-xl"
              src={props.image}
              alt={props.title}
            />
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/product/${props.id}`}>
            <h1 className="text-xl font-bold transition-colors duration-300 cursor-pointer hover:text-indigo-400 md:text-2xl text-gray-950">
              {props.title}
            </h1>
          </Link>
          <p className="mt-2 text-sm text-justify text-gray-500 md:text-base">
            {props.description}
          </p>
        </div>
      </div>
      <div className="hidden w-1/6 min-h-full lg:flex ">
        <div className="flex items-center justify-center w-full h-full ">
          <Button onClick={() => AddItemInCart()}>Add To Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Like;
