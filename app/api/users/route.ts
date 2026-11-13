import { NextResponse } from "next/server";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(
      await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          userRoles: {
            include: { role: { select: { id: true, name: true, code: true } } },
          },
          isActive: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error && error.message === "FORBIDDEN"
            ? "Forbidden"
            : "Unauthorized",
      },
      {
        status:
          error instanceof Error && error.message === "FORBIDDEN" ? 403 : 401,
      },
    );
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    if (!body.name || !body.email || !body.password)
      return NextResponse.json(
        { message: "name, email and password are required" },
        { status: 400 },
      );
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: String(body.email).trim().toLowerCase(),
        passwordHash: await argon2.hash(body.password, {
          type: argon2.argon2id,
        }),
        role: body.role === "ADMIN" ? "ADMIN" : "STAFF",
      },
    });
    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to create user" },
      { status: 400 },
    );
  }
}
