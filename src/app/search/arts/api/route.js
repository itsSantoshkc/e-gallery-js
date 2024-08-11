//@ts-ignore

import { getProductsFromSearch } from "@/data/product";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const s = searchParams.get("s");
  if (s === null) {
    return;
  }
  const products = await getProductsFromSearch(s);

  if (products === null) {
    Response.json({ message: "No matching items found" });
  }

  return Response.json(products, { status: 200 });
}
