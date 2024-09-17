import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { cart } from "@/schema/CartSchema";
import { getProductById } from "./product";

export const getCartItemById = async (productId) => {
  const cartItem = await db
    .select()
    .from(cart)
    .where(eq(cart.productId, productId))
    .limit(1);
  if (cartItem.length > 0) {
    return cartItem[0];
  }
  return null;
};

export const getItemsInCart = async (userId) => {
  try {
    const cartItems = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId));
    if (cartItems.length > 0) {
      let cartItemsArray = [];
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const productDetails = await getProductById(item.productId);
        const updateCartItem = { ...item, ...productDetails };
        cartItemsArray.push(updateCartItem);
      }
      console.log(cartItemsArray);
      return cartItemsArray;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const deleteCartItem = async (productId) => {
  try {
    await db.delete(cart).where(eq(cart.productId, productId));
  } catch (error) {
    return null;
  }
};

export const updateCartItemQuantity = async (productId, itemQuantity) => {
  try {
    const itemExistsInCart = await getCartItemById(productId);
    if (itemExistsInCart) {
      const newItemQuantity = itemExistsInCart.itemQuantity
        ? itemQuantity + itemExistsInCart.itemQuantity
        : itemQuantity;
      await db
        .update(cart)
        .set({ itemQuantity: newItemQuantity })
        .where(eq(cart.productId, productId));
      const updatedCartItem = await getCartItemById(productId);
      return updatedCartItem;
    }
  } catch (error) {
    return null;
  }
};

export const addItemsToCart = async (cartData) => {
  try {
    const itemExistsInCart = await getCartItemById(cartData.productId);
    if (itemExistsInCart) {
      updateCartItemQuantity(cartData.productId, cartData.itemQuantity);
      return;
    }
    await db.insert(cart).values({
      productId: cartData.productId,
      userId: cartData.userId,
      itemPrice: cartData.itemPrice,
      itemQuantity: cartData.itemQuantity,
    });
    return;
  } catch (error) {
    return null;
  }
};
