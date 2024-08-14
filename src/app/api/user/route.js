import {
  deleteUserDataById,
  newUserDetails,
  updateExistingUserDetails,
} from "@/data/user";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    console.log(formData);

    const userId = formData.get("userId");
    if (!userId) {
      return Response.json(
        { message: "Sorry! Please try again later" },
        { status: 401 }
      );
    }
    const name = formData.get("name");
    const birthDate = formData.get("birthDate");
    const gender = formData.get("gender");
    const phone = formData.get("phone");
    const province = formData.get("province");
    const address = formData.get("address");
    const body = formData.get("profilePic");
    console.log(body);
    const UPLOAD_DIR = path.resolve(`public/uploads/avatar/`);

    const file = body || null;
    if (file !== "undefined") {
      if (file) {
        const fileName = `${userId}.${file.type.split("/")[1]}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        if (!fs.existsSync(UPLOAD_DIR)) {
          fs.mkdirSync(UPLOAD_DIR);
        }
        fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);

        const user = await newUserDetails(
          userId,
          name,
          birthDate,
          gender,
          phone,
          province,
          address,
          `/uploads/avatar/${fileName}`
        );
        if (!user) {
          return Response.json(
            { message: "User doesn't exist" },
            { status: 401 }
          );
        }
        return Response.json(user, { status: 200 });
      } else {
        return NextResponse.json({
          success: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" });
  }
}

export async function PATCH(request) {
  try {
    const { userId, name, birthDate, gender, phone, province, address } =
      await request.json();
    const user = await updateExistingUserDetails(
      userId,
      name,
      birthDate,
      gender,
      phone,
      province,
      address
    );
    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" });
  }
}
export async function DELETE(request) {
  try {
    const { userId } = await request.json();
    await deleteUserDataById(userId);

    return Response.json(
      { message: "User has been deleted sucessfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" });
  }
}
