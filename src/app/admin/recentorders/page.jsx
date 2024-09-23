"use client";
import { LikedProductSkeleton } from "@/components/Skeleton";
import React, { Suspense, useEffect, useState } from "react";
import Order from "./order";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react";

const page = () => {
  const [productData, setProductData] = useState([]);
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const getProducts = async () => {
    if (userId) {
      const response = await fetch(`http://localhost:3000/api/admin/product`, {
        method: "post",
        body: JSON.stringify({
          user_Id: userId,
        }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        setProductData(responseData.data);
        console.log(responseData);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [userId]);

  if (session === undefined || status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 py-10 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        <h1>Recent Orders</h1>
      </div>
      <div className="justify-center w-full h-full px-3 pb-5 my-8 md:mx-20 md:w-5/6 2xl:w-2/4 lg:mx-auto ">
        <div className="flex items-center font-bold whitespace-nowrap">
          <Link
            href={"/admin"}
            className="flex items-center w-auto transition-colors duration-300 hover:text-indigo-600"
          >
            <IoIosArrowBack className="cursor-pointer" />
            <h1 className="cursor-pointer">Back To Admin</h1>
          </Link>
        </div>
        {productData.length >= 0 &&
          productData !== undefined &&
          productData !== null &&
          productData.map((product, idx) => (
            <Suspense fallback={<LikedProductSkeleton />} key={idx}>
              <Order
                title={product.name}
                id={product.product_Id}
                description={product.description}
                image={product.image}
                price={product.unitPrice}
                quantity={product.orderedQuantity}
                orderDate={product.orderAt}
              />
            </Suspense>
          ))}
      </div>
    </>
  );
};

export default page;
