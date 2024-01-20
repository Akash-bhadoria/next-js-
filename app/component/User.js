"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function User() {
  const { status, data: session } = useSession();
  console.log(status, session);
  const router = useRouter();

  if (!session) {
    router.push("/");
  }

  return <pre>{JSON.stringify(session)}</pre>;
}
