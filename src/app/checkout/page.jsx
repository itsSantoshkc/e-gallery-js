"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useSession } from "next-auth/react";
import { CheckoutItemSkeleton } from "@/components/Skeleton";
import { toast } from "sonner";
import EsewaPayment from "./EsewaPayment";
import StripePayment from "./StripePayment";

const CheckoutItems = lazy(() => import("@/app/checkout/checkoutItems"));

const Page = (props) => {
  const { data: session } = useSession();
  const [cartItems, setcartItems] = useState([]);

  const [loading, setLoading] = useState(true);
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
      setLoading(false);
      return setcartItems(() => responseData);
    }
    setLoading(false);
    return setcartItems([]);
  };

  useEffect(() => {
    getCartItems();
  }, [userId]);

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    total += item.itemPrice * item.itemQuantity;
  }

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/cart/${productId}`,
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
    return toast.error(message);
  };

  if (session === undefined) {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="loader "></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full my-10">
        <h1 className="my-5 text-3xl font-bold text-center">Checkout Page</h1>
        <div className="flex items-center justify-center w-full px-2 pt-5 md:w-5/6 md:px-5 lg:px-7">
          <Table className="w-full text-xs sm:text-sm md:text-lg ">
            <TableHeader>
              <TableRow className="hover:bg-stone-600   bg-stone-600 *:hover:bg-stone-500 *:cursor-pointer *:text-white *:font-bold">
                <TableHead colSpan={2} className="text-center md:text-left">
                  Product
                </TableHead>

                <TableHead colSpan={1} className="text-center ">
                  Price
                </TableHead>
                <TableHead colSpan={1} className="text-center ">
                  Quantity
                </TableHead>
                <TableHead
                  colSpan={1}
                  className="text-center md:text-right "
                ></TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-[50vh] bg-stone-300 hover:bg-stone-300 "
                  >
                    <div className="flex items-center flex-col h-[50vh] py-5 justify-center">
                      <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
                      <h1 className="mt-4 font-bold text-stone-600">
                        Please! Wait for a while
                      </h1>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {cartItems.length >= 0 &&
                  cartItems?.map((item) => (
                    <Suspense
                      fallback={<CheckoutItemSkeleton />}
                      key={item.productId}
                    >
                      <CheckoutItems
                        productId={item.productId}
                        cartItemQuantity={handleCartItemQuantity}
                        cartItemDelete={handleCartItemDelete}
                        image={item.productImages[0]}
                        totalAmount={item.itemQuantity * item.itemPrice}
                        name={item.name}
                        itemQuantity={item.itemQuantity}
                      />
                    </Suspense>
                  ))}
                {!loading &&
                  (cartItems.length === undefined || cartItems.length <= 0) && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-[50vh] bg-stone-300 hover:bg-stone-300 "
                      >
                        <h1 className="font-bold flex w-full justify-center items-center *:mx-3 text-stone-500 text-2xl">
                          Cart is empty
                          <MdRemoveShoppingCart />
                        </h1>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            )}
            <TableFooter className="bg-stone-600 ">
              {cartItems.length !== undefined && cartItems.length >= 0 && (
                <TableRow className="rounded-b-full hover:bg-stone-600">
                  <TableCell
                    colSpan={2}
                    className="font-bold text-left text-white"
                  >
                    <h1 className="px-5 md:px-0">Total</h1>
                  </TableCell>

                  <TableCell
                    colSpan={1}
                    className="p-2 font-bold text-center text-white"
                  >
                    Rs. {total}
                  </TableCell>
                  {/* <TableCell colSpan={1} className="text-right">
                    <EsewaPayment userId={userId} />
                  </TableCell> */}
                  {/* <TableCell colSpan={2} className="text-right ">
                    <Payment userId={userId} />
                  </TableCell> */}
                  <TableCell colSpan={2} className="text-right ">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="w-3/4 p-2 font-semibold transition-colors duration-300 md:text-lg rounded-xl text-stone-600 hover:text-white bg-stone-300 hover:bg-stone-400">
                          Payment
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              Payment
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Please select your preferred payment method.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid items-center w-full grid-cols-1 gap-4 ">
                              <EsewaPayment userId={userId} />
                            </div>
                            <h2 className="font-semibold text-center text-stone-600">
                              or
                            </h2>
                            <div className="grid items-center grid-cols-1 gap-4">
                              <StripePayment userId={userId} />
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              )}
              {(cartItems.length === undefined || cartItems.length <= 0) && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className=" bg-stone-600 hover:bg-stone-600"
                  ></TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
