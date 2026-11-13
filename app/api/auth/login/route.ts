import { NextResponse } from "next/server";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
export async function POST(request: Request) {
  const { email, password } = await request.json();
  const normalizedEmail = String(email ?? "")
    .trim()
    .toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  const validPassword = user
    ? await argon2.verify(user.passwordHash, String(password ?? ""))
    : false;
  if (!user || !validPassword)
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  const response = NextResponse.json({ ok: true, role: user.role });
  response.cookies.set(
    "dna_session",
    JSON.stringify({ name: user.name, email: user.email, role: user.role }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    },
  );
  return response;
}
