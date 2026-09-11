"use client";

import { FormEvent, useEffect, useState } from "react";

const WEB3FORMS_ACCESS_KEY = [
  "ec086683",
  "8a76",
  "49ec",
  "b283",
  "d7e6b2aef86c",
].join("-");

type SubmitState = "idle" | "sending" | "success" | "error";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ContactBrief() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function revealBrief() {
    setIsOpen(true);
    window.setTimeout(() => {
      document.getElementById("capture-brief")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 30);
  }

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash !== "#capture-brief") return;
      revealBrief();
    }

    function handleBriefLinkClick(event: MouseEvent) {
      if (event.defaultPrevented) return;

      const target = event.target as Element | null;
      const link = target?.closest('a[href="#capture-brief"]');
      if (!link) return;

      event.preventDefault();

      if (window.location.hash !== "#capture-brief") {
        window.history.pushState(null, "", "#capture-brief");
      }

      revealBrief();
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    document.addEventListener("click", handleBriefLinkClick);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
      document.removeEventListener("click", handleBriefLinkClick);
    };
  }, []);

  function closeBrief() {
    setIsOpen(false);
    setFeedback("");
    setSubmitState("idle");

    if (window.location.hash === "#capture-brief") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const message = String(data.get("message") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const reference = String(data.get("reference") ?? "").trim();
    const botcheck = String(data.get("botcheck") ?? "").trim();
    const intent = String(data.get("intent") ?? "Not specified");
    const timing = String(data.get("timing") ?? "Not specified");
    const signals = data.getAll("signals").map(String).join(", ") || "Not specified";
    const emailControl = form.elements.namedItem("email") as HTMLInputElement;

    setFeedback("");
    setSubmitState("idle");

    if (!message) {
      setFeedback("ADD A SHORT MESSAGE TO CONTINUE.");
      setSubmitState("error");
      (form.elements.namedItem("message") as HTMLTextAreaElement).focus();
      return;
    }

    if (!email || !emailControl.checkValidity()) {
      setFeedback("ADD A VALID RETURN EMAIL.");
      setSubmitState("error");
      emailControl.focus();
      return;
    }

    if (botcheck) {
      setFeedback("BRIEF RECEIVED. THANK YOU.");
      setSubmitState("success");
      form.reset();
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    setIsSubmitting(true);
    setSubmitState("sending");
    setFeedback("SENDING BRIEF…");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `GRIM SIGNAL LABS — Capture brief — ${organization || intent}`,
          from_name: "GRIM SIGNAL LABS website",
          email,
          organization: organization || "Not provided",
          message,
          topic: intent,
          useful_signals: signals,
          target_window: timing,
          reference: reference || "Not provided",
          source: `${window.location.origin}${window.location.pathname}`,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        const serviceMessage = String(result?.message || "Submission failed").trim();
        throw new Error(serviceMessage);
      }

      form.reset();
      setSubmitState("success");
      setFeedback("BRIEF RECEIVED — SENT SUCCESSFULLY.");
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "AbortError";
      const messageText = error instanceof Error ? error.message : "Unknown error";
      setSubmitState("error");
      setFeedback(
        timedOut
          ? "SEND TIMED OUT — PLEASE TRY AGAIN."
          : `SEND FAILED — ${messageText}`,
      );
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        .contact-form-panel {
          display: none;
        }

        .contact-form-panel.is-open,
        .contact-form-panel:target {
          display: block;
        }

        .brief-honeypot {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        .brief-submit:disabled {
          cursor: wait;
          opacity: .68;
          transform: none;
        }

        .brief-feedback-box {
          display: flex;
          align-items: center;
          min-height: 42px;
          margin: 0 0 12px;
          padding: 10px 12px;
          border: 1px solid rgba(255,255,255,.18);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          line-height: 1.35;
          text-transform: uppercase;
        }

        .brief-feedback-box.is-idle {
          visibility: hidden;
        }

        .brief-feedback-box.is-sending {
          border-color: rgba(255,255,255,.42);
        }

        .brief-feedback-box.is-success {
          border-color: rgba(255,255,255,.72);
        }

        .brief-feedback-box.is-error {
          border-color: #d2212d;
        }
      `}</style>

      <section className="contact section-pad" id="contact">
        <div className="contact-signal" aria-hidden="true"><span /></div>
        <div className="section-kicker light">START WITH A PILOT</div>
        <h2>Tell us the scene<br />you need to capture.</h2>
        <p>
          Send us the scenario, required viewpoints and intended usage.
          We’ll turn it into a focused production brief.
        </p>

        <div className="contact-actions">
          <a
            className="button button-light contact-brief-toggle"
            href="#capture-brief"
            aria-expanded={isOpen}
            aria-controls="capture-brief"
          >
            Prepare a capture brief <Arrow />
          </a>

          <div className="contact-email-path">
            <span>OR SEND US AN EMAIL</span>
            <a href="mailto:echo@grimsignallabs.com">
              echo@grimsignallabs.com <Arrow />
            </a>
          </div>
        </div>

        <div className="contact-details">
          <span>KRAKÓW, POLAND / EU FIELD CAPTURE</span>
          <span>CONTACT CHANNEL / ONLINE</span>
        </div>
      </section>

      <section
        className={`contact-form-panel${isOpen ? " is-open" : ""}`}
        id="capture-brief"
        aria-labelledby="brief-title"
      >
        <div className="brief-rail" aria-hidden="true">
          <span>GSL / INTAKE 01</span>
          <b />
          <span>~ 60 SEC</span>
        </div>

        <div className="brief-inner">
          <header className="brief-header">
            <div>
              <div className="section-kicker">QUICK CAPTURE BRIEF</div>
              <h2 id="brief-title">Enough to start<br />a conversation.</h2>
            </div>
            <a
              className="brief-close"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                closeBrief();
              }}
            >
              CLOSE ×
            </a>
          </header>

          <form className="quick-brief-form" onSubmit={handleSubmit} noValidate>
            <input
              className="brief-honeypot"
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="brief-main">
              <label className="brief-field brief-message">
                <span>WHAT DO YOU NEED?</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="A few sentences are enough. Tell us what you need to capture, test or license…"
                  required
                />
              </label>

              <fieldset className="brief-field intent-field">
                <legend>THIS IS ABOUT <i>OPTIONAL</i></legend>
                <div className="intent-options">
                  <label><input type="radio" name="intent" value="Custom capture" defaultChecked /><span>CUSTOM CAPTURE</span></label>
                  <label><input type="radio" name="intent" value="Existing footage" /><span>EXISTING FOOTAGE</span></label>
                  <label><input type="radio" name="intent" value="R&D / validation" /><span>R&amp;D / VALIDATION</span></label>
                  <label><input type="radio" name="intent" value="Not sure yet" /><span>NOT SURE YET</span></label>
                </div>
              </fieldset>
            </div>

            <div className="brief-contact">
              <label className="brief-field">
                <span>WORK EMAIL</span>
                <input name="email" type="email" autoComplete="email" placeholder="name@company.com" required />
              </label>

              <label className="brief-field">
                <span>ORGANIZATION <i>OPTIONAL</i></span>
                <input name="organization" type="text" autoComplete="organization" placeholder="Company / lab" />
              </label>

              <details className="technical-details">
                <summary>ADD TECHNICAL DETAILS <span>OPTIONAL +</span></summary>
                <div className="details-content">
                  <fieldset className="brief-field signal-field">
                    <legend>USEFUL SIGNALS</legend>
                    <div className="mini-options">
                      <label><input type="checkbox" name="signals" value="RGB" /><span>RGB</span></label>
                      <label><input type="checkbox" name="signals" value="Thermal / LWIR" /><span>THERMAL</span></label>
                      <label><input type="checkbox" name="signals" value="Aerial" /><span>AERIAL</span></label>
                      <label><input type="checkbox" name="signals" value="Ground / POV" /><span>GROUND / POV</span></label>
                    </div>
                  </fieldset>

                  <label className="brief-field">
                    <span>TARGET WINDOW</span>
                    <select name="timing" defaultValue="Not fixed">
                      <option value="Not fixed">No fixed date</option>
                      <option value="4–8 weeks">Within 4–8 weeks</option>
                      <option value="2–4 months">Within 2–4 months</option>
                      <option value="Later">Later</option>
                    </select>
                  </label>

                  <label className="brief-field">
                    <span>REFERENCE LINK</span>
                    <input name="reference" type="url" placeholder="https://" />
                  </label>
                </div>
              </details>

              <p
                className={`brief-feedback-box is-${submitState}`}
                role="status"
                aria-live="polite"
              >
                {feedback || "READY"}
              </p>

              <button className="brief-submit" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "SENDING BRIEF…" : "SEND CAPTURE BRIEF"}</span><Arrow />
              </button>
              <p className="brief-privacy">
                Your brief is sent securely to GRIM SIGNAL LABS. We use it only to respond to your inquiry.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
