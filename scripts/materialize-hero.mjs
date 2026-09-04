import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const partsDirectory = path.join(projectRoot, "app", "hero-image-parts");
const outputPath = path.join(projectRoot, "public", "grim-uav-hero.webp");

const partNames = [
  "p00.b64.txt",
  "p01.b64.txt",
  "p02.b64.txt",
  "p03.b64.txt",
  "p04-correct.b64.txt",
  "p05.b64.txt",
  "p06.b64.txt",
];

const chunks = await Promise.all(
  partNames.map(async (name) => (await readFile(path.join(partsDirectory, name), "utf8")).replace(/\s+/g, "")),
);

const payload = chunks.join("");
const bytes = Buffer.from(payload, "base64");
const digest = createHash("sha256").update(bytes).digest("hex");
const expectedBytes = 33874;
const expectedDigest = "dfaaabdc1fcbb3dddb6b1d4c966ca4437e739976d52b3123dccc334ac1fb1a48";

if (bytes.length !== expectedBytes || digest !== expectedDigest) {
  throw new Error(
    `Hero asset integrity check failed: got ${bytes.length} bytes / ${digest}, expected ${expectedBytes} bytes / ${expectedDigest}`,
  );
}

if (bytes.subarray(0, 4).toString("ascii") !== "RIFF" || bytes.subarray(8, 12).toString("ascii") !== "WEBP") {
  throw new Error("Hero asset is not a valid WebP container");
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, bytes);
console.log(`Materialized verified hero asset: ${path.relative(projectRoot, outputPath)} (${bytes.length} bytes, sha256 ${digest})`);
