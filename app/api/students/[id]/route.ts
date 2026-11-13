import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Context) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const student = await prisma.student.update({ where: { id }, data: {
      studentCode: body.studentCode, firstName: body.firstName, lastName: body.lastName,
      email: body.email, phone: body.phone || null, nationality: body.nationality || null,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null, program: body.program,
      enrollmentDate: new Date(body.enrollmentDate), status: body.status, notes: body.notes || null,
    }});
    return NextResponse.json(student);
  } catch (error) {
    const forbidden = error instanceof Error && error.message === "FORBIDDEN";
    return NextResponse.json({ message: forbidden ? "Forbidden" : "Unable to update student" }, { status: forbidden ? 403 : 400 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  try {
    await requireAdmin();
    const { id } = await params;
    const student = await prisma.student.update({ where: { id }, data: { archivedAt: new Date() } });
    return NextResponse.json(student);
  } catch (error) {
    const forbidden = error instanceof Error && error.message === "FORBIDDEN";
    return NextResponse.json({ message: forbidden ? "Forbidden" : "Unable to delete student" }, { status: forbidden ? 403 : 400 });
  }
}
