import SiteHeader from "./site-header";
import DroneVisual from "./drone-visual";
import ContactBrief from "./contact-brief";

const offers = [
  {
    index: "01",
    title: "Custom Pilot Capture — from €1,000",
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
  "Crisis AI validation",
  "RGB / thermal multimodal research",
  "AI performance degradation",
  "Human detection in degraded environments",
  "UAV and ground sensor fusion",
  "Real-world benchmarking",
  "Physical AI for SAR and disaster response",
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
          <article className="offer-card" key={offer.index}>
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
          <div className="passport-head">
            <div><small>GSL CAPTURE MANIFEST</small><strong>MCI / MULTIVIEW 01</strong></div>
            <span>v1.0</span>
          </div>
          <div className="passport-preview">
            <div className="heat heat-a" />
            <div className="heat heat-b" />
            <div className="heat heat-c" />
            <span className="thermal-label">THERMAL / PALETTE: WHITE HOT</span>
          </div>
          <dl className="passport-meta">
            <div><dt>Streams</dt><dd>RGB / LWIR / POV / GROUND</dd></div>
            <div><dt>Recording</dt><dd>4K VIDEO / RADIOMETRIC THERMAL</dd></div>
            <div><dt>Scene record</dt><dd>TAKE / ACTION / CAMERA / TIMECODE</dd></div>
            <div><dt>Delivery</dt><dd>RAW / MASTER / PROXY / SELECTS</dd></div>
            <div><dt>Ground truth</dt><dd>DEFINED PER PROJECT SCOPE</dd></div>
          </dl>
          <div className="passport-foot"><span>SCENARIO HASH</span><code>GS1-EU-MCI-8F31</code></div>
        </div>
      </section>

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
            sensing, real-world benchmarking and AI performance under operational
            stress.
          </p>
        </div>
        <ul className="research-list">
          {researchAreas.map((area, index) => (
            <li key={area}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {area}
            </li>
          ))}
        </ul>
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
