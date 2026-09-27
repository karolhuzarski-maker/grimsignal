import SiteHeader from "./site-header";
import DroneVisual from "./drone-visual";
import ContactBrief from "./contact-brief";
import FieldSample from "./field-sample";

const offers = [
  {
    index: "01",
    title: "Custom Pilot Capture — from €2,500",
    text: "A tightly scoped proof-of-concept for one agreed model failure or data gap: scenario design, field capture, RAW data and baseline metadata / ground truth within the agreed scope.",
    tag: "LOW-RISK ENTRY POINT",
  },
  {
    index: "02",
    title: "Custom edge-case datasets",
    text: "We design and capture the hard-to-source scenes your model needs — around a specific failure mode, sensor stack, environment and annotation requirement.",
    tag: "BUILT TO YOUR FAILURE MODE",
  },
  {
    index: "03",
    title: "Licensable mission datasets",
    text: "Rights-cleared RGB, thermal, aerial, ground and responder-view sequences covering difficult human, terrain and emergency conditions.",
    tag: "CLEAR USAGE RIGHTS",
  },
];

const useCases = [
  "Mass-casualty / MCI scene understanding",
  "Search & rescue detection",
  "Human activity in degraded visibility",
  "Emergency response sequences",
  "Aerial–ground multisensor fusion",
  "Robotics and computer vision R&D",
];

const packs = [
  {
    code: "THL",
    name: "Thermal Human Library",
    description: "Human signatures across posture, distance, occlusion, terrain and ambient conditions.",
  },
  {
    code: "MES",
    name: "Multiview Emergency Scenarios",
    description: "One event captured simultaneously from air, ground, body and thermal sensors.",
  },
  {
    code: "RPOV",
    name: "Responder POV",
    description: "First-person operational sequences for action, workflow and interaction understanding.",
  },
  {
    code: "EDGE",
    name: "EdgeCase Missions",
    description: "Smoke, darkness, clutter, partial visibility and difficult terrain by design.",
  },
];

const researchAreas = [
  "Crisis AI & computer vision",
  "RGB / thermal / multisensor data",
  "UAV & Physical AI",
  "Field validation & edge-case benchmarking",
];

const gabrielWorkflow = [
  ["OBSERVE", "Detect or confirm a casualty from the aerial view."],
  ["ASSIGN ID", "Maintain a simple persistent reference such as P01, P02 or P03."],
  ["REMEMBER", "Retain the previous observation instead of treating every frame as a new event."],
  ["REASSESS", "Bring the casualty back to the operator's attention when another look is required."],
  ["UPDATE", "Record the new observation and continue the operational picture."],
];

const gabrielResearch = [
  "Continuity of casualty identity across repeated UAV observations",
  "Operator workload and reassessment prompts in complex scenes",
  "Performance under occlusion, movement and degraded visibility",
  "Field validation against known ground truth",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> CUSTOM REAL-WORLD DATA / AI + CV</div>
          <h1>We design and capture<br />the edge cases your model is missing.</h1>
          <p>
            Custom multisensor datasets for mass-casualty, search &amp; rescue and
            complex field environments — RGB, thermal, UAV, ground and responder-view.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#capture-brief">Tell us what your model fails to see <Arrow /></a>
            <a className="button button-ghost" href="#data">See what we capture</a>
          </div>
        </div>

        <div className="sensor-stage" aria-label="Hero graphic showing a multisensor UAV and synchronized capture streams">
          <DroneVisual />
        </div>

        <div className="hero-index">01 — CUSTOM EDGE-CASE DATASETS</div>
      </section>

      <section className="proof-strip" aria-label="Core standards">
        <span>RIGHTS-CLEARED</span>
        <span>MULTIMODAL</span>
        <span>TIME-SYNCHRONIZED</span>
        <span>DOMAIN-LED</span>
        <span>CAPTURED IN THE EU</span>
      </section>

      <section className="intro section-pad" id="capabilities">
        <div className="section-kicker">THE DATA GAP</div>
        <div className="intro-body">
          <h2>Your hardest failure cases<br />rarely exist in stock libraries.</h2>
          <p>
            Tell us where the model breaks. We turn that failure mode into a controlled
            field scenario, capture it from the sensor viewpoints you need, and deliver
            a documented dataset built for validation, fine-tuning or benchmarking.
          </p>
        </div>
      </section>

      <section className="offer-grid section-pad">
        {offers.map((offer) => (
          <article className={`offer-card${offer.index === "01" ? " offer-card-featured" : ""}`} key={offer.index}>
            <div className="card-head"><span>{offer.index}</span><small>{offer.tag}</small></div>
            <h3>{offer.title}</h3>
            <p>{offer.text}</p>
            <a href="#capture-brief" aria-label={`Discuss ${offer.title}`}>Request a dataset <Arrow /></a>
          </article>
        ))}
      </section>

      <section className="data-section section-pad" id="data">
        <div className="data-copy">
          <div className="section-kicker light">WHAT WE CAPTURE</div>
          <h2>One hard case.<br />Every useful sensor view.</h2>
          <p>
            Each production is delivered as an organized dataset package — not an
            anonymous folder of clips. Camera files, synchronization records, scenario
            notes, provenance and agreed metadata / ground truth travel together.
          </p>
          <ul className="use-list">
            {useCases.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
            ))}
          </ul>
        </div>

        <div className="passport">
          <img
            src="/gsl-mci-multiview-01.webp"
            alt="GRIM SIGNAL LABS MCI Multiview capture manifest with thermal and RGB views"
            width="1448"
            height="1086"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
      </section>

      <FieldSample />

      <section className="library section-pad">
        <div className="library-head">
          <div>
            <div className="section-kicker">HARD CASES</div>
            <h2>Built around conditions<br />that break perception systems.</h2>
          </div>
          <p>Examples of the difficult scenarios and sensor combinations we can design, stage and capture.</p>
        </div>
        <div className="pack-list">
          {packs.map((pack) => (
            <article className="pack-row" key={pack.code}>
              <span>{pack.code}</span>
              <h3>{pack.name}</h3>
              <p>{pack.description}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </section>

      <section className="why section-pad">
        <div className="section-kicker light">WHY GRIM SIGNAL LABS</div>
        <h2>We are not a drone company.<br />We build missing field data.</h2>
        <div className="why-grid">
          <article>
            <span>01</span>
            <h3>Failure-mode first</h3>
            <p>We start with what your model misses, confuses or cannot reliably detect — then design the capture around that data gap.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Controlled field complexity</h3>
            <p>RGB, thermal, UAV, ground cameras and POV/bodycam across smoke, darkness, occlusion, clutter and difficult terrain.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Operationally credible</h3>
            <p>MCI, SAR and emergency-response scenarios are shaped by real field-domain knowledge, with documented provenance and commercial usage rights.</p>
          </article>
        </div>
      </section>

      <section className="method section-pad" id="method">
        <div className="method-title">
          <div className="section-kicker">HOW TO REQUEST A CUSTOM DATASET</div>
          <h2>From model failure<br />to usable field data.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Describe the failure</strong><p>Tell us what the model fails to see, classify or track — and under which conditions.</p></div></li>
          <li><span>02</span><div><strong>Define the capture</strong><p>We agree scenario, sensors, viewpoints, conditions, metadata / ground truth and delivery scope.</p></div></li>
          <li><span>03</span><div><strong>Stage &amp; capture</strong><p>We produce the field scenario and record synchronized aerial, thermal, ground and responder views as required.</p></div></li>
          <li><span>04</span><div><strong>Deliver the dataset</strong><p>RAW data, organized files, capture manifest, agreed annotations / metadata and licensing documentation.</p></div></li>
        </ol>
      </section>

      <section className="research section-pad" id="research">
        <div className="research-copy">
          <div className="section-kicker light">REAL-WORLD VALIDATION FOR PHYSICAL AI</div>
          <h2>Research &amp; Development</h2>
          <p>
            GRIM SIGNAL LABS develops and tests methods for evaluating AI systems
            in realistic crisis environments. Our R&amp;D focuses on multimodal RGB
            and thermal data, degraded visual conditions, UAV and ground-based
            sensing, aerial perception, real-world benchmarking and AI performance
            under operational stress.
          </p>
        </div>
        <ul className="research-list">
          {researchAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>

        <a className="gabriel-teaser gabriel-preview-trigger" href="#gabriel-preview" aria-label="Expand GABRIEL ONE Research Preview">
          <div className="gabriel-teaser-image">
            <img
              src="/gabriel-one-hero.webp"
              alt="GABRIEL ONE - drone-assisted casualty tracking research preview"
              width="800"
              height="1000"
            />
          </div>
          <div className="gabriel-teaser-copy">
            <div className="section-kicker light">ACTIVE R&amp;D PROGRAM</div>
            <h3>GABRIEL <em>ONE</em></h3>
            <p>
              Experimental UAV-assisted casualty tracking and reassessment support
              for complex incidents.
            </p>
            <span>OPEN RESEARCH PREVIEW ↓</span>
          </div>
        </a>
      </section>

      <section className="gabriel-inline-preview" id="gabriel-preview" aria-label="GABRIEL ONE Research Preview">
        <div className="gabriel-inline-shell">
          <div className="gabriel-inline-rail">
            <span>GABRIEL ONE</span>
            <span>RESEARCH PREVIEW</span>
            <span>ACTIVE DEVELOPMENT</span>
          </div>

          <div className="gabriel-inline-content">
            <div className="gabriel-inline-topbar">
              <div>
                <div className="section-kicker light">GABRIEL ONE / RESEARCH PREVIEW</div>
                <span className="gabriel-inline-code">TEMPORAL SCENE MEMORY / UAV OPERATOR SUPPORT</span>
              </div>
            </div>

            <div className="gabriel-inline-hero gabriel-inline-hero-text">
              <div>
                <h2>From detection<br />to continuity.</h2>
                <p className="gabriel-inline-lead">
                  GABRIEL ONE explores a temporal memory layer for UAV operations - keeping track
                  of who was seen, where, when and when another observation may be needed.
                </p>
                <div className="gabriel-statusline">
                  <span>RESEARCH PREVIEW</span>
                  <span>ACTIVE DEVELOPMENT</span>
                  <span>OPERATOR IN THE LOOP</span>
                </div>
              </div>
            </div>

            <div className="gabriel-system-thesis">
              <article>
                <small>01 / ENTITY MEMORY</small>
                <strong>PERSISTENT CASUALTY ID</strong>
                <p>Keep a stable reference to the same person across repeated observations.</p>
              </article>
              <article>
                <small>02 / TEMPORAL STATE</small>
                <strong>OBSERVATION HISTORY</strong>
                <p>Link what was seen now with what was seen before instead of losing context frame by frame.</p>
              </article>
              <article>
                <small>03 / REVISIT LOGIC</small>
                <strong>REASSESSMENT CUES</strong>
                <p>Surface who may need another look and return attention to the right point in the scene.</p>
              </article>
              <article>
                <small>04 / HUMAN CONTROL</small>
                <strong>OPERATOR DECIDES</strong>
                <p>Keep the system as decision support: transparent cues, traceable observations, human confirmation.</p>
              </article>
            </div>

            <div className="gabriel-inline-block gabriel-loop-block">
              <div className="section-kicker light">CORE LOOP</div>
              <div>
                <h3>Observe. Remember. Return.</h3>
                <ol className="gabriel-inline-loop">
                  {gabrielWorkflow.map(([title, text], index) => (
                    <li key={title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{title}</strong>
                      <p>{text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="gabriel-inline-signal">
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

            <div className="gabriel-inline-block">
              <div className="section-kicker light">CURRENT RESEARCH FOCUS</div>
              <ul className="gabriel-inline-focus">
                {gabrielResearch.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="gabriel-vision">
              <div className="section-kicker light">VISION / BEYOND THE FIRST DEMO</div>
              <div className="gabriel-vision-grid">
                <div>
                  <h3>A live operational memory layer above the video feed.</h3>
                  <p>
                    The wider direction is a system that carries scene context forward while the
                    aircraft, camera angle and operator change.
                  </p>
                </div>
                <ul>
                  <li><span>GEO</span> Georeferenced casualty positions and revisit points</li>
                  <li><span>TIME</span> Time-stamped observation history and reassessment windows</li>
                  <li><span>MULTI</span> RGB / thermal observations linked to the same operational entity</li>
                  <li><span>HANDOFF</span> Continuity between operators, aircraft and later response teams</li>
                  <li><span>TRACE</span> A reviewable record of what the system suggested and what the operator confirmed</li>
                </ul>
              </div>
              <div className="gabriel-vision-note">
                VISION DIRECTION - NOT A CLAIM OF CURRENT CAPABILITY
              </div>
            </div>

            <div className="gabriel-inline-access">
              <div>
                <div className="section-kicker">EARLY ACCESS / FIELD PARTNERS</div>
                <h3>Bring us a real operational problem.</h3>
                <p>
                  We are looking for UAV operators, SAR teams, EMS, disaster-response groups,
                  robotics teams and research partners willing to challenge the concept with
                  practical field feedback.
                </p>
              </div>
              <a
                className="button button-primary"
                href="mailto:echo@grimsignallabs.com?subject=GABRIEL%20ONE%20-%20Early%20Access&body=Organization%3A%0ACountry%3A%0AUse%20case%3A%0AUAV%20platform%3A%0A"
              >
                Request early access <Arrow />
              </a>
              <small>EXPERIMENTAL R&amp;D CONCEPT / OPERATOR SUPPORT / NO AUTONOMOUS TRIAGE DECISIONS</small>
              <a className="gabriel-close gabriel-close-bottom" href="#research" aria-label="Close GABRIEL ONE preview">
                CLOSE RESEARCH PREVIEW ↑
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactBrief />

      <footer>
        <div className="footer-identity">
          <a className="brand footer-brand" href="#top">
            <img
              className="brand-logo"
              src="/grim-signal-labs-logo.png"
              alt="GRIM SIGNAL LABS"
              width="1741"
              height="412"
            />
          </a>
          <p>CUSTOM REAL-WORLD EDGE-CASE DATASETS FOR AI / CV.</p>
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
