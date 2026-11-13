import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRoleManagement } from "@/lib/authz";
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRoleManagement();
    const { id } = await params;
    const { permissionIds } = await request.json();
    if (!Array.isArray(permissionIds))
      return NextResponse.json(
        { message: "permissionIds must be an array" },
        { status: 400 },
      );
    const result = await prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({ where: { roleId: id } });
      if (permissionIds.length)
        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId: string) => ({
            roleId: id,
            permissionId,
          })),
        });
      return tx.role.findUnique({
        where: { id },
        include: { permissions: { include: { permission: true } } },
      });
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}
