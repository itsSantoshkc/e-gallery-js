"use client";
import React, { Suspense, useEffect, useState } from "react";
import Product from "./Product";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { LikedProductSkeleton } from "@/components/Skeleton";
import { useSession } from "next-auth/react";

const page = () => {
  const [productData, setProductData] = useState([]);
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const getProducts = async () => {
    if (userId) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/admin/product`,
        {
          method: "post",
          body: JSON.stringify({
            user_Id: userId,
          }),
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setProductData(responseData.data);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [userId]);
  return (
    <>
      <div className="p-5 py-10 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        <h1>Manage your products</h1>
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
          productData.map((product) => (
            <Suspense fallback={<LikedProductSkeleton />} key={product.id}>
              <Product
                title={product.name}
                id={product.id}
                description={product.description}
                image={product.image}
                price={product.price}
                userId={userId}
              />
            </Suspense>
          ))}
      </div>
    </>
  );
};

export default page;
