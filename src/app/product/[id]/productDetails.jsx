import { AddItemInCart } from "@/helper/addToCart";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { toast } from "sonner";
import { dislikePost, getPostLiked, likePost } from "./actions";
import { useSession } from "next-auth/react";

const ProductDetails = ({
  id,
  name,
  description,
  price,
  OwnerId,
  availableQuantity,
  userId,
  paramId,
  OwnerName,
  labels,
  totalLikes,
}) => {
  const { data: session, status } = useSession();
  const [itemQuantity, setItemQuantity] = useState(0);
  const [postTotalLikes, setPostTotalLikes] = useState(0);
  const [postLiked, setPostLiked] = useState(false);

  const handleIncrementItemQuantity = async () => {
    setItemQuantity(itemQuantity + 1);
  };

  const handleDecrementItemQuantity = async () => {
    if (itemQuantity !== 0) {
      return setItemQuantity(itemQuantity - 1);
    }

    return setItemQuantity(0);
  };

  const handleLikePost = () => {
    if (status !== "authenticated") {
      return toast.error("Please Sign In to like the post");
    }
    const likeThePost = likePost(userId, id, totalLikes);
    if (likeThePost !== null) {
      totalLikes !== null ? setPostTotalLikes(() => totalLikes + 1) : "";
      setPostLiked(true);
    }
  };
  const handleDislikePost = () => {
    if (status !== "authenticated") {
      return;
    }
    const DislikeThePost = dislikePost(userId, id, totalLikes);

    if (DislikeThePost !== null) {
      totalLikes !== null ? setPostTotalLikes(() => totalLikes - 1) : "";
      setPostLiked(false);
    }
  };

  const handleAddToCart = async () => {
    if (status !== "authenticated") {
      return toast.error("Please! Login to add item in cart");
    }
    if (itemQuantity <= 0) {
      toast.error("Please! Select how many item you want to add on cart");
      return null;
    }
    const cartItemData = {
      userId: userId,
      itemQuantity: parseInt(itemQuantity),
      itemPrice: price,
      productId: paramId,
    };
    try {
      const response = await AddItemInCart(cartItemData);
      toast.success("Item has been added successfully");
      setItemQuantity(() => 0);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred!!");
    }
  };
  const isPostLiked = async () => {
    const postLiked = await getPostLiked(id, userId);
    setPostLiked(postLiked);
  };

  const handleItemQuantityInput = (e) => {
    if (parseInt(itemQuantity) > 100) {
      setItemQuantity(() => 99);
      return toast.error("Item in cart cannot be more than 100 at a time");
    }
    setItemQuantity(() => e.target.value);
  };

  useEffect(() => {
    isPostLiked();
    setPostTotalLikes(() => totalLikes);
  }, [totalLikes, status]);

  if (session === undefined || status == "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="loader "></div>
      </div>
    );
  }

  return (
    <div className="bg-white  border flex justify-start items-center group flex-col fixed rounded-t-2xl bottom-0 duration-500 transition-all translate-y-[90%]   hover:translate-y-0 md:w-2/3 lg:w-[70%] xl:w-3/5 2xl:w-3/5 w-[90%]">
      <div className="h-2 my-4 bg-black rounded-full cursor-pointer w-44 animate-bounce"></div>
      <div className="flex flex-col items-center justify-center h-full px-4 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between w-full ">
          <h1 className="w-3/4 mt-2 text-3xl font-bold lg:text-4xl lg:mt-4">
            {name}
          </h1>
          <div className="flex items-center justify-center w-1/4 h-full text-xl">
            {!postLiked ? (
              <CiHeart
                onClick={handleLikePost}
                className="text-2xl hover:cursor-pointer fill-red-500"
              />
            ) : (
              <FaHeart
                onClick={handleDislikePost}
                className="text-2xl hover:cursor-pointer fill-red-500"
              />
            )}
            <span className="ml-3 text-xl text-slate-500">
              {postTotalLikes}
            </span>
          </div>
        </div>
        <h2 className="w-full my-1 font-semibold text-slate-400 lg:my-3 lg:text-lg">
          By : {OwnerName}
        </h2>
        <h1 className="w-full text-xl font-semibold text-green-600">
          Rs. <span className="text-3xl font-bold">{price}</span>
        </h1>
        <p className="my-2 text-justify xl:text-xl xl:my-4 ">{description}</p>
        <div className="w-full flex *:mr-2 *:p *:px-2 lg:my-4 my-2  *:bg-red-500 font-semibold *:text-white *:rounded-xl">
          {labels?.map((label, idx) => (
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

            <input
              className="w-10 p-1 px-2 text-2xl border-b "
              value={itemQuantity}
              maxLength={2}
              onChange={handleItemQuantityInput}
            />
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
