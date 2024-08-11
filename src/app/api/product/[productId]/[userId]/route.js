import { getProductById } from "@/data/product";

export async function GET(request, { params }) {
  const productId = params.userId;
  const product = await getProductById(productId);
  return Response.json(product);
}
