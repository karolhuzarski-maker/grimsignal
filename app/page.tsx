import SiteHeader from "./site-header";
import DroneVisual from "./drone-visual";

const offers = [
  {
    index: "01",
    title: "Custom multisensor capture",
    text: "We stage and record the hard-to-source scenes you need — using the viewpoints, sensors, conditions and file specification defined in your brief.",
    tag: "RECORDED TO BRIEF",
  },
  {
    index: "02",
    title: "Licensable footage packs",
    text: "Rights-cleared RGB, thermal and responder-view sequences covering difficult human, terrain and emergency conditions.",
    tag: "CLEAR USAGE RIGHTS",
  },
  {
    index: "03",
    title: "Scenario production",
    text: "Controlled emergency, rescue and human-activity scenes produced with actors, props, locations and field-domain supervision.",
    tag: "CONTROLLED CONDITIONS",
  },
];

const useCases = [
  "Model-training footage",
  "Search and rescue scenes",
  "Human activity in degraded visibility",
  "Emergency response sequences",
  "Aerial–ground multisensor footage",
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
          <h1>Capture the scene<br />you can’t download.</h1>
          <p>
            Rights-cleared, synchronized RGB, thermal, aerial, ground and
            responder-view footage for AI teams, robotics developers and R&amp;D.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Commission a capture <Arrow /></a>
            <a className="button button-ghost" href="#data">Explore footage formats</a>
          </div>
        </div>

        <div className="sensor-stage" aria-label="Hero graphic showing a multisensor UAV and synchronized capture streams">
          <DroneVisual />
        </div>

        <div className="hero-index">01 — UAV / SIGNAL ACQUISITION</div>
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
          <h2>Rare scenes are<br />hard to source.</h2>
          <p>
            Stock libraries cover the ordinary. We record the operational edge:
            people on the ground, partial occlusion, smoke, low light, difficult
            terrain and coordinated response — with the metadata and provenance
            needed for commercial AI, robotics and R&amp;D use.
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
          <div className="section-kicker light">FOOTAGE PACKAGE</div>
          <h2>One scene.<br />Every useful angle.</h2>
          <p>
            Each production is delivered as an organized footage package — not
            an anonymous folder of clips. Camera files, synchronization records,
            scene notes and usage rights travel together in a Capture Manifest.
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
            <div><dt>Usage rights</dt><dd>CONSENTED / LICENSED / DOCUMENTED</dd></div>
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
          <p>Starting collections for commercial licensing, model training, product demonstrations and R&amp;D.</p>
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
        <h2>Field reality, captured<br />from every useful viewpoint.</h2>
        <div className="why-grid">
          <article>
            <span>01</span>
            <h3>Operational domain knowledge</h3>
            <p>Emergency scenarios designed with field medical and training expertise — not stock-footage assumptions.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Controlled complexity</h3>
            <p>We control visibility, posture, movement, occlusion and response actions while preserving a clear production record.</p>
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
          <h2>From capture brief<br />to licensed footage.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Brief</strong><p>Required scene, viewpoints, sensors, conditions and intended usage.</p></div></li>
          <li><span>02</span><div><strong>Stage</strong><p>Rights-cleared location, actors, actions, props and shot plan.</p></div></li>
          <li><span>03</span><div><strong>Capture</strong><p>Synchronized aerial, thermal, ground and responder views.</p></div></li>
          <li><span>04</span><div><strong>Deliver</strong><p>Organized files, synchronization sheet, Capture Manifest and commercial license.</p></div></li>
        </ol>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-signal" aria-hidden="true"><span /></div>
        <div className="section-kicker light">START WITH A PILOT</div>
        <h2>Tell us the scene<br />you need to capture.</h2>
        <p>
          Send us the scenario, required viewpoints, sensor format and intended
          usage. We’ll turn it into a focused production brief.
        </p>
        <a className="button button-light" href="#contact-details">Prepare a capture brief <Arrow /></a>
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
