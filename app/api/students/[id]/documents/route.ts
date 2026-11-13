import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
import { savePrivateFile } from "@/lib/private-storage";
const allowed = new Set(["application/pdf", "image/jpeg", "image/png"]);
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    const form = await request.formData();
    const file = form.get("file");
    const type = String(form.get("type") || "OTHER");
    if (!(file instanceof File))
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 },
      );
    if (file.size > 10 * 1024 * 1024 || !allowed.has(file.type))
      return NextResponse.json(
        { message: "Only PDF/JPG/PNG up to 10 MB are allowed" },
        { status: 400 },
      );
    const bytes = Buffer.from(await file.arrayBuffer());
    const valid =
      (file.type === "application/pdf" &&
        bytes.subarray(0, 4).toString() === "%PDF") ||
      (file.type === "image/png" &&
        bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") ||
      (file.type === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8);
    if (!valid)
      return NextResponse.json(
        { message: "File signature mismatch" },
        { status: 400 },
      );
    const key = await savePrivateFile(bytes);
    const document = await prisma.studentDocument.create({
      data: {
        studentId: id,
        type: type as never,
        storageKey: key,
        fileName: file.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
        mimeType: file.type,
        fileSize: file.size,
      },
    });
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Upload failed" },
      { status: 401 },
    );
  }
}
