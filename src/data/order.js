import { order, order_product } from "@/schema/orderSchema";
import { randomUUID } from "crypto";
import { getItemsInCart } from "./cart";
import { db } from "@/db/db";
import { cart } from "@/schema/CartSchema";
import { ConsoleLogWriter } from "drizzle-orm";
//Insernewrder ma nai inserneworderproduct ko function for loop ma chalauney ani kei gari error aayo vane tyo order table delete garney
export const insertNewOrder = async (userId, totalAmount) => {
  try {
    const orderId = randomUUID();
    const cartItems = await getItemsInCart(userId);

    await db.transaction(async (tx) => {
      try {
        await tx.insert(order).values({
          id: orderId,
          orderedBy: userId,
          orderedAt: new Date(),
          orderedTotalAmount: totalAmount,
        });
        await tx.transaction(async (tx2) => {
          for (let i = 0; i < cartItems.length; i++) {
            await tx2.insert(order_product).values({
              order_id: orderId,
              product_id: cartItems[i].productId,
              ordered_quantity: cartItems[i].itemQuantity,
            });
          }
        });
        await tx.delete(cart).where(eq(cart.userId, userId));
      } catch (error) {
        console.log(error);
        tx.rollback();
      }
    });

    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const insertNewOrderProduct = async (order) => {
  try {
    for (let i = 0; i < order.length; i++) {
      await db.insert(order_product).values({
        order_id: order.id,
        product_id: order.product_id,
        ordered_quantity: order.quantity,
      });
    }
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};
