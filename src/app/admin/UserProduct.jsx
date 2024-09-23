"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import Product from "./Product";

const UserProduct = (props) => {
  const [productData, setProductData] = useState([]);
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const getProducts = async () => {
    if (userId) {
      const response = await fetch(`http://localhost:3000/api/admin/product`, {
        method: "post",
        body: JSON.stringify({
          user_Id: userId,
        }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        setProductData(responseData.data);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [userId]);

  console.log(productData);
  return (
    <div className="flex  justify-center  max-w-full max-h-[88%]">
      <div className="max-w-full max-h-full">
        <div className="w-full h-full ">
          <ScrollArea className="h-[390px] space-y-0">
            <ul className="flex flex-col items-center bg-white  justify-center   *:text-xl">
              {productData.length >= 0 &&
                productData !== undefined &&
                productData !== null &&
                productData.map((product, idx) => (
                  <li key={idx} className="px-4 ">
                    <Product
                      title={product.name}
                      id={product.id}
                      description={product.description}
                      image={product.image}
                      price={product.price}
                      userId={userId}
                      orderDate={product.createdAt}
                    />
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default UserProduct;
