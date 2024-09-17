import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (request) => {
  try {
    const products = await request.json();
    let priceArray = [];

    for (let i = 0; i < products.length; i++) {
      let product = await stripe.products.create({
        name: products[i].name,
      });
      let price = await stripe.prices.create({
        product: product.id,
        unit_amount: products[i].price,
        currency: "usd",
      });
      priceArray.push({
        price: price.id,
        quantity: products[i].itemQuantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: priceArray,
      mode: "payment",
      return_url: `http://localhost:3000/checkout/payment?session_id={CHECKOUT_SESSION_ID}`,
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
