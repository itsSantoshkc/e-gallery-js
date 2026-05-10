"use client";
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CardSkeleton } from "@/components/Skeleton";
import { useSession } from "next-auth/react";

const ImageComponent = lazy(() => import("@/components/GalleryImage"));

const Product = ({ sort, filter }) => {
  const [productData, setProductData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const mainContainer = useRef(null);
  const { data: session } = useSession();

  const getProduct = useCallback(async () => {
    const uid = session?.user?.id ?? null;
    const response = await fetch(`/api/product`, { method: "GET" });
    const data = await response.json();
    setOriginalData(data);
    setProductData(data);
  }, [session?.user?.id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  useEffect(() => {
    if (!originalData.length) return;

    const sorted = [...originalData];

    if (sort === "price") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === "A-Z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "likes") {
      sorted.sort((a, b) => b.totalLikes - a.totalLikes);
    }

    setProductData(sorted);
  }, [sort, originalData]);

  console.log(filter);
  const displayData = filter
    ? productData.filter((product) => product.label === filter)
    : productData;
  return (
    <div ref={mainContainer} className="flex justify-center w-full">
      {displayData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full gap-3 text-gray-400 h-96">
          <h2 className="text-xl font-semibold">No products available</h2>
          <p className="text-sm">Check back later or try a different filter</p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 m-6 md:grid-cols-2 lg:w-5/6 lg:grid-cols-3 2xl:grid-cols-4">
          {displayData?.map((product) => (
            <div key={product.id} className="w-full h-96">
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
      )}
    </div>
  );
};

export default Product;
