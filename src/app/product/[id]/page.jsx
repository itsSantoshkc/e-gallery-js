"use client";
import { ProductImageSkeleton } from "@/components/Skeleton";
import { useSession } from "next-auth/react";
import React, { lazy, Suspense, useEffect, useState } from "react";

const ProductDetails = lazy(() => import("./productDetails"));
const ProductImage = lazy(() => import("./productImage"));

const Page = ({ params }) => {
  const [productDetails, setProductDetails] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/product/${params.id}`, {
        method: "GET",
      });
      const data = await response.json();
      setProductDetails(data);
    };
    fetchProduct();
  }, [params.id]);

  if (!productDetails) {
    return (
      <div className="flex items-start justify-center w-full min-h-screen px-4 py-10 md:px-10">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ProductImageSkeleton />
            <ProductImageSkeleton />
          </div>
          <div className="w-full bg-gray-100 h-96 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-screen px-4 py-10 md:px-10">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left — images */}
        <div className="flex flex-col gap-4">
          {productDetails.productImages?.map((image, idx) => (
            <Suspense key={idx} fallback={<ProductImageSkeleton />}>
              <ProductImage image={image} name={productDetails.name} />
            </Suspense>
          ))}
        </div>

        {/* Right — details, sticky on desktop */}
        <div className="md:sticky md:top-24 md:self-start">
          <Suspense
            fallback={
              <div className="w-full bg-gray-100 h-96 rounded-2xl animate-pulse" />
            }
          >
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
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
