"use client";

import { FormEvent, useEffect, useState } from "react";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ContactBrief() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  function keepBriefVisible() {
    window.requestAnimationFrame(() => {
      document.getElementById("capture-brief")?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    });
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

    if (isSubmitting) return;

    const form = event.currentTarget;
    setFeedback("");

    const data = new FormData(form);
    const message = String(data.get("message") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const honey = String(data.get("_honey") ?? "").trim();
    const emailControl = form.elements.namedItem("email") as HTMLInputElement;

    if (!message) {
      setFeedback("ADD A SHORT MESSAGE TO CONTINUE.");
      (form.elements.namedItem("message") as HTMLTextAreaElement).focus();
      keepBriefVisible();
      return;
    }

    if (!email || !emailControl.checkValidity()) {
      setFeedback("ADD A VALID RETURN EMAIL.");
      emailControl.focus();
      keepBriefVisible();
      return;
    }

    if (honey) {
      setFeedback("BRIEF RECEIVED. THANK YOU.");
      form.reset();
      keepBriefVisible();
      return;
    }

    const urlControl = form.elements.namedItem("_url") as HTMLInputElement | null;
    if (urlControl) {
      urlControl.value = `${window.location.origin}${window.location.pathname}`;
    }

    setIsSubmitting(true);
    setFeedback("SENDING BRIEF…");
    keepBriefVisible();

    form.submit();

    window.setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
      setFeedback(
        "BRIEF SUBMITTED. IF THIS IS YOUR FIRST TEST, CHECK ECHO@GRIMSIGNALLABS.COM FOR THE ONE-TIME ACTIVATION EMAIL.",
      );
      keepBriefVisible();
    }, 1400);
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

        .brief-honeypot,
        .brief-submit-frame {
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

          <form
            className="quick-brief-form"
            action="https://formsubmit.co/echo@grimsignallabs.com"
            method="POST"
            target="capture-brief-target"
            onSubmit={handleSubmit}
            noValidate
          >
            <input type="hidden" name="_subject" value="GRIM SIGNAL LABS — New capture brief" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_url" value="" />
            <input type="hidden" name="source" value="GRIM SIGNAL LABS website / capture brief" />

            <input
              className="brief-honeypot"
              type="text"
              name="_honey"
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

              <button className="brief-submit" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "SENDING BRIEF…" : "SEND CAPTURE BRIEF"}</span><Arrow />
              </button>
              <p className="brief-privacy">
                Your brief is sent to GRIM SIGNAL LABS without opening your email app.
              </p>
              <p className="brief-feedback" role="status" aria-live="polite">{feedback}</p>
            </div>
          </form>

          <iframe
            className="brief-submit-frame"
            name="capture-brief-target"
            title="Capture brief submission"
          />
        </div>
      </section>
    </>
  );
}
