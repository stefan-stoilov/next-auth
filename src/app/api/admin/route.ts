import { getCurrentUser } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user?.role !== "admin") {
    return NextResponse.json({ message: "Access denied." }, { status: 403 });
  }

  return NextResponse.json({ message: "Access granted" }, { status: 200 });
}
