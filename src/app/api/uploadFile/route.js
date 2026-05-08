import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { insertNewProduct, insertProductImage } from "@/data/product";
import { db } from "@/db/db";
import { product } from "@/schema/ProductSchema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) {
          reject(error);
        } else resolve(result);
      })
      .end(buffer);
  });
};

export const POST = async (req) => {
  const productsId = randomUUID();
  try {
    const formData = await req.formData();
    const files = formData
      .getAll("file[]")
      .filter((file) => file instanceof File && file.size > 0);

    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const label = formData.get("labelId");
    const availableQuantity = formData.get("availableQuantity");
    const ownerId = formData.get("ownerId");

    const newProduct = await insertNewProduct(
      productsId,
      title,
      description,
      price,
      label,
      0,
      availableQuantity,
      ownerId,
    );

    if (newProduct === null) {
      throw new Error("Failed to insert product");
    }

    for (const file of files) {
      if (!file) {
        return NextResponse.json({ success: false }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadToCloudinary(buffer, `products/${productsId}`);
      await insertProductImage(productsId, result.secure_url);
    }

    return NextResponse.json(
      { success: true, productId: productsId },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    await db.delete(product).where(eq(product.id, productsId));
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
