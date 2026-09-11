const toggle = document.querySelector(".menu-toggle");
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
const closeBriefLink = document.querySelector(".brief-close");

function showBrief() {
  if (!briefPanel) return;
  briefPanel.classList.add("is-open");
}

function hideBrief() {
  if (!briefPanel) return;
  briefPanel.classList.remove("is-open");
}

briefLinks.forEach((link) => {
  link.addEventListener("click", () => showBrief());
});

closeBriefLink?.addEventListener("click", () => hideBrief());

if (window.location.hash === "#capture-brief") {
  showBrief();
}

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#capture-brief") showBrief();
  else hideBrief();
});

function setBriefStatus(state, text) {
  if (feedbackBox) {
    feedbackBox.classList.remove("is-idle", "is-sending", "is-success", "is-error");
    feedbackBox.classList.add("is-" + state);
    feedbackBox.textContent = text;
  }

  if (briefButton) {
    briefButton.disabled = state === "sending";
    const label = briefButton.querySelector("span");
    if (label) {
      label.textContent = state === "sending" ? "SENDING BRIEF…" : "SEND CAPTURE BRIEF";
    }
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

  const accessKey = String.fromCharCode(57,98,97,50,102,53,101,51,45,48,48,56,102,45,52,99,54,51,45,97,56,97,102,45,54,99,54,48,102,56,56,97,51,99,52,55);
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
        subject: "GRIM SIGNAL LABS — Capture brief — " + (organization || intent),
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
      timedOut ? "SEND TIMED OUT — PLEASE TRY AGAIN." : "SEND FAILED — " + errorText,
    );
  } finally {
    window.clearTimeout(timeoutId);
    if (briefButton) briefButton.disabled = false;
  }
});
