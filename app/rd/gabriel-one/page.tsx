import type { Metadata } from "next";
import SiteHeader from "../../site-header";

export const metadata: Metadata = {
  title: "GABRIEL ONE - Research Preview | GRIM SIGNAL LABS",
  description:
    "GABRIEL ONE explores UAV-assisted casualty tracking, continuity of observation and reassessment support for complex incidents.",
  openGraph: {
    title: "GABRIEL ONE - Research Preview",
    description:
      "UAV-assisted casualty tracking and reassessment support for complex incidents.",
    images: [
      {
        url: "/og.png",
        width: 600,
        height: 750,
        alt: "GABRIEL ONE research preview by GRIM SIGNAL LABS",
      },
    ],
  },
};

const workflow = [
  ["OBSERVE", "Detect or confirm a casualty from the aerial view."],
  ["ASSIGN ID", "Maintain a simple persistent reference such as P01, P02 or P03."],
  ["REMEMBER", "Retain the previous observation instead of treating every frame as a new event."],
  ["REASSESS", "Bring the casualty back to the operator's attention when another look is required."],
  ["UPDATE", "Record the new observation and continue the operational picture."],
];

const researchFocus = [
  "Continuity of casualty identity across repeated UAV observations",
  "Operator workload and reassessment prompts in complex scenes",
  "Performance under occlusion, movement and degraded visibility",
  "Field validation against known ground truth",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function GabrielOnePage() {
  return (
    <main className="gabriel-page" id="top">
      <SiteHeader homePrefix="../../" />

      <section className="gabriel-hero">
        <div className="gabriel-hero-grid" aria-hidden="true" />
        <div className="gabriel-hero-copy">
          <div className="eyebrow"><span /> GRIM SIGNAL LABS / R&amp;D</div>
          <div className="gabriel-statusline">
            <span>RESEARCH PREVIEW</span>
            <span>ACTIVE DEVELOPMENT</span>
            <span>LIMITED ACCESS</span>
          </div>
          <h1>GABRIEL <em>ONE</em></h1>
          <p className="gabriel-lead">
            UAV-assisted casualty tracking and reassessment support for complex incidents.
          </p>
          <p className="gabriel-question">
            A drone can find a casualty. What happens five minutes later?
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="mailto:echo@grimsignallabs.com?subject=GABRIEL%20ONE%20-%20Early%20Access"
            >
              Request early access <Arrow />
            </a>
            <a className="button button-ghost" href="#concept">Explore the concept</a>
          </div>
        </div>

        <a
          className="gabriel-poster"
          href="/gabriel-one-hero.webp"
          aria-label="Open the GABRIEL ONE research preview key visual"
        >
          <img
            src="/gabriel-one-hero.webp"
            alt="GABRIEL ONE - drone-assisted casualty tracking research preview"
            width="600"
            height="750"
          />
        </a>

        <div className="hero-index">R&amp;D / GABRIEL ONE / RESEARCH PREVIEW</div>
      </section>

      <section className="gabriel-intro section-pad" id="concept">
        <div className="section-kicker">THE QUESTION</div>
        <div>
          <h2>Detection is only the first observation.</h2>
          <p>
            In a complex incident, an aerial team may identify several casualties quickly.
            The operational problem continues after first detection: who has already been
            observed, what was seen, and who needs another look.
          </p>
          <p>
            GABRIEL ONE is an experimental operator-support concept built around continuity.
            The system is intended to keep a lightweight memory of observed casualties and
            return them to the operator's attention for reassessment.
          </p>
        </div>
      </section>

      <section className="gabriel-workflow section-pad">
        <div className="gabriel-section-head">
          <div>
            <div className="section-kicker light">CORE LOOP</div>
            <h2>Observe. Remember. Return.</h2>
          </div>
          <p>
            The first prototype is deliberately narrow. One recorded UAV sequence, several
            identified casualties and one clear reassessment workflow.
          </p>
        </div>

        <ol className="gabriel-loop">
          {workflow.map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="gabriel-signal section-pad">
        <div className="section-kicker light">OPERATOR VIEW / CONCEPT</div>
        <div className="gabriel-signal-grid">
          <article>
            <small>P01</small>
            <strong>OBSERVED</strong>
            <span>Previous observation retained</span>
          </article>
          <article className="is-alert">
            <small>P02</small>
            <strong>REASSESSMENT REQUIRED</strong>
            <span>Return to casualty</span>
          </article>
          <article>
            <small>P03</small>
            <strong>STATUS UPDATED</strong>
            <span>Operational picture continues</span>
          </article>
        </div>
      </section>

      <section className="gabriel-research section-pad">
        <div className="gabriel-research-copy">
          <div className="section-kicker">CURRENT RESEARCH FOCUS</div>
          <h2>Field first.</h2>
          <p>
            GABRIEL ONE is being developed as a research preview for practical evaluation
            with UAV operators, SAR teams, EMS and emergency-response partners.
          </p>
        </div>
        <ul>
          {researchFocus.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="gabriel-now section-pad">
        <div>
          <div className="section-kicker light">CURRENT PHASE</div>
          <h2>Small prototype. One question at a time.</h2>
        </div>
        <div className="gabriel-now-copy">
          <p>
            The Research Preview starts with previously recorded UAV video and an
            operator-in-the-loop workflow. Live aircraft integration comes later.
          </p>
          <p>
            We are keeping the technical implementation intentionally undisclosed while
            the core workflow is being tested in the field.
          </p>
          <div className="gabriel-phase">
            <span><small>STATUS</small> ACTIVE DEVELOPMENT</span>
            <span><small>ACCESS</small> LIMITED</span>
            <span><small>FIELD TESTING</small> 2026</span>
          </div>
        </div>
      </section>

      <section className="gabriel-access section-pad">
        <div className="section-kicker">EARLY ACCESS / FIELD PARTNERS</div>
        <h2>Bring us a real operational problem.</h2>
        <p>
          We are looking for UAV operators, SAR teams, EMS, disaster-response groups,
          robotics teams and research partners willing to challenge the concept with
          practical field feedback.
        </p>
        <a
          className="button button-primary"
          href="mailto:echo@grimsignallabs.com?subject=GABRIEL%20ONE%20-%20Early%20Access&body=Organization%3A%0ACountry%3A%0AUse%20case%3A%0AUAV%20platform%3A%0A"
        >
          Request early access <Arrow />
        </a>
        <div className="gabriel-disclaimer">
          EXPERIMENTAL R&amp;D CONCEPT - OPERATOR SUPPORT - NO AUTONOMOUS TRIAGE DECISIONS
        </div>
      </section>

      <footer>
        <div className="footer-identity">
          <a className="brand footer-brand" href="../../#top">
            <img
              className="brand-logo"
              src="/grim-signal-labs-logo.png"
              alt="GRIM SIGNAL LABS"
              width="1741"
              height="412"
            />
          </a>
          <p>REAL-WORLD DATA / FIELD VALIDATION / EXPERIMENTAL R&amp;D.</p>
        </div>
        <div className="footer-legal">
          <a href="mailto:echo@grimsignallabs.com">ECHO@GRIMSIGNALLABS.COM</a>
          <span>OPERATED BY H-CORE EDU</span>
          <span>VAT ID: PL6922069523</span>
          <span>KRAKÓW, POLAND / EU</span>
          <span>© 2026 GRIM SIGNAL LABS</span>
        </div>
      </footer>
    </main>
  );
}
