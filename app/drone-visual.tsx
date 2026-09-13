import styles from "./drone-visual.module.css";

export default function DroneVisual() {
  return (
    <div className={styles.frame} aria-label="Paired thermal and RGB UAV field capture from a controlled emergency-response training scenario">
      <img className={styles.image} src="/gsl-hero-field.webp" alt="Paired thermal and RGB UAV field capture" />
      <div className={styles.shade} />

      <div className={styles.topbar}>
        <span>MISSION / GSL-MCI-01</span>
        <span className={styles.ready}>
          <i className={styles.dot} />
          FIELD CAPTURE / RGB + LWIR
        </span>
      </div>

      <div className={styles.badge}>
        <span className={styles.badgeLabel}>REAL-WORLD MULTISENSOR DATA</span>
        <strong>RGB + LWIR + GROUND + POV</strong>
        <span>4 streams synchronized</span>
      </div>
    </div>
  );
}
