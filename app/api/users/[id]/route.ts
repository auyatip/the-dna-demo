import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const { roleIds, isActive } = await request.json();
    if (!Array.isArray(roleIds) || roleIds.length === 0)
      return NextResponse.json(
        { message: "At least one role is required" },
        { status: 400 },
      );
    const [target, selectedRoles] = await Promise.all([
      prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true, isActive: true } }),
      prisma.role.findMany({ where: { id: { in: roleIds } }, select: { id: true, name: true, code: true } }),
    ]);
    if (!target)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    if (selectedRoles.length !== roleIds.length)
      return NextResponse.json(
        { message: "Invalid role selection" },
        { status: 400 },
      );
    const keepsAdmin = selectedRoles.some(
      (item) => item.code === "ADMIN" || item.code === "SUPER_ADMIN",
    );
    if (target.role === "ADMIN" && (!keepsAdmin || isActive === false)) {
      const activeAdmins = await prisma.user.count({
        where: { role: "ADMIN", isActive: true },
      });
      if (activeAdmins <= 1)
        return NextResponse.json(
          { message: "At least one active Admin is required" },
          { status: 409 },
        );
    }
    const updated = await prisma.$transaction(async (tx) => {
      await tx.userRole.deleteMany({ where: { userId: id } });
      await tx.userRole.createMany({
        data: roleIds.map((roleId: string) => ({ userId: id, roleId })),
      });
      return tx.user.update({
        where: { id },
        data: {
          role: keepsAdmin ? "ADMIN" : "STAFF",
          ...(typeof isActive === "boolean" ? { isActive } : {}),
        },
        select: { id: true, name: true, email: true, role: true, isActive: true },
      });
    });
    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      isActive: updated.isActive,
      roles: selectedRoles,
    });
  } catch (error) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}
