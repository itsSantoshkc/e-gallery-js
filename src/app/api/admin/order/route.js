import {
  getAdminRecentOrders,
  getUsersRecentOrders,
  insertNewOrder,
} from "@/data/order";

export async function POST(request) {
  try {
    const { user_Id } = await request.json();
    const newOrder = await getAdminRecentOrders(user_Id);
    if (newOrder === null) {
      return Response.json("No order found", {
        status: 400,
      });
    }
    return Response.json(
      { message: "Order fetched successfully", data: newOrder },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" }, { status: 500 });
  }
}
