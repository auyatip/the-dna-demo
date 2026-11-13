import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession, requireAdmin } from "@/lib/authz";
export async function GET(request: Request) {
  try {
    await requireSession();
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const status = url.searchParams.get("status");
    const students = await prisma.student.findMany({
      select: {
        id: true, studentCode: true, firstName: true, lastName: true,
        email: true, phone: true, nationality: true, dateOfBirth: true,
        program: true, enrollmentDate: true, status: true, notes: true,
      },
      where: {
        archivedAt: null,
        ...(status ? { status: status as never } : {}),
        ...(q
          ? {
              OR: [
                { firstName: { contains: q } },
                { lastName: { contains: q } },
                { studentCode: { contains: q } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const student = await prisma.student.create({
      data: {
        studentCode: body.studentCode,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        nationality: body.nationality,
        program: body.program,
        enrollmentDate: new Date(body.enrollmentDate),
        status: body.status || "PENDING",
      },
    });
    return NextResponse.json(student, { status: 201 });
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
