export const AddItemInCart = async (cartItem) => {
  const cartItemData = {
    userId: cartItem.userId,
    itemQuantity: cartItem.itemQuantity,
    itemPrice: cartItem.itemPrice,
  };
  const respose = await fetch(
    ```${process.env.NEXT_PUBLIC_URL}api/cart/${cartItem.productId}`,
    {
      method: "post",
      body: JSON.stringify(cartItemData),
    }
  );
  const responseData = await respose.json();
  return responseData;
};
