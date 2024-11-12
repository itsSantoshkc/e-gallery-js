import {
  deleteImage,
  getProductById,
  insertProductImage,
  updateProduct,
} from "@/data/product";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  const { productId } = await params;
  const product = await getProductById(productId);
  return Response.json(product);
}

export async function PUT(request, { params }) {
  try {
    const { productId } = await params;
    const { name, description, price } = await request.json();
    console.log("Hello");
    const product = await updateProduct(productId, name, description, price);
    if (product === null) {
      return Response.json(
        { message: "Unable to update data" },
        { status: 400 }
      );
    }
    return Response.json(product);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server error" }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    const { productId } = await params;
    const { imagePath } = await request.json();
    const splittedImage = imagePath.split("/");
    const FILE_PATH = path.resolve(
      `public/uploads/${productId}/${splittedImage[splittedImage.length - 1]}`
    );
    const product = await deleteImage(productId, imagePath);
    fs.unlink(FILE_PATH, (err) => {
      console.log(err);
    });
    console.log(product);
    if (product === null) {
      return Response.json(
        { message: "Unable to delete a file" },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "File delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { productId } = await params;
    const formData = await request.formData();
    const image = formData.get("image");
    const event = formData.get("event");

    const UPLOAD_DIR = path.resolve(`public/uploads/${productId}`);

    if (event === "event.change.image") {
      const prevImage = formData.get("previousImage");
      const splittedImage = prevImage.split("/");
      const fileName = splittedImage[splittedImage.length - 1];
      const FILE_PATH = path.resolve(`public/uploads/${productId}/${fileName}`);
      fs.unlink(FILE_PATH, (err) => {
        console.log(err);
      });
      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);
      return Response.json(
        { message: "File Changed Successfully" },
        { status: 200 }
      );
    }
    if (event === "event.upload.image") {
      const fileName = `${randomUUID()}.${image.type.split("/")[1]}`;
      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);
      const uploadInDb = await insertProductImage(
        productId,
        `/uploads/${productId}/${fileName}`
      );
      if (uploadInDb === null) {
        fs.unlink(
          path.resolve(`public/uploads/${productId}/${fileName}`),
          (err) => {
            console.log(err);
            return Response.json(
              { message: "Unable to upload an image" },
              { status: 400 }
            );
          }
        );
      }

      return Response.json(
        { message: "File Uploaded Successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server error" }, { status: 500 });
  }
}
