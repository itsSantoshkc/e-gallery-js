import { getItemsInCart } from "@/data/cart";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const POST = async (request) => {
  try {
    const { user_id } = await request.json();
    let totalAmount = 0;
    const cartItems = await getItemsInCart(user_id);
    if (cartItems === null || cartItems.length < 0) {
      return Response.json(
        {
          message: "Failed to initiate payment",
        },
        { status: 400 }
      );
    }
    cartItems.map((item) => {
      totalAmount += item.itemQuantity * item.itemPrice;
    });
    let priceArray = [];
    for (let i = 0; i < cartItems.length; i++) {
      let product = await stripe.products.create({
        name: cartItems[i].name,
      });
      let price = await stripe.prices.create({
        product: product.id,
        unit_amount: cartItems[i].price * 100,
        currency: "INR",
      });
      priceArray.push({
        price: price.id,
        quantity: cartItems[i].itemQuantity,
      });
    }
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: priceArray,
      mode: "payment",
      return_url: `http://localhost:3000/checkout/payment?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        userId: user_id,
      },
    });
    return Response.json({
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Internal Server Error",
    });
  }
};
export const GET = async (request) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      request.nextUrl.searchParams.get("session_id")
    );
    return Response.json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Internal Server Error",
    });
  }
};
