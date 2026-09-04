import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(projectRoot, "app", "hero-drone-image.ts");
const outputPath = path.join(projectRoot, "public", "grim-uav-hero.webp");

const source = await readFile(sourcePath, "utf8");
const match = source.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)"/);

if (!match) {
  throw new Error("Hero image base64 payload was not found in app/hero-drone-image.ts");
}

const bytes = Buffer.from(match[1], "base64");
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
console.log(`Materialized verified hero asset: ${path.relative(projectRoot, outputPath)} (${bytes.length} bytes)`);
