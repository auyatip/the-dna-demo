import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(
      await prisma.permission.findMany({
        orderBy: [{ module: "asc" }, { action: "asc" }],
      }),
    );
  } catch (error) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}
