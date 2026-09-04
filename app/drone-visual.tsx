import { HERO_DRONE_IMAGE } from "./hero-drone-image";
import styles from "./drone-visual.module.css";

export default function DroneVisual() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <img className={styles.image} src={HERO_DRONE_IMAGE} alt="" />
      <div className={styles.shade} />

      <div className={styles.topbar}>
        <span>MISSION / GSL-MCI-01</span>
        <span className={styles.ready}>
          <i className={styles.dot} />
          UAV CAPTURE READY
        </span>
      </div>

      <div className={styles.badge}>
        <span className={styles.badgeLabel}>UAV SENSOR PLATFORM</span>
        <strong>RGB + LWIR + GROUND + POV</strong>
        <span>4 streams synchronized</span>
      </div>
    </div>
  );
}
