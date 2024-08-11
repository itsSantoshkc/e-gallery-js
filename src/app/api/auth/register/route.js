//@ts-ignore
import bcrypt from "bcryptjs";
import { getUserByEmail, insertNewUser } from "@/data/user";

export async function POST(request) {
  const { email, password, firstName, lastName } = await request.json();
  const user = await getUserByEmail(email);

  if (user) {
    return Response.json(
      { message: "User with this email already exist" },
      { status: 401 }
    );
  }
  const saltRounds = parseInt(process.env.AUTH_SALT_ROUNDS);
  const name = firstName + " " + lastName;

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      await insertNewUser(email, hash, name);
    } catch (err) {
      throw new Error(err);
    }
  });

  return Response.json(
    { message: "User Registered Sucessfully" },
    { status: 200 }
  );
}
