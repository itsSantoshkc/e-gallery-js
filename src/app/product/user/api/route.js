import { getProductByOwnerId } from "@/data/product";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ownerId = searchParams.get("ownerId");

    const products = await getProductByOwnerId(ownerId);
    console.log(products);
    if (products === null) {
      return Response.json(
        { message: "Unable to get products" },
        { status: 400 }
      );
    }

    return Response.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 200 });
  }
}
