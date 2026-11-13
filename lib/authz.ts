import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
export type SessionUser = {
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
};
export async function getSessionUser(): Promise<SessionUser | null> {
  const raw = (await cookies()).get("dna_session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
export async function requireSession() {
  const user = await getSessionUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}
export async function requireAdmin() {
  const user = await requireSession();
  if (user.role !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}
export async function isSuperAdmin() {
  const user = await getSessionUser();
  if (!user) return false;
  const record = await prisma.user.findUnique({
    where: { email: user.email },
    include: { userRoles: { include: { role: true } } },
  });
  return !!record?.userRoles.some((item) => item.role.code === "SUPER_ADMIN");
}
export async function requireRoleManagement() {
  const user = await requireSession();
  if (user.role === "ADMIN" || (await isSuperAdmin())) return user;
  throw new Error("FORBIDDEN");
}
