import { HERO_DRONE_IMAGE } from "./hero-drone-image";

export default function DroneVisual() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        minHeight: 520,
        overflow: "hidden",
        background: "#070a0d",
      }}
    >
      <img
        src={HERO_DRONE_IMAGE}
        alt=""
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: 520,
          objectFit: "cover",
          objectPosition: "center",
          filter: "contrast(1.04) saturate(.92)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,8,10,.12) 0%, rgba(5,8,10,.01) 48%, rgba(5,8,10,.36) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 14,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 8,
          letterSpacing: ".16em",
          color: "rgba(255,255,255,.62)",
          textTransform: "uppercase",
        }}
      >
        <span>MISSION / GSL-MCI-01</span>
        <span style={{ display: "flex", gap: 8, alignItems: "center", color: "rgba(255,255,255,.88)" }}>
          <i
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#c5222e",
              boxShadow: "0 0 0 5px rgba(197,34,46,.14)",
            }}
          />
          UAV CAPTURE READY
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          padding: "10px 12px",
          border: "1px solid rgba(255,255,255,.16)",
          background: "rgba(5,8,10,.68)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "rgba(255,255,255,.8)",
          fontSize: 8,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          display: "grid",
          gap: 6,
        }}
      >
        <span style={{ color: "#dd4a54" }}>UAV SENSOR PLATFORM</span>
        <strong style={{ fontSize: 10, color: "white", fontWeight: 700 }}>
          RGB + LWIR + GROUND + POV
        </strong>
        <span>4 streams synchronized</span>
      </div>
    </div>
  );
}
