//@ts-ignore
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/db";
import {
  getUserByEmail,
  getUsersAccountTableData,
  reSendVerificationToken,
} from "@/data/user";
import { users } from "@/schema/userSchema";

const authOptions = {
  pages: {
    signIn: "/Login",
  },
  session: {
    strategy: "jwt",
  },

  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        if (credentials === undefined) return null;

        try {
          const user = await getUserByEmail(credentials?.email);
          if (!user) {
            throw new Error("User not found");
          }
          // sendEmail({ address: user.email, type: "Good" });
          const isUserOAuth = await getUsersAccountTableData(user?.id);
          if (isUserOAuth) {
            throw new Error("Please Sign in using Google | GitHub");
          }

          if (user.emailVerified === false) {
            await reSendVerificationToken(user.id, user.email);
            // throw new Error("Email is not verified");
          }

          if (await bcrypt.compare(credentials?.password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role ?? "user",
            };
          } else {
            throw new Error("Password does not match");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
      credentials: undefined,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.sub !== undefined) {
        session.user.id = token?.sub;
        session.user.role = token?.role;
      }
      return session;
    },
  },
};
export default authOptions;
