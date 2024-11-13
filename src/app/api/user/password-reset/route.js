//@ts-ignore

import { getUserByEmail, insertForgetPassword } from "@/data/user";
import { db } from "@/db/db";
import { passwordReset, users } from "@/schema/userSchema";
import bcrypt from "bcryptjs";
import { createHmac } from "crypto";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const emailAddress = searchParams.get("email");
    if (emailAddress === null) {
      return;
    }

    const user = await getUserByEmail(emailAddress);
    if (user === null) {
      return Response.json(
        { message: "No matching items found" },
        { status: 401 }
      );
    }
    const resetPasswordId = uuidv4();
    const hash = createHmac("sha256", process.env.RESET_PASSWORD_HASH_PASSWORD)
      .update(`userID:${user.id},resetPasswordId:${resetPasswordId}`)
      .digest("base64");
    const forgetPassword = insertForgetPassword(emailAddress, hash);
    if (forgetPassword === null) {
      return Response.json(
        { message: "Error while performing an request" },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "Email has been sent to the user" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const { Id, password } = await request.json();

    if (Id === "" || Id === null || Id === undefined) {
      return Response.json(
        { message: "Missing Id parameter" },
        { status: 400 }
      );
    }

    const passwordResetData = await db
      .select()
      .from(passwordReset)
      .where(eq(passwordReset.hash, Id));

    const { email, expiryDate } = passwordResetData[0];
    if (new Date().toUTCString() >= new Date(expiryDate).toUTCString()) {
      await db.delete(passwordReset).where(eq(passwordReset.hash, Id));
      return Response.json(
        { message: "The link has already been expired" },
        { status: 401 }
      );
    }
    const saltRounds = parseInt(process.env.AUTH_SALT_ROUNDS);
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      try {
        await db
          .update(users)
          .set({ password: hash })
          .where(eq(users.email, email));
      } catch (err) {
        throw new Error(err);
      }
    });

    return Response.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
