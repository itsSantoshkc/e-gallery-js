import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { insertNewProduct, insertProductImage } from "@/data/product";
import { db } from "@/db/db";
import { product } from "@/schema/ProductSchema";
import { eq } from "drizzle-orm";

export const POST = async (req) => {
  const productsId = randomUUID();
  try {
    const formData = await req.formData();
    const body = formData.getAll("file[]");

    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const label = formData.get("label");
    const availableQuantity = formData.get("availableQuantity");
    const ownerId = formData.get("ownerId");

    const UPLOAD_DIR = path.resolve(`public/uploads/${productsId}`);

    const newProduct = await insertNewProduct(
      productsId,
      title,
      description,
      price,
      label,
      0,
      availableQuantity,
      ownerId
    );
    if (newProduct === null) {
      throw new Error("Failed to insert data");
    }

    for (let i = 0; i < body.length; i++) {
      const file = body[i] || null;
      if (file !== "undefined") {
        if (file) {
          const fileName = `${randomUUID()}.${file.type.split("/")[1]}`;
          const buffer = Buffer.from(await file.arrayBuffer());
          if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
          }
          fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);
          await insertProductImage(
            productsId,
            `/uploads/${productsId}/${fileName}`
          );
        } else {
          return NextResponse.json({
            success: false,
          });
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        productId: productsId,
      },
      { status: 200 }
    );
  } catch (error) {
    await db.delete(product).where(eq(product.id, productsId));
    return NextResponse.json({
      success: false,
    });
  }
};
