import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireSession();
    const { id } = await params;
    const { status, note } = await request.json();
    if (!["PENDING_REVIEW", "APPROVED", "REJECTED"].includes(status))
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    const current = await prisma.studentDocument.findUnique({ where: { id } });
    if (!current)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    const actor = await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, role: user.role },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash: "!demo-session-only!",
      },
    });
    const updated = await prisma.$transaction(async (tx) => {
      const item = await tx.studentDocument.update({
        where: { id },
        data: { status },
      });
      await tx.documentStatusHistory.create({
        data: {
          documentId: id,
          actorId: actor.id,
          previousStatus: current.status,
          nextStatus: status,
          note,
        },
      });
      await tx.auditLog.create({
        data: {
          actorId: actor.id,
          action: "DOCUMENT_STATUS_CHANGED",
          entityType: "StudentDocument",
          entityId: id,
          metadata: { from: current.status, to: status },
        },
      });
      return item;
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Status update failed",
      },
      { status: 401 },
    );
  }
}
