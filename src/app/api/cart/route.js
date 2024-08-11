//@ts-ignore
import bcrypt from "bcryptjs";
import { getUserByEmail, insertNewUser } from "@/data/user";
import { getItemsInCart } from "@/data/cart";

export async function POST(request) {
  try {
    const { userId } = await request.json();
    const cartItems = await getItemsInCart(userId);

    if (cartItems === null) {
      return Response.json({ message: "Cart is currently empty" });
    }
    return Response.json(cartItems, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Some error occurred" }, { status: 400 });
  }
}

// export async function DELETE(request) {
//   const { email, password } = await request.json();
//   const user = await getUserByEmail(email);

//   if (user) {
//     return Response.json(
//       { message: "User with this email already exist" },
//       { status: 401 }
//     );
//   }
//   const saltRounds = Number(process.env.AUTH_SALT_ROUNDS);

//   bcrypt.hash(password, saltRounds, async function (err: Error, hash: string) {
//     try {
//       await insertNewUser(email, hash);
//     } catch (err: any) {
//       throw new Error(err);
//     }
//   });

//   return Response.json(
//     { message: "User Registered Sucessfully" },
//     { status: 200 }
//   );
// }
