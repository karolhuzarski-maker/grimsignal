import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(projectRoot, "docs");
const clientDirectory = path.join(projectRoot, "dist", "client");
const publicDirectory = path.join(projectRoot, "public");
const serverEntry = path.join(projectRoot, "dist", "server", "index.js");

const repository = process.env.GITHUB_REPOSITORY ?? "karolhuzarski-maker/grimsignal";
const [owner, repositoryName] = repository.split("/");
const productionUrl = `https://${owner}.github.io/${repositoryName}`;
const assetVersion = (process.env.GITHUB_SHA ?? "local").slice(0, 12);

async function restoreBase64Asset(partsRelativePath, outputName, minimumBytes = 1) {
  const partsDirectory = path.join(projectRoot, partsRelativePath);
  const parts = (await readdir(partsDirectory))
    .filter((file) => file.endsWith(".b64"))
    .sort();

  if (!parts.length) {
    throw new Error(`No base64 parts found in ${partsRelativePath}`);
  }

  const encoded = (
    await Promise.all(parts.map((file) => readFile(path.join(partsDirectory, file), "utf8")))
  ).join("");
  const bytes = Buffer.from(encoded, "base64");

  if (bytes.length < minimumBytes) {
    throw new Error(`${outputName} reconstructed to only ${bytes.length} bytes`);
  }

  await writeFile(path.join(outputDirectory, outputName), bytes);
  console.log(`Restored ${outputName}: ${bytes.length} bytes from ${parts.length} chunks`);
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const workerUrl = pathToFileURL(serverEntry);
workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static render failed with status ${response.status}.`);
}

let html = await response.text();
const documentEnd = html.indexOf("</html>");

if (documentEnd === -1) {
  throw new Error("Static render did not return a complete HTML document.");
}

html = html.slice(0, documentEnd + "</html>".length);
html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "")
  .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi, "")
  .replace(/<link\b[^>]*rel=["']preload["'][^>]*>/gi, "")
  .replaceAll("https://grim-signal-labs.karhuz.chatgpt.site", productionUrl)
  .replaceAll('src="/grim-signal-labs-logo.png"', 'src="./grim-signal-labs-logo.png"')
  .replaceAll('href="/grim-signal-labs-logo.png"', 'href="./grim-signal-labs-logo.png"')
  .replaceAll('src="/grim-uav-hero.webp"', 'src="./grim-uav-hero.webp"')
  .replaceAll('src="/gsl-hero-field.webp"', 'src="./gsl-hero-field.webp"')
  .replaceAll('src="/gsl-mci-multiview-01.webp"', 'src="./gsl-mci-multiview-01.webp"')
  .replace(
    "</head>",
    `<link rel="stylesheet" href="./styles.css?v=${assetVersion}"/><link rel="icon" href="./favicon.svg"/></head>`,
  )
  .replace("</body>", '<script src="./script.js" defer></script></body>');

const clientFiles = await readdir(path.join(clientDirectory, "assets"));
const stylesheet = clientFiles.find((file) => file.endsWith(".css"));

if (!stylesheet) {
  throw new Error("The production build did not generate a stylesheet.");
}

await writeFile(path.join(outputDirectory, "index.html"), html);
await cp(
  path.join(clientDirectory, "assets", stylesheet),
  path.join(outputDirectory, "styles.css"),
);

for (const asset of [
  "grim-signal-labs-logo.png",
  "grim-uav-hero.webp",
  "gsl-hero-field.webp",
  "gsl-mci-multiview-01.webp",
  "gsl-capabilities-thermal.webp",
  "og.png",
  "favicon.svg",
  "script.js",
  "gsl-field-sample.mp4",
  "gsl-field-video-poster.webp",
  "gsl-field-wide.webp",
  "gsl-field-team.webp",
  "gsl-field-close.webp",
]) {
  await cp(path.join(publicDirectory, asset), path.join(outputDirectory, asset));
}

// GitHub connector binary writes can be truncated. Rebuild the field video from
// text-safe base64 chunks during CI, then overwrite the public fallback copy.
await restoreBase64Asset("asset-parts/video48", "gsl-field-sample.mp4", 45000);

await writeFile(path.join(outputDirectory, ".nojekyll"), "");

console.log(`GitHub Pages export created in ${outputDirectory}`);
