"use client";
import { CardSkeleton } from "@/components/Skeleton";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

const ImageComponent = lazy(() => import("@/components/GalleryImage"));

const Page = ({ params, ...props }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mainContainer = useRef(null);
  const productOwnerId = params.id;
  console.log(productOwnerId);

  const getProduct = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}product/user/api?ownerId=${productOwnerId}`,
      {
        method: "get",
      }
    );
    const responsData = await response.json();
    if (response.status !== 200) {
      setProductData([]);
      return setIsLoading(false);
    }

    setProductData(responsData);
    console.log(responsData);
    setIsLoading(false);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <main className="h-full ">
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="loader"></div>
          <h1 className="mt-3 font-bold text-stone-600">
            Please! wait for a while
          </h1>
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col items-center justify-center w-full">
          {productData !== null &&
          productData.length > 0 &&
          productData !== undefined &&
          productData[0].ownerName ? (
            <div className="flex justify-start w-full pl-4 mt-10 md:mt-0 lg:pl-0 lg:w-5/6">
              <h1 className="h-full my-3 text-xl font-semibold md:text-2xl md:my-10 lg:my-20 lg:text-3xl">
                Products of{" "}
                <span className="underline">
                  {productData[0].ownerName ?? ""}
                </span>
              </h1>
            </div>
          ) : (
            ""
          )}
          <div ref={mainContainer} className="flex justify-center w-full">
            <div className="grid w-full grid-cols-1 gap-6 m-6 md:grid-cols-2 lg:w-5/6 2xl:grid-cols-4">
              {productData !== null &&
                productData !== undefined &&
                productData?.map((product) => (
                  <div key={product.id} className="w-full *:rounded-xl h-96 ">
                    <Suspense fallback={<CardSkeleton />}>
                      <ImageComponent
                        description={product.description}
                        name={product.name}
                        image={product.image}
                        id={product.id}
                        price={product.price}
                        ownerName={product.ownerName}
                      />
                    </Suspense>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
