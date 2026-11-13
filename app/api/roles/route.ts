import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
export async function GET() {
  try {
    await requireAdmin();
    const roles = await prisma.role.findMany({
      include: {
        permissions: { include: { permission: true } },
        _count: { select: { users: true } },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    if (!body.name || !body.code)
      return NextResponse.json(
        { message: "name and code are required" },
        { status: 400 },
      );
    const role = await prisma.role.create({
      data: {
        name: String(body.name).trim(),
        code: String(body.code).trim().toUpperCase(),
        description: body.description || null,
        isSystem: false,
      },
    });
    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to create role" },
      { status: 400 },
    );
  }
}
