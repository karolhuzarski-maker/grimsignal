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

const briefPanel = document.querySelector("#capture-brief");
const briefForm = document.querySelector(".quick-brief-form");
const briefButton = document.querySelector(".brief-submit");
const feedbackBox = document.querySelector(".brief-feedback-box");
const briefLinks = document.querySelectorAll('a[href="#capture-brief"]');

function showBrief() {
  if (!briefPanel) return;
  briefPanel.classList.add("is-open");
}

briefLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showBrief();
  });
});

function setBriefStatus(state, text) {
  if (feedbackBox) {
    feedbackBox.classList.remove("is-idle", "is-sending", "is-success", "is-error");
    feedbackBox.classList.add(`is-${state}`);
    feedbackBox.textContent = text;
  }

  if (briefButton) {
    briefButton.disabled = state === "sending";
    const label = briefButton.querySelector("span");
    if (label) label.textContent = state === "sending" ? "SENDING BRIEF…" : "SEND CAPTURE BRIEF";
  }
}

function fieldValue(form, name) {
  const field = form.elements.namedItem(name);
  return field && "value" in field ? String(field.value || "").trim() : "";
}

briefForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;
  if (briefButton?.disabled) return;

  const message = fieldValue(form, "message");
  const email = fieldValue(form, "email");
  const organization = fieldValue(form, "organization");
  const reference = fieldValue(form, "reference");
  const botcheck = fieldValue(form, "botcheck");
  const intent = fieldValue(form, "intent") || "Not specified";
  const timing = fieldValue(form, "timing") || "Not specified";
  const emailField = form.elements.namedItem("email");

  if (!message) {
    setBriefStatus("error", "ADD A SHORT MESSAGE TO CONTINUE.");
    form.elements.namedItem("message")?.focus();
    return;
  }

  if (!email || (emailField instanceof HTMLInputElement && !emailField.checkValidity())) {
    setBriefStatus("error", "ADD A VALID RETURN EMAIL.");
    emailField?.focus();
    return;
  }

  if (botcheck) {
    form.reset();
    setBriefStatus("success", "BRIEF RECEIVED. THANK YOU.");
    return;
  }

  const signals = Array.from(form.querySelectorAll('input[name="signals"]:checked'))
    .map((input) => input.value)
    .join(", ") || "Not specified";

  const accessKey = ["ec086683", "8a76", "49ec", "b283", "d7e6b2aef86c"].join("-");
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);

  setBriefStatus("sending", "SENDING BRIEF…");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        access_key: accessKey,
        subject: `GRIM SIGNAL LABS — Capture brief — ${organization || intent}`,
        from_name: "GRIM SIGNAL LABS website",
        email,
        organization: organization || "Not provided",
        message,
        topic: intent,
        useful_signals: signals,
        target_window: timing,
        reference: reference || "Not provided",
        source: window.location.href,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      throw new Error(String(result?.message || "Submission failed"));
    }

    form.reset();
    setBriefStatus("success", "BRIEF RECEIVED — SENT SUCCESSFULLY.");
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError";
    const errorText = error instanceof Error ? error.message : "Unknown error";
    setBriefStatus(
      "error",
      timedOut ? "SEND TIMED OUT — PLEASE TRY AGAIN." : `SEND FAILED — ${errorText}`,
    );
  } finally {
    window.clearTimeout(timeoutId);
    if (briefButton) briefButton.disabled = false;
  }
});
`,
);

await writeFile(path.join(outputDirectory, ".nojekyll"), "");

console.log(`GitHub Pages export created in ${outputDirectory}`);
