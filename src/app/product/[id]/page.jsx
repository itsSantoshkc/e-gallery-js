"use client";
import { useSession } from "next-auth/react";
import React, { lazy, Suspense, useEffect, useState } from "react";
// import ProductDetails from "./productDetails";

const ProductDetails = lazy(() => import("./productDetails"));

const page = ({ params }) => {
  const [productDetails, setProductDetails] = useState([]);

  const { data: session } = useSession();
  const userId = session?.user.id === undefined ? null : session?.user.id;

  const product = async () => {
    const response = await fetch(
      "http://localhost:3000/api/product/" + params.id,
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
    <Suspense fallback={<h1>Loading</h1>}>
      {productDetails !== null && (
        <div className="relative flex items-center justify-center overflow-hidden">
          <div className=" md:w-[80%]  xl:w-3/4 flex  flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center ">
              {productDetails.productImages !== null &&
                productDetails.productImages !== undefined &&
                productDetails.productImages?.map((image) => (
                  <img
                    key={image}
                    className="w-screen max-h-screen"
                    src={image}
                  />
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
    </Suspense>
  );
};

export default page;
