//@ts-ignore

import { getPersonalizeProductsByUserId, getProducts } from "@/data/product";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("uid");
  const filterBy = searchParams.get("filter");
  const sortBy = searchParams.get("sort");
  if (userId) {
    const products = await getPersonalizeProductsByUserId(
      userId,
      filterBy,
      sortBy
    );
    return Response.json(products);
  }

  const products = await getProducts();

  return Response.json(products);
}
