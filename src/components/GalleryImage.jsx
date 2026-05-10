"use client";
import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Image from "next/image";

const GalleryImage = (props) => {
  const { data: session } = useSession();
  const [isAdding, setIsAdding] = useState(false);

  const userId = session?.user?.id ?? null;

  const AddItemInCart = async () => {
    setIsAdding(true);
    try {
      const cartItemData = {
        userId,
        itemQuantity: 1,
        itemPrice: props.price,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/cart/${props.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItemData),
        },
      );
      await response.json();
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative w-full h-full min-h-[280px] sm:min-h-[320px] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100">
      {/* Image */}
      <Image
        src={props.image}
        alt={props.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 rounded-2xl" />

      {/* Price badge */}
      <div className="absolute px-2 py-1 text-xs font-bold text-gray-900 rounded-full shadow top-3 right-3 bg-white/90 backdrop-blur-sm">
        Rs. {props.price}
      </div>

      {/* Content panel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        {/* Title */}
        <Link href={`/product/${props.id}`}>
          <h2 className="flex items-center gap-2 mb-1 text-base font-bold leading-tight text-white transition-colors sm:text-lg hover:text-indigo-300">
            {props.name}
            <FaExternalLinkAlt className="text-xs shrink-0" />
          </h2>
        </Link>

        {/* Description */}
        <p className="mb-3 text-xs text-white/70 sm:text-sm line-clamp-2">
          {props.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium truncate text-white/80">
            By{" "}
            <span className="font-semibold text-white">{props.ownerName}</span>
          </p>
          <button
            onClick={AddItemInCart}
            disabled={isAdding}
            className="flex items-center gap-1.5 bg-white text-gray-900 hover:bg-indigo-500 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
          >
            <FiShoppingBag className="text-sm" />
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
