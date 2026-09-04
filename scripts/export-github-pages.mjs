import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
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
  .replace(
    "</head>",
    '<link rel="stylesheet" href="./styles.css"/><link rel="icon" href="./favicon.svg"/></head>',
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

for (const asset of ["grim-signal-labs-logo.png", "grim-uav-hero.webp", "og.png", "favicon.svg"]) {
  await cp(path.join(publicDirectory, asset), path.join(outputDirectory, asset));
}

await writeFile(
  path.join(outputDirectory, "script.js"),
  `const toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".mobile-nav");

function setMenu(open) {
  if (!toggle || !navigation) return;
  toggle.classList.toggle("is-open", open);
  navigation.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

toggle?.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
`,
);

await writeFile(path.join(outputDirectory, ".nojekyll"), "");

console.log(`GitHub Pages export created in ${outputDirectory}`);
