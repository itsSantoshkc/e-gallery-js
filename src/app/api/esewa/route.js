import { getCartItemById, getItemsInCart } from "@/data/cart";
import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";

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
    const transactionId = uuidv4();
    const hash = createHmac("sha256", "8gBm/:&EnhH.1/q")
      .update(
        `total_amount=500,transaction_uuid=${transactionId},product_code=EPAYTEST`
      )
      .digest("base64");

    const formData = new FormData();
    formData.set("transaction_uuid", transactionId);

    formData.set(
      "failure_url",
      `${process.env.NEXT_PUBLIC_URL}checkout/payment/failure`
    );
    formData.set(
      "success_url",
      `${process.env.NEXT_PUBLIC_URL}checkout/payment/success`
    );
    formData.set("product_delivery_charge", "0");
    formData.set("product_service_charge", "0");
    formData.set("product_code", "EPAYTEST");
    formData.set("signature", hash);
    formData.set(
      "signed_field_names",
      "total_amount,transaction_uuid,product_code"
    );
    formData.set("tax_amount", "0");
    formData.set("total_amount", 500);
    formData.set("amount", 500);

    const initiatePayment = await fetch(
      "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
      {
        method: "post",
        body: formData,
      }
    );
    console.log(initiatePayment);
    if (initiatePayment.status === 200) {
      return Response.json({
        message: "Initiated Payment Successfully",
        url: initiatePayment.url,
        transaction_id: transactionId,
      });
    }
    return Response.json(
      {
        message: "Failed to initiate payment",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
