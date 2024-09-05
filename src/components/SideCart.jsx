"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoCartOutline } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { CartItemSkeleton } from "./Skeleton";
import { MdRemoveShoppingCart } from "react-icons/md";

const CartItems = lazy(() => import("@/components/CartItems"));

const SideCart = (props) => {
  const { data: session } = useSession();
  const [cartItems, setcartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = session?.user.id;
  const getCartItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/cart`, {
      method: "post",
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return setcartItems(() => responseData);
    }
    return setcartItems([]);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleCartItemDelete = async (productId) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/cart/${productId}`,
      {
        method: "delete",
      }
    );
    const { message } = await response.json();
    if (response.status === 200) {
      await getCartItems();
      setLoading(false);
      return toast.success(message);
    }
    setLoading(false);
    return toast.error(message);
  };

  const handleCartItemQuantity = async (productId, itemQuantity) => {
    // setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/cart/${productId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          itemQuantity: itemQuantity,
        }),
      }
    );
    if (response.status === 200) {
      await getCartItems();
      return setLoading(false);
    }
    const { message } = await response.json();
    setLoading(false);
    return toast.error(message);
  };
  return (
    <Sheet key={"right"}>
      <SheetTrigger>
        <IoCartOutline
          onClick={getCartItems}
          className="h-7 w-7 md:h-9 md:w-9 md:mr-6 "
        />
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="w-full z-[999] gap-0 p-0 m-0 flex flex-col  overflow-y-hidden h-[100vh]"
      >
        <SheetHeader className="h-[7dvh] md:h-[10dvh]   border-b flex justify-center items-center ">
          <SheetTitle className="text-2xl">Items In Your Cart...</SheetTitle>
        </SheetHeader>

        {!loading && (
          <ScrollArea className="h-[70dvh]  md:h-[75vh]">
            {cartItems.length >= 0 &&
              cartItems.map((item) => (
                <Suspense fallback={<CartItemSkeleton />} key={item.productId}>
                  <CartItems
                    productId={item.productId}
                    ProductName={item.name}
                    ProductPrice={item.itemPrice}
                    productImage={item.productImages[0]}
                    itemQuantity={item.itemQuantity}
                    ownerName={item.ownerName}
                    cartItemDelete={handleCartItemDelete}
                    cartItemQuantity={handleCartItemQuantity}
                  />
                </Suspense>
              ))}
            {(cartItems.length === undefined || cartItems.length <= 0) && (
              <div className=" h-[70dvh]  md:h-[75vh] w-full flex justify-center items-center">
                <h1 className="flex-bold flex items-center *:mx-3 text-stone-500 text-2xl">
                  Cart is empty
                  <MdRemoveShoppingCart />
                </h1>
              </div>
            )}
          </ScrollArea>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="loader"></div>
            <h1 className="mt-4 flex-semibold text-stone-500">
              Please! wait while cart is loading
            </h1>
          </div>
        )}
        <SheetFooter className="w-full">
          <div className="flex h-[10dvh] border-t md:h-[15vh] flex-col items-center justify-around w-full">
            <Link href={"/checkout"}>
              <Button className="h-10 p-4 bg-stone-500 hover:bg-stone-400 md:mb-2 md:h-10 ">
                Proceed To Checkout
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideCart;
