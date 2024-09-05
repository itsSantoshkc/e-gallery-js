import { getUserByEmail, getUserById, updateUserPassword } from "@/data/user";
import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs/dist/bcrypt";

export async function PATCH(request) {
  const { currentPassword, newPassword, userId } = await request.json();
  const user = await getUserById(userId);
  console.log(currentPassword, newPassword, userId);

  if ((await bcrypt.compare(currentPassword, user.password)) === false) {
    return Response.json(
      { message: "Please Enter your current password correctly" },
      { status: 401 }
    );
  }
  if (await bcrypt.compare(newPassword, user.password)) {
    return Response.json(
      { message: "New password cannot be same as old password" },
      { status: 401 }
    );
  }

  const saltRounds = parseInt(process.env.AUTH_SALT_ROUNDS);

  bcryptjs.hash(newPassword, saltRounds, async function (err, hash) {
    try {
      const newPassword = await updateUserPassword(hash, userId);
      if (newPassword === null) {
        return Response.json(
          { message: "Internal Server Error" },
          { status: 400 }
        );
      }
    } catch (err) {
      console.log(err);
    }
  });

  return Response.json(
    { message: "Password Changed Sucessfully" },
    { status: 200 }
  );
}
