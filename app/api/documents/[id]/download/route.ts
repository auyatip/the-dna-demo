import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
import { readPrivateFile } from "@/lib/private-storage";
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    const doc = await prisma.studentDocument.findUnique({ where: { id } });
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    const data = await readPrivateFile(doc.storageKey);
    return new NextResponse(data, {
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Disposition": `attachment; filename="${doc.fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Download failed" },
      { status: 401 },
    );
  }
}
