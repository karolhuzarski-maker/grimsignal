import SiteHeader from "./site-header";

const offers = [
  {
    index: "01",
    title: "Custom capture missions",
    text: "We stage and record the edge cases your perception stack is missing — to your sensor, scenario and annotation specification.",
    tag: "BUILT TO SPEC",
  },
  {
    index: "02",
    title: "Licensable data packs",
    text: "Rights-cleared RGB, thermal and responder-view sequences covering difficult human, terrain and emergency conditions.",
    tag: "READY TO LICENSE",
  },
  {
    index: "03",
    title: "Evaluation missions",
    text: "Unseen scenes, controlled ground truth and structured error reporting for independent model and sensor validation.",
    tag: "BLIND TESTING",
  },
];

const useCases = [
  "Casualty detection & localization",
  "Search and rescue perception",
  "Human detection in degraded visibility",
  "Responder action recognition",
  "Aerial–ground sensor fusion",
  "Public-safety robotics evaluation",
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
          <div className="eyebrow"><span /> REAL-WORLD DATA / PHYSICAL AI</div>
          <h1>Train for the scene<br />you can’t download.</h1>
          <p>
            Rights-cleared, synchronized RGB, thermal and ground-level data for
            computer vision, autonomous systems and mission-critical AI.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Request a pilot capture <Arrow /></a>
            <a className="button button-ghost" href="#data">Inspect the data model</a>
          </div>
        </div>

        <div className="sensor-stage" aria-label="Illustration of synchronized multisensor capture">
          <div className="stage-topline">
            <span>MISSION / GSL-MCI-01</span>
            <span className="live"><i /> CAPTURE READY</span>
          </div>
          <div className="sensor-view">
            <div className="terrain terrain-one" />
            <div className="terrain terrain-two" />
            <div className="terrain terrain-three" />
            <span className="target target-one"><i>01</i></span>
            <span className="target target-two"><i>02</i></span>
            <span className="target target-three"><i>03</i></span>
            <div className="crosshair"><span /><i /></div>
            <div className="view-label">AERIAL RGB / 4K</div>
            <div className="timecode">TC 00:14:27:08</div>
          </div>
          <div className="sensor-strip">
            <div className="sensor-chip active"><span>RGB</span><strong>4K / 25</strong></div>
            <div className="sensor-chip thermal"><span>THERMAL</span><strong>R-JPEG</strong></div>
            <div className="sensor-chip"><span>GROUND</span><strong>4K / 50</strong></div>
            <div className="sensor-chip"><span>POV</span><strong>4K / 50</strong></div>
          </div>
          <div className="sync-line">
            <span>4 STREAMS SYNCHRONIZED</span>
            <div><i /><i /><i /><i /><i /><i /></div>
            <strong>Δ 12 ms</strong>
          </div>
        </div>

        <div className="hero-index">01 — SIGNAL ACQUISITION</div>
      </section>

      <section className="proof-strip" aria-label="Core standards">
        <span>RIGHTS-CLEARED</span>
        <span>MULTIMODAL</span>
        <span>TIME-SYNCHRONIZED</span>
        <span>DOMAIN-LED</span>
        <span>CAPTURED IN THE EU</span>
      </section>

      <section className="intro section-pad" id="capabilities">
        <div className="section-kicker">THE GAP</div>
        <div className="intro-body">
          <h2>Rare events create<br />expensive blind spots.</h2>
          <p>
            Open datasets cover the ordinary. We capture the operational edge:
            people on the ground, partial occlusion, smoke, low light, difficult
            terrain and coordinated response — with the metadata and provenance
            needed for serious R&amp;D.
          </p>
        </div>
      </section>

      <section className="offer-grid section-pad">
        {offers.map((offer) => (
          <article className="offer-card" key={offer.index}>
            <div className="card-head"><span>{offer.index}</span><small>{offer.tag}</small></div>
            <h3>{offer.title}</h3>
            <p>{offer.text}</p>
            <a href="#contact" aria-label={`Discuss ${offer.title}`}>Discuss a brief <Arrow /></a>
          </article>
        ))}
      </section>

      <section className="data-section section-pad" id="data">
        <div className="data-copy">
          <div className="section-kicker light">DATA ARCHITECTURE</div>
          <h2>One event.<br />Every useful signal.</h2>
          <p>
            Each mission is designed as a structured data product — not a folder
            of footage. Sensor files, labels, scenario truth and licensing travel
            together in a documented Dataset Passport.
          </p>
          <ul className="use-list">
            {useCases.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
            ))}
          </ul>
        </div>

        <div className="passport">
          <div className="passport-head">
            <div><small>GSL DATASET PASSPORT</small><strong>MCI / EDGE 01</strong></div>
            <span>v1.0</span>
          </div>
          <div className="passport-preview">
            <div className="heat heat-a" />
            <div className="heat heat-b" />
            <div className="heat heat-c" />
            <div className="box box-a"><span>CASUALTY_02</span></div>
            <div className="box box-b"><span>RESPONDER_01</span></div>
            <span className="thermal-label">THERMAL / PALETTE: WHITE HOT</span>
          </div>
          <dl className="passport-meta">
            <div><dt>Streams</dt><dd>RGB / LWIR / POV / GROUND</dd></div>
            <div><dt>Annotations</dt><dd>BBOX / MASK / TRACK / EVENT</dd></div>
            <div><dt>Ground truth</dt><dd>POSITION / STATE / ACTION / TIME</dd></div>
            <div><dt>Delivery</dt><dd>RAW + COCO / YOLO / JSON</dd></div>
            <div><dt>Provenance</dt><dd>CONSENTED / LICENSED / DOCUMENTED</dd></div>
          </dl>
          <div className="passport-foot"><span>SCENARIO HASH</span><code>GS1-EU-MCI-8F31</code></div>
        </div>
      </section>

      <section className="library section-pad">
        <div className="library-head">
          <div>
            <div className="section-kicker">MISSION LIBRARY</div>
            <h2>Built around the hard parts.</h2>
          </div>
          <p>Starting collections for perception training, model evaluation and sensor benchmarking.</p>
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
        <h2>Field reality, translated<br />into machine-readable truth.</h2>
        <div className="why-grid">
          <article>
            <span>01</span>
            <h3>Operational domain knowledge</h3>
            <p>Emergency scenarios designed with field medical and training expertise — not stock-footage assumptions.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Controlled complexity</h3>
            <p>We vary visibility, posture, movement, occlusion and response actions without losing ground truth.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Commercially usable</h3>
            <p>Consent, provenance, scenario documentation and licensing are part of the deliverable from day one.</p>
          </article>
        </div>
      </section>

      <section className="method section-pad" id="method">
        <div className="method-title">
          <div className="section-kicker">MISSION WORKFLOW</div>
          <h2>From model gap<br />to field data.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Define</strong><p>Failure mode, sensors, conditions and output schema.</p></div></li>
          <li><span>02</span><div><strong>Stage</strong><p>Rights-cleared scene, actors, props and measurable truth.</p></div></li>
          <li><span>03</span><div><strong>Capture</strong><p>Synchronized aerial, thermal, ground and responder views.</p></div></li>
          <li><span>04</span><div><strong>Deliver</strong><p>Validated files, annotations, data card and commercial license.</p></div></li>
        </ol>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-signal" aria-hidden="true"><span /></div>
        <div className="section-kicker light">START WITH A PILOT</div>
        <h2>Show us what your model<br />fails to see.</h2>
        <p>
          Send us the missing scenario, target sensor and required labels. We’ll
          turn it into a focused capture brief.
        </p>
        <a className="button button-light" href="#contact-details">Prepare a mission brief <Arrow /></a>
        <div className="contact-details" id="contact-details">
          <span>KRAKÓW, POLAND / EU FIELD CAPTURE</span>
          <span>CONTACT CHANNEL TO BE ADDED BEFORE PUBLIC LAUNCH</span>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <img
            className="brand-logo"
            src="/grim-signal-labs-logo.png"
            alt="GRIM SIGNAL LABS"
            width="1741"
            height="412"
          />
        </a>
        <p>REAL-WORLD MULTIMODAL DATA FOR PHYSICAL AI.</p>
        <span>© 2026 GRIM SIGNAL LABS</span>
      </footer>
    </main>
  );
}
