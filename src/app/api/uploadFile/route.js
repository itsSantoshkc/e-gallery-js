import { NextResponse } from "next/server";
import fs, { writeFile } from "fs";
import path, { join } from "path";
import { randomUUID } from "crypto";

export async function POST(req) {
  const UPLOAD_DIR = "C:/Users/thapa/Downloads/Egallery/e-gallery/public";
  const formData = await req.formData();
  const images = formData.getAll("image[]");
  const productDetails = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  };
  console.log(images);
  for (let i = 0; i < images.length; i++) {
    const file = await images[i];
    console.log(file);
    if (file) {
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }
      console.log(file.type);
      fs.writeFileSync(
        path.resolve(UPLOAD_DIR, `${randomUUID()}.png}`),
        buffer
      );
    } else {
      return NextResponse.json({
        success: false,
      });
    }
  }

  return NextResponse.json({
    success: true,
    name: body.file.name,
  });
}
