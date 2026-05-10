"use client";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { toast } from "sonner";
import { dislikePost, getPostLiked, likePost } from "./actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AddItemInCart } from "@/helper/addToCart";

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
  const [itemQuantity, setItemQuantity] = useState(1);
  const [postTotalLikes, setPostTotalLikes] = useState(totalLikes ?? 0);
  const [postLiked, setPostLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setPostTotalLikes(totalLikes ?? 0);
    if (userId) {
      getPostLiked(id, userId).then(setPostLiked);
    }
  }, [totalLikes, status, id, userId]);

  const handleLikePost = () => {
    if (status !== "authenticated")
      return toast.error("Please sign in to like");
    likePost(userId, id, totalLikes);
    setPostTotalLikes((prev) => prev + 1);
    setPostLiked(true);
  };

  const handleDislikePost = () => {
    if (status !== "authenticated") return;
    dislikePost(userId, id, totalLikes);
    setPostTotalLikes((prev) => prev - 1);
    setPostLiked(false);
  };

  const handleAddToCart = async () => {
    if (status !== "authenticated")
      return toast.error("Please login to add items to cart");
    if (itemQuantity <= 0) return toast.error("Select at least 1 item");
    setIsAdding(true);
    try {
      await AddItemInCart({
        userId,
        itemQuantity: parseInt(itemQuantity),
        itemPrice: price,
        productId: paramId,
      });
      toast.success("Added to cart!");
      setItemQuantity(1);
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsAdding(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-5">
      {/* Title + Like */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
          {name}
        </h1>
        <button
          onClick={postLiked ? handleDislikePost : handleLikePost}
          className="flex items-center gap-1.5 shrink-0 mt-1"
          aria-label={postLiked ? "Unlike" : "Like"}
        >
          {postLiked ? (
            <FaHeart className="text-2xl text-red-500" />
          ) : (
            <FaHeart className="text-2xl text-gray-300 transition-colors hover:text-red-400" />
          )}
          <span className="text-sm text-gray-500">{postTotalLikes}</span>
        </button>
      </div>

      {/* Owner */}
      <Link
        href={`/product/user/${OwnerId}`}
        className="text-sm font-medium text-indigo-600 hover:underline"
      >
        By {OwnerName}
      </Link>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-medium text-gray-500">Rs.</span>
        <span className="text-4xl font-bold text-gray-900">{price}</span>
      </div>

      {/* Stock */}
      <p className="text-sm text-gray-500">
        {availableQuantity > 0 ? (
          <span className="font-medium text-green-600">
            {availableQuantity} in stock
          </span>
        ) : (
          <span className="font-medium text-red-500">Out of stock</span>
        )}
      </p>

      {/* Labels */}
      {labels?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {labels.map((label, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100 rounded-full bg-indigo-50"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="pt-4 text-sm leading-relaxed text-gray-600 border-t sm:text-base">
        {description}
      </p>

      {/* Quantity + Add to Cart */}
      <div className="flex flex-col items-stretch gap-3 pt-4 border-t sm:flex-row sm:items-center">
        {/* Quantity selector */}
        <div className="flex items-center overflow-hidden border border-gray-200 rounded-xl w-fit">
          <button
            onClick={() => setItemQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <FiMinus />
          </button>
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val > 0 && val <= 99) setItemQuantity(val);
            }}
            className="w-12 py-2 text-lg font-semibold text-center border-gray-200 border-x focus:outline-none"
          />
          <button
            onClick={() => setItemQuantity((q) => Math.min(99, q + 1))}
            className="px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <FiPlus />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || availableQuantity <= 0}
          className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-stone-400 hover:bg-stone-500 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiShoppingBag className="text-lg" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
