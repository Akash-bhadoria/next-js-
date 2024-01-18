import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todosData = await res.json();
    return NextResponse.json(todosData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "failed to load data" });
  }
}
