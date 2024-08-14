"use server";

import { db } from "@/db/db";
import { product, product_userLiked } from "@/schema/ProductSchema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function likePost(userID, productID, totalLikes) {
  try {
    const userLiked = await db
      .select()
      .from(product_userLiked)
      .where(
        and(
          eq(product_userLiked.productId, productID),
          eq(product_userLiked.userId, userID)
        )
      )
      .limit(1);
    if (userLiked.length <= 0) {
      await db
        .update(product)
        .set({ totalLikes: totalLikes + 1 })
        .where(eq(product.id, productID));
      await db.insert(product_userLiked).values({
        productId: productID,
        userId: userID,
        likedAt: new Date(),
      });
    }

    revalidatePath(`/product/${productID}`);
  } catch (error) {
    return null;
  }
}
export async function dislikePost(userID, productID, totalLikes) {
  try {
    const userLiked = await db
      .select()
      .from(product_userLiked)
      .where(
        and(
          eq(product_userLiked.productId, productID),
          eq(product_userLiked.userId, userID)
        )
      )
      .limit(1);
    if (userLiked.length > 0) {
      await db
        .update(product)
        .set({ totalLikes: totalLikes - 1 })
        .where(eq(product.id, productID));
      await db
        .delete(product_userLiked)
        .where(
          and(
            eq(product_userLiked.productId, productID),
            eq(product_userLiked.userId, userID)
          )
        );
    }

    revalidatePath(`/product/${productID}`);
  } catch (error) {
    return null;
  }
}

export const getPostLiked = async (productId, userId) => {
  console.log(userId);
  const responseData = await db
    .select()
    .from(product_userLiked)
    .where(
      and(
        eq(product_userLiked.productId, productId),
        eq(product_userLiked.userId, userId)
      )
    );
  if (responseData[0]) {
    return true;
  }
  return false;
};
