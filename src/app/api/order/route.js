import { getUsersRecentOrders, insertNewOrder } from "@/data/order";

export async function POST(request) {
  try {
    const { userId, transaction_id } = await request.json();
    const newOrder = await insertNewOrder(userId, transaction_id);
    if (newOrder !== null) {
      return Response.json("Order has been place successfully", {
        status: 200,
      });
    }
    return Response.json("Failed to place order", { status: 400 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" }, { status: 500 });
  }
}
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("uid");
    if (!userId) {
      return Response.json(
        { message: "Missing User id parameter" },
        { status: 400 }
      );
    }
    const newOrder = await getUsersRecentOrders(userId);
    if (newOrder !== null) {
      return Response.json(
        { message: "Order has been place successfully", orders: newOrder },
        {
          status: 200,
        }
      );
    }
    return Response.json("Failed to place order", { status: 400 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" }, { status: 500 });
  }
}
