import { NextResponse } from "next/server";
import { getSessionUser, isSuperAdmin } from "@/lib/authz";
import { getUserPermissions } from "@/lib/permissions";

export async function GET() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ permissions: [] }, { status: 401 });
  const superAdmin = await isSuperAdmin();
  if (session.role === "ADMIN" || superAdmin)
    return NextResponse.json({ permissions: ["*"], isSuperAdmin: superAdmin });
  return NextResponse.json({
    permissions: [...(await getUserPermissions(session.email))],
    isSuperAdmin: false,
  });
}
