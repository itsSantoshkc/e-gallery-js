import {
  deleteUserDataById,
  newUserDetails,
  updateExistingUserDetails,
} from "@/data/user";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const userId = formData.get("userId");
    if (!userId) {
      return Response.json(
        { message: "Sorry! Please try again later" },
        { status: 401 },
      );
    }

    const name = formData.get("name");
    const birthDate = formData.get("birthDate");
    const gender = formData.get("gender");
    const phone = formData.get("phone");
    const province = formData.get("province");
    const address = formData.get("address");
    const file = formData.get("profilePic");

    let avatarUrl = null;

    if (file && file !== "undefined") {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "avatars",
              public_id: userId,
              overwrite: true,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      avatarUrl = uploadResult.secure_url;
    }

    const user = await newUserDetails(
      userId,
      name,
      birthDate,
      gender,
      phone,
      province,
      address,
      avatarUrl,
    );

    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" }, { status: 500 });
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
      address,
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
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An Error Occurred" });
  }
}
