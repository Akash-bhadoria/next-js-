"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/`,
            })
          }
        >
          Sign Out
        </button>
        <Link className="btn btn-primary" href="/signIn">
          Sign in
        </Link>
      </div>
    </div>
  );
}
