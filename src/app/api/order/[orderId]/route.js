import { getProductsFromRecentOrder, getUsersRecentOrders } from "@/data/order";

export async function GET(request, { params }) {
  try {
    const orderId = params.orderId;
    const product = await getProductsFromRecentOrder(orderId);
    if (product === null) {
      return Response.json(
        { message: "Failed to retrieve order" },
        { status: 400 }
      );
    }
    return Response.json(product);
  } catch (error) {
    console.log(error);
    Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
