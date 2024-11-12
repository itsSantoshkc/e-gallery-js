//@ts-ignore

import { getUserByEmail } from "@/data/user";
import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
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

  const hash = createHmac("sha256", "8gBm/:&EnhH.1/q")
    .update(`userID=${user.id},resetPasswordId=${resetPasswordId}`)
    .digest("base64");

  console.log(hash);
  return Response.json(
    { message: "Email has been sent to the user" },
    { status: 200 }
  );
}
