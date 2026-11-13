import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
const root = path.join(process.cwd(), "storage", "private");
export async function savePrivateFile(bytes: Buffer) {
  await mkdir(root, { recursive: true });
  const key = `${crypto.randomUUID()}.bin`;
  await writeFile(path.join(root, key), bytes, { flag: "wx" });
  return key;
}
export async function readPrivateFile(key: string) {
  if (key.includes("..") || path.basename(key) !== key)
    throw new Error("INVALID_KEY");
  return readFile(path.join(root, key));
}
