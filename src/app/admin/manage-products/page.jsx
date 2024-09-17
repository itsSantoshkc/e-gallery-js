import React, { Suspense } from "react";
import Product from "./Product";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { LikedProductSkeleton } from "@/components/Skeleton";

const page = () => {
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
        {/* {likedProducts.length >= 0 &&
  likedProducts !== undefined &&
  likedProducts.map((product) => ( */}
        <Suspense fallback={<LikedProductSkeleton />}>
          <Product
            title={"yo"}
            id={"123"}
            description={
              "loremsd sadsi dnsaodnsaodn asofnasopdf hasofnodaspfoafjnapofnapofnapofnaoj dnfoo ojfopajfo piajfoa"
            }
            image={
              "https://images.unsplash.com/photo-1724742570188-2a2d193db764?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </Suspense>
      </div>
    </>
  );
};

export default page;
