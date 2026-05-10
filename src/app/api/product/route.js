import { getProducts } from "@/data/product";

export async function GET(request) {
  try {
    const products = await getProducts();

    if (!products || products.length === 0) {
      return Response.json({ message: "No products found" }, { status: 404 });
    }
    return Response.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "An error occurred" }, { status: 500 });
  }
}
