import { order, order_product } from "@/schema/orderSchema";
import { randomUUID } from "crypto";
import { getItemsInCart } from "./cart";
import { db } from "@/db/db";
import { cart } from "@/schema/CartSchema";
import { eq } from "drizzle-orm";
import { product } from "@/schema/ProductSchema";
import { getProductFirstImage } from "./product";
export const insertNewOrder = async (userId, transaction_id) => {
  try {
    const orderId = randomUUID();
    const cartItems = await getItemsInCart(userId);
    let totalAmount = 0;

    cartItems.map((item) => {
      totalAmount += item.itemQuantity * item.itemPrice;
    });

    await db.transaction(async (tx) => {
      try {
        await tx.insert(order).values({
          id: orderId,
          orderedBy: userId,
          orderedAt: new Date(),
          orderedTotalAmount: totalAmount,
          transaction_id: transaction_id,
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

export const getUsersRecentOrders = async (userId) => {
  try {
    const recentOrders = await db
      .select()
      .from(order)
      .where(eq(order.orderedBy, userId));
    if (recentOrders.length <= 0) {
      return null;
    }
    return recentOrders;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductsFromRecentOrder = async (orderId) => {
  try {
    console.log(orderId);
    const products = await db
      .select({
        product_Id: product.id,
        name: product.name,
        description: product.description,
        unitPrice: product.price,
        orderedQuantity: order_product.ordered_quantity,
      })
      .from(order_product)
      .where(eq(order_product.order_id, orderId))
      .innerJoin(product, eq(product.id, order_product.product_id));
    if (products.length <= 0) {
      return null;
    }
    for (let i = 0; i < products.length; i++) {
      const { image } = await getProductFirstImage(products[i].product_Id);
      products[i] = {
        ...products[i],
        image,
      };
    }
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAdminRecentOrders = async (userId) => {
  try {
    const recentOrders = await db
      .select({
        product_Id: product.id,
        name: product.name,
        description: product.description,
        unitPrice: product.price,
        orderedQuantity: order_product.ordered_quantity,
        orderAt: order.orderedAt,
      })
      .from(order)
      .rightJoin(order_product, eq(order_product.order_id, order.id))
      .innerJoin(product, eq(product.id, order_product.product_id))
      .where(eq(product.OwnerId, userId));
    if (recentOrders.length <= 0) {
      return null;
    }
    for (let i = 0; i < recentOrders.length; i++) {
      const { image } = await getProductFirstImage(recentOrders[i].product_Id);
      recentOrders[i] = {
        ...recentOrders[i],
        image,
      };
    }

    return recentOrders;
  } catch (error) {
    console.log(error);
    return null;
  }
};
