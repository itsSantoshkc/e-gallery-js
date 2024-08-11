import { getUserById, verifyUser } from "@/data/user";

export async function POST(request) {
  const { id, verificationToken } = await request.json();

  const user = await getUserById(id);
  if (!user) {
    return Response.json({ message: "User doesn't exist" }, { status: 401 });
  }
  if (user?.verificationToken !== parseInt(verificationToken)) {
    return Response.json(
      { message: "Please! Make sure the login code is correct" },
      { status: 401 }
    );
  }

  verifyUser(id);

  return Response.json(
    { message: "User has been verified Sucessfully" },
    { status: 200 }
  );
}
