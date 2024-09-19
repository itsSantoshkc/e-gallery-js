import { deleteProduct, getOwnersProduct } from "@/data/product";

export async function POST(request) {
  try {
    const { user_Id } = await request.json();
    const products = await getOwnersProduct(user_Id);
    if (products === null) {
      return Response.json("No order found", {
        status: 400,
      });
    }
    return Response.json(
      { message: "Order fetched successfully", data: products },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { userId, productId } = await request.json();
    const deletedProduct = await deleteProduct(userId, productId);

    if (deletedProduct) {
      return Response.json(
        { message: "Product has been deleted sucessfully" },
        { status: 200 }
      );
    }
    return Response.json(
      { message: "Failed to delete the product" },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" });
  }
}
