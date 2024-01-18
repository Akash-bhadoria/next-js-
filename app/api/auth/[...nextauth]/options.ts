import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../../../../lib/db";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (!existingUser) {
          return null;
        }

        return {
          id: existingUser.id + "", // `${existingUser.id}`
          email: existingUser.email,
          name: existingUser.name,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signIn",
  },
};
