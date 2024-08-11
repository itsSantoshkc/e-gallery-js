import {
  deleteUserDataById,
  getUserById,
  newUserDetails,
  updateExistingUserDetails,
} from "@/data/user";

export async function POST(request) {
  try {
    const { userId, birthDate, gender, phone, province, address } =
      await request.json();
    if (!userId) {
      return Response.json(
        { message: "Sorry! Please try again later" },
        { status: 401 }
      );
    }
    const user = await newUserDetails(
      userId,
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
