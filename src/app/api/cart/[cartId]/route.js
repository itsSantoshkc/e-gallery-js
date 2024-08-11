import {
  addItemsToCart,
  deleteCartItem,
  getCartItemById,
  updateCartItemQuantity,
} from "@/data/cart";

export async function POST(request, { params }) {
  const productId = params.cartId;
  const { userId, itemQuantity, itemPrice } = await request.json();
  const cartData = {
    productId: productId,
    userId: userId,
    itemQuantity: itemQuantity,
    itemPrice: itemPrice,
  };
  const product = await addItemsToCart(cartData);
  if (product === null) {
    return Response.json({ message: "Failed to add product to the cart" });
  }
  return Response.json({ message: "Order has been placed successfully" });
}

export async function PATCH(request, { params }) {
  const productId = params.cartId;
  const { itemQuantity } = await request.json();
  const cartItemQuantity = await getCartItemById(productId);
  if (
    cartItemQuantity?.itemQuantity !== null &&
    cartItemQuantity?.itemQuantity !== undefined &&
    cartItemQuantity?.itemQuantity <= 1 &&
    itemQuantity === -1
  ) {
    await deleteCartItem(productId);
    return Response.json({ message: "Item removed from cart" });
  }
  const product = await updateCartItemQuantity(productId, itemQuantity);
  if (product === null) {
    return Response.json({ message: "Failed to add new product to the cart" });
  }
  return Response.json(product, { status: 200 });
}
export async function DELETE(request, { params }) {
  const productId = params.cartId;
  console.log(productId);
  const product = await deleteCartItem(productId);
  if (product === null) {
    return Response.json({ message: "Failed to add new product to the cart" });
  }
  return Response.json(
    { message: "Cart Item has been deleted" },
    { status: 200 }
  );
}
