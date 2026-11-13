import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/authz";
export const PERMISSIONS = [
  "dashboard:read",
  "students:read",
  "students:create",
  "students:update",
  "students:archive",
  "documents:read",
  "documents:upload",
  "documents:update",
  "documents:download",
  "documents:archive",
  "document_tracking:read",
  "document_tracking:update",
  "users:read",
  "users:create",
  "users:update",
  "users:deactivate",
  "users:assign_roles",
  "roles:read",
  "roles:create",
  "roles:update",
  "roles:delete",
  "roles:assign_permissions",
  "audit_logs:read",
] as const;
export async function getUserPermissions(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      userRoles: {
        include: {
          role: { include: { permissions: { include: { permission: true } } } },
        },
      },
    },
  });
  if (!user) return new Set<string>();
  return new Set(
    user.userRoles.flatMap((ur) =>
      ur.role.permissions.map((rp) => rp.permission.code),
    ),
  );
}
export async function hasPermission(code: string) {
  const session = await getSessionUser();
  if (!session) return false;
  if (session.role === "ADMIN") return true;
  return (await getUserPermissions(session.email)).has(code);
}
export async function requirePermission(code: string) {
  if (!(await hasPermission(code))) throw new Error("FORBIDDEN");
}
