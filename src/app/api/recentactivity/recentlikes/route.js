import { getProductsLikedByUser } from "@/data/product";

export async function POST(request) {
  const { userId } = await request.json();
  const product = await getProductsLikedByUser(userId);
  if (product === null) {
    return Response.json({ status: 400 }, { message: "Internal Server Error" });
  }
  return Response.json(product, { status: 200 });
}
