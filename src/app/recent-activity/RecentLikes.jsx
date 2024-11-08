"use client";
import { LikedProductSkeleton } from "@/components/Skeleton";
import React, { lazy, Suspense, useEffect, useState } from "react";

const LikedProduct = lazy(() => import("./Like"));

const RecentLikes = ({ userId }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  const getUserLikedProduct = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/recentactivity/recentlikes`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    const responseData = await response.json();

    setLikedProducts(() => responseData);
  };

  useEffect(() => {
    getUserLikedProduct();
  }, []);

  return (
    <>
      <div className="p-5 py-10 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        <h1>Recent Likes</h1>
      </div>
      <div className="justify-center w-full h-full px-3 pb-5 my-8 md:mx-20 md:w-5/6 2xl:w-3/4 lg:mx-auto ">
        {likedProducts.length >= 0 &&
          likedProducts !== undefined &&
          likedProducts.map((product) => (
            <Suspense key={product.id} fallback={<LikedProductSkeleton />}>
              <LikedProduct
                title={product.name}
                id={product.id}
                description={product.description}
                image={product.image}
                price={product.price}
              />
            </Suspense>
          ))}
      </div>
    </>
  );
};

export default RecentLikes;
