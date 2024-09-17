import { insertNewOrder } from "@/data/order";

export async function POST(request) {
  try {
    const { userId } = await request.json();
    insertNewOrder("67f9cecc-c18e-4fff-b775-d431f1bfbf38", 1000);

    return Response.json("Dine Done", { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" });
  }
}
