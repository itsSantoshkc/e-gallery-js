import { getUserById } from "@/data/user";

export async function POST(request) {
  try {
    const { id } = await request.json();

    const user = await getUserById(id);

    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Sorry! Please try again later" },
      { status: 401 }
    );
  }
}
