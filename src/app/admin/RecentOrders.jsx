"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Order from "./Order";

const RecentOrders = (props) => {
  const [recentOrders, setRecentOrders] = useState([]);
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const getUserRecentOrders = async () => {
    if (userId) {
      const response = await fetch(`http://localhost:3000/api/admin/order`, {
        method: "post",
        body: JSON.stringify({
          user_Id: userId,
        }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        setRecentOrders(responseData.data);
      }
    }
  };
  useEffect(() => {
    getUserRecentOrders();
  }, [userId]);
  return (
    <div className="flex  justify-center  max-w-full max-h-[88%]">
      <div className="max-w-full max-h-full">
        <div className="w-full h-full ">
          <ScrollArea className="h-[390px] space-y-0">
            <ul className="flex flex-col items-center bg-white  justify-center   *:text-xl">
              {recentOrders.length >= 0 &&
                recentOrders !== undefined &&
                recentOrders !== null &&
                recentOrders.map((product, idx) => (
                  <li key={idx} className="px-4 ">
                    <Order
                      title={product.name}
                      id={product.product_Id}
                      description={product.description}
                      image={product.image}
                      price={product.unitPrice}
                      quantity={product.orderedQuantity}
                      orderDate={product.orderAt}
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

export default RecentOrders;
