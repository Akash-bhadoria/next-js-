import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../../../../lib/db";
import bcrypt from "bcrypt";
import { error } from "console";

export const options: NextAuthOptions = {
  // adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signIn",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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

        const validPassword = await bcrypt.compare(
          credentials?.password,
          existingUser?.password
        );

        if (!validPassword) {
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
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account.provider === "google") {
          if (!profile?.email) {
            throw new Error("No Profile");
          }

          await db.user.upsert({
            where: { email: profile.email },
            update: {
              name: profile.name,
            },
            create: {
              email: profile.email as string,
              name: profile.name as string,
            },
          });
        }

        return true;
      } catch (error) {
        // Handle the error appropriately, e.g., log it or return false
        console.error("Error during signIn:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session,
          username: token.name,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      return Promise.resolve(baseUrl);
    },
  },
};
