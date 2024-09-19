import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const POST = async (request) => {
  try {
    const body = await request.text();
    const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY;
    const sig = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (event.type === "payment_intent.succeeded") {
      insertNewOrder("67f9cecc-c18e-4fff-b775-d431f1bfbf38");
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
