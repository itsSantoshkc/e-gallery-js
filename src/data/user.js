import { eq } from "drizzle-orm";
import { accounts, shippingAddresses, users } from "./../schema/userSchema";
import { db } from "@/db/db";
import { sendEmail } from "@/lib/nodemailer";
import EdgeRank from "@/helper/EdgeRank";
import {
  labels,
  product,
  product_label,
  product_userLiked,
} from "@/schema/ProductSchema";

const generateVerificationToken = () => {
  const verificationToken = Math.floor(100000 + Math.random() * 900000);
  return verificationToken;
};

export const reSendVerificationToken = async (id, email) => {
  const token = generateVerificationToken();
  try {
    await db
      .update(users)
      .set({ verificationToken: token })
      .where(eq(users.id, id));

    // sendEmail({ email: email, type: "VERIFY", verificationCode: token });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyUser = async (id) => {
  try {
    await db
      .update(users)
      .set({ emailVerified: null, verificationToken: null })
      .where(eq(users.id, id));
    return { message: "Email has been verified" };
  } catch (error) {
    throw new Error(error);
  }
};

export const insertNewUser = async (email, password) => {
  try {
    const token = generateVerificationToken();
    await db.insert(users).values({
      email: email,
      password: password,
      emailVerified: false,
      verificationToken: token,
    });
    // sendEmail({ email: email, type: "VERIFY", verificationCode: token });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const newUserDetails = async (
  userId,
  name,
  birthDate,
  gender,
  phone,
  province,
  address,
  image
) => {
  try {
    await db
      .update(users)
      .set({
        name: name,
        birthDate: birthDate,
        gender: gender,
        phone: phone,
        image: image,
      })
      .where(eq(users.id, userId));
    await db.insert(shippingAddresses).values({
      userId: userId,
      Address: address,
      province: province,
    });
    const user = await getUserById(userId);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserByEmail = async (email) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user) {
    return user[0];
  }
  return null;
};

export const updateExistingUserDetails = async (
  userId,
  name,
  birthDate,
  gender,
  phone,
  province,
  address
) => {
  try {
    await db
      .update(users)
      .set({
        name: name,
        birthDate: birthDate,
        gender: gender,
        phone: phone,
      })
      .where(eq(users.id, userId));
    await db
      .update(shippingAddresses)
      .set({
        Address: address,
        province: province,
      })
      .where(eq(shippingAddresses.userId, userId));
    const user = await getUserById(userId);
    if (user) {
      return user;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserLikedProductsLabel = async (userId) => {
  try {
    const userLikedLables = await db
      .selectDistinct({
        labels: labels.label,
      })
      .from(labels)
      .innerJoin(product_label, eq(product_label.labelId, labels.id))
      .innerJoin(product, eq(product.id, product_label.productId))
      .innerJoin(product_userLiked, eq(product_userLiked.productId, product.id))
      .where(eq(product_userLiked.userId, userId));
    if (userLikedLables) {
      let userLikedLableArray = [];
      for (let i = 0; i < userLikedLables.length; i++) {
        userLikedLableArray.push(userLikedLables[i].labels);
      }

      return userLikedLableArray;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  const shippingAddress = await db
    .select({
      address: shippingAddresses.Address,
      province: shippingAddresses.province,
    })
    .from(shippingAddresses)
    .where(eq(shippingAddresses.userId, id));

  if (user && shippingAddress) {
    return { ...user[0], ...shippingAddress[0] };
  }
  return null;
};

export const deleteUserDataById = async (id) => {
  try {
    console.log(id);
    await db.delete(users).where(eq(users.id, id));
    return;
  } catch (error) {
    return null;
  }
};

export const getUsersAccountTableData = async (id) => {
  const accountData = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, id));

  if (accountData.length > 0) {
    return accountData[0];
  }
  return null;
};
