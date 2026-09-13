export default function FieldSample() {
  return (
    <section className="field-sample section-pad" id="field-sample">
      <div className="field-sample-head">
        <div>
          <div className="section-kicker">FIELD SAMPLE / CAPTURE 001</div>
          <h2>Real data.<br />Already in the field.</h2>
        </div>
        <div className="field-sample-copy">
          <p>
            A small public sample from a controlled emergency-response training scenario in Poland.
            UAV RGB and thermal views show the kind of paired field material we are already capturing
            for computer-vision and Physical AI work.
          </p>
          <div className="field-sample-tags" aria-label="Capture modalities">
            <span>UAV RGB</span>
            <span>LWIR / THERMAL</span>
            <span>MULTIVIEW</span>
            <span>REAL-WORLD</span>
          </div>
        </div>
      </div>

      <div className="field-reel">
        <figure className="field-tile field-tile-video">
          <video
            src="gsl-field-sample.mp4"
            poster="gsl-field-video-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Thermal UAV field capture from a controlled training scenario"
          />
          <figcaption><span>01 / MOTION</span><strong>THERMAL UAV SEQUENCE</strong><small>18 SEC LOOP</small></figcaption>
        </figure>

        <figure className="field-tile field-tile-wide">
          <img
            src="gsl-field-wide.webp"
            alt="Paired thermal and RGB aerial overview from a controlled emergency-response training scenario"
            loading="lazy"
          />
          <figcaption><span>02 / OVERVIEW</span><strong>PAIRED RGB + THERMAL</strong><small>WIDE SCENE</small></figcaption>
        </figure>

        <figure className="field-tile field-tile-team">
          <img
            src="gsl-field-team.webp"
            alt="Thermal and RGB aerial views of responders during a controlled training scenario"
            loading="lazy"
          />
          <figcaption><span>03 / MULTIVIEW</span><strong>RESPONDER GROUP</strong><small>AERIAL</small></figcaption>
        </figure>

        <figure className="field-tile field-tile-close">
          <img
            src="gsl-field-close.webp"
            alt="Close paired thermal and RGB views from a controlled emergency-response training scenario"
            loading="lazy"
          />
          <figcaption><span>04 / DETAIL</span><strong>PAIRED SENSOR VIEW</strong><small>CLOSE RANGE</small></figcaption>
        </figure>
      </div>

      <div className="field-sample-foot">
        <span>STAGED TRAINING SCENARIO — NOT A REAL CASUALTY EVENT</span>
        <span>PUBLIC PREVIEW / FACES ANONYMIZED / NON-GENERATIVE IMAGE PROCESSING</span>
      </div>
    </section>
  );
}
