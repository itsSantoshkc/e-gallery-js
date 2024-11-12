"use client";
import { ProductImageSkeleton } from "@/components/Skeleton";
import { useSession } from "next-auth/react";
import React, { lazy, Suspense, useEffect, useState } from "react";

const ProductDetails = lazy(() => import("./productDetails"));

const ProductImage = lazy(() => import("./productImage"));

const Page = ({ params }) => {
  const [productDetails, setProductDetails] = useState([]);

  const { data: session } = useSession();
  const userId = session?.user.id === undefined ? null : session?.user.id;

  const product = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/product/${params.id}`,
      {
        method: "get",
      }
    );
    setProductDetails(await response.json());
  };

  useEffect(() => {
    product();
  }, []);

  return (
    <>
      {productDetails !== null && (
        <div className="relative flex items-center justify-center overflow-hidden">
          <div className=" md:w-[80%]  xl:w-3/4 flex  flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-5 px-5 md:gap-0 md:px-0 ">
              {productDetails.productImages !== null &&
                productDetails.productImages !== undefined &&
                productDetails.productImages?.map((image, idx) => (
                  <Suspense key={idx} fallback={<ProductImageSkeleton />}>
                    <ProductImage image={image} />
                  </Suspense>
                ))}
            </div>
            <ProductDetails
              id={productDetails.id}
              name={productDetails.name}
              description={productDetails.description}
              price={productDetails.price}
              OwnerId={productDetails.OwnerId}
              availableQuantity={productDetails.availableQuantity}
              userId={userId}
              paramId={params.id}
              OwnerName={productDetails.ownerName}
              labels={productDetails.labels}
              totalLikes={productDetails.totalLikes}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
