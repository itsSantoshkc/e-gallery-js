"use client";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CardSkeleton } from "@/components/Skeleton";
import { useSession } from "next-auth/react";

const ImageComponent = lazy(() => import("@/components/GalleryImage"));

const Product = ({ sort, filter }) => {
  const [productData, setProductData] = useState([]);
  const mainContainer = useRef(null);
  const { data: session } = useSession();
  const getProduct = async () => {
    if (session?.user.id === null) {
      const response = await fetch("/api/product", {
        method: "get",
      });
      const responsData = await response.json();
      setProductData(responsData);
    }
    const response = await fetch(
      `/api/product/?uid=${session?.user.id}&filter=${filter}&sort=${sort}`,
      {
        method: "get",
      }
    );
    const responsData = await response.json();
    setProductData(responsData);
  };

  useEffect(() => {
    getProduct();
  }, [filter]);

  if (sort === "price") {
    if (productData.length > 0) {
      productData.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }
  if (sort === "A-Z") {
    if (productData.length > 0) {
      productData.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
  }

  if (sort === "likes") {
    if (productData.length > 0) {
      productData.sort((a, b) => {
        return b.totalLikes - a.totalLikes;
      });
    }
  }

  return (
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
  );
};

export default Product;
