import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // 'secret' should be the same 'process.env.SECRET' use in NextAuth function
  const session = await getToken({
    req: req,
    secret: process.env.SECRET,
  });
  console.log("session in middleware: ", session);

  if (!session) {
    const url = new URL(`/signIn`, req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/addUser", "/todoList"],
};
