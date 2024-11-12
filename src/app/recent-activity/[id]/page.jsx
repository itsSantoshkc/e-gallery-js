"use client";
import { LikedProductSkeleton } from "@/components/Skeleton";
import Link from "next/link";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const OrderProduct = lazy(() => import("./Orders"));

const Page = ({ params }) => {
  const [orderData, setOrderData] = useState([]);

  const getOrderData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/order/${params.id}`
    );
    const responseData = await response.json();

    setOrderData(() => responseData);
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <>
      <div className="p-5 py-10 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        <h1>Order</h1>
      </div>

      <div className="justify-center w-full h-full px-3 pb-5 my-8 md:mx-20 md:w-5/6 2xl:w-3/4 lg:mx-auto ">
        <div className="flex items-center font-bold whitespace-nowrap">
          <Link
            href={"/recent-activity"}
            className="flex items-center w-auto transition-colors duration-300 hover:text-indigo-600"
          >
            <IoIosArrowBack className="cursor-pointer" />
            <h1 className="cursor-pointer">Back To Your Recent Orders</h1>
          </Link>
        </div>
        {orderData.length >= 0 &&
          orderData !== undefined &&
          orderData.map((product) => (
            <Suspense
              key={product.product_Id}
              fallback={<LikedProductSkeleton />}
            >
              <OrderProduct
                title={product.name}
                id={product.product_Id}
                description={product.description}
                image={product.image}
                price={product.unitPrice}
                quantity={product.orderedQuantity}
              />
            </Suspense>
          ))}
      </div>
    </>
  );
};

export default Page;
