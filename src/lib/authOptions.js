//@ts-ignore
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { db } from "@/db/db";
import {
  getUserByEmail,
  getUsersAccountTableData,
  reSendVerificationToken,
} from "@/data/user";

const authOptions = {
  pages: {
    signIn: "/Login",
  },
  session: {
    strategy: "jwt",
  },

  //@ts-ignore-
  adapter: DrizzleAdapter(db),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
    // }),

    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        if (credentials === undefined) return null;

        try {
          const user = await getUserByEmail(credentials?.email);
          if (!user) {
            throw new Error("User doesn't exist");
          }
          // sendEmail({ address: user.email, type: "Good" });

          if (user.emailVerified === false) {
            await reSendVerificationToken(user.id, user.email);
          }

          if (await bcrypt.compare(credentials?.password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              // verified:
              //   user.emailVerified === null || user.emailVerified === true
              //     ? true
              //     : false,
              role: user.role ?? "user",
            };
          } else {
            throw new Error("Password and email does not match");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
      credentials: undefined,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
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
