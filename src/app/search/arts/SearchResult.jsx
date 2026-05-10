"use client";

import { CardSkeleton } from "@/components/Skeleton";
import { useSearchParams } from "next/navigation";
import React, { lazy, useEffect, useRef, useState } from "react";

const ImageComponent = lazy(() => import("@/components/GalleryImage"));

const SearchResults = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const mainContainer = useRef(null);
  const searchParams = useSearchParams();

  const search = searchParams.get("s") || "";

  useEffect(() => {
    const getProduct = async () => {
      if (!search) return;

      setIsLoading(true);

      try {
        const response = await fetch(`/search/arts/api?s=${search}`);

        const data = await response.json();

        if (!response.ok) {
          setProductData([]);
        } else {
          setProductData(data);
        }
      } catch (err) {
        setProductData([]);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [search]);

  if (!search) {
    return (
      <div className="flex items-center justify-center min-w-full h-[95vh]">
        <h1>No search query provided</h1>
      </div>
    );
  }

  return (
    <main className="h-full">
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="loader"></div>
          <h1 className="mt-3 font-bold text-stone-600">
            Please wait for a while
          </h1>
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-start w-full pl-4 lg:w-5/6">
            <h1 className="my-3 text-xl font-semibold lg:text-3xl">
              Results for <span className="underline">{search}</span>
            </h1>
          </div>

          <div ref={mainContainer} className="flex justify-center w-full">
            <div className="grid w-full grid-cols-1 gap-6 m-6 md:grid-cols-2 lg:w-5/6 2xl:grid-cols-4">
              {productData?.map((product) => (
                <div key={product.id} className="w-full *:rounded-xl h-96">
                  <React.Suspense fallback={<CardSkeleton />}>
                    <ImageComponent
                      description={product.description}
                      name={product.name}
                      image={product.image}
                      id={product.id}
                      price={product.price}
                      ownerName={product.ownerName}
                    />
                  </React.Suspense>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SearchResults;
