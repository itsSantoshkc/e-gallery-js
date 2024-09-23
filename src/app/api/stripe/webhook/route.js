import { insertNewOrder } from "@/data/order";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const POST = async (request) => {
  try {
    const body = await request.text();
    const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY;
    const sig = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    const session = event.type.object;

    console.log(session);
    if (event.type === "payment_intent.succeeded") {
      //   insertNewOrder("67f9cecc-c18e-4fff-", "");
    }

    return Response.json(
      {
        clientSecret: event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Internal Server Error",
    });
  }
};
