"use client";

import { FormEvent, useEffect, useState } from "react";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ContactBrief() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const message = String(data.get("message") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const reference = String(data.get("reference") ?? "").trim();
    const emailControl = form.elements.namedItem("email") as HTMLInputElement;

    if (!message) {
      setFeedback("ADD A SHORT MESSAGE TO CONTINUE.");
      (form.elements.namedItem("message") as HTMLTextAreaElement).focus();
      return;
    }

    if (!email || !emailControl.checkValidity()) {
      setFeedback("ADD A VALID RETURN EMAIL.");
      emailControl.focus();
      return;
    }

    const signals = data.getAll("signals").join(", ") || "Not specified";
    const subject = `Capture brief — ${organization || data.get("intent") || "new inquiry"}`;
    const body = [
      "GRIM SIGNAL LABS / QUICK CAPTURE BRIEF",
      "",
      `MESSAGE\n${message}`,
      "",
      `TOPIC\n${data.get("intent") || "Not specified"}`,
      "",
      `USEFUL SIGNALS\n${signals}`,
      "",
      `TARGET WINDOW\n${data.get("timing") || "Not specified"}`,
      "",
      `REFERENCE\n${reference || "Not provided"}`,
      "",
      `CONTACT\n${email}\n${organization || "Organization not provided"}`,
    ].join("\n");

    window.location.href =
      `mailto:echo@grimsignallabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

              <button className="brief-submit" type="submit">
                <span>CREATE EMAIL DRAFT</span><Arrow />
              </button>
              <p className="brief-privacy">
                Nothing is sent automatically. You review the email before sending.
              </p>
              <p className="brief-feedback" role="status" aria-live="polite">{feedback}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
