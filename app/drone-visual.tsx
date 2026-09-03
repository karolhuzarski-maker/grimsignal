export default function DroneVisual() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: "34px 34px 42px",
        zIndex: 1,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 760 430"
        role="presentation"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          filter: "drop-shadow(0 28px 34px rgba(0,0,0,.6))",
        }}
      >
        <defs>
          <linearGradient id="gslBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#333b40" />
            <stop offset="0.52" stopColor="#171d21" />
            <stop offset="1" stopColor="#080b0e" />
          </linearGradient>
          <linearGradient id="gslArm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#11171b" />
            <stop offset="0.5" stopColor="#4a5358" />
            <stop offset="1" stopColor="#101519" />
          </linearGradient>
          <radialGradient id="gslRotor">
            <stop offset="0" stopColor="rgba(255,255,255,.12)" />
            <stop offset="0.58" stopColor="rgba(255,255,255,.04)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <g opacity=".72" fill="none" stroke="#7f898f" strokeWidth="1">
          <circle cx="126" cy="100" r="72" />
          <circle cx="634" cy="100" r="72" />
          <circle cx="126" cy="330" r="72" />
          <circle cx="634" cy="330" r="72" />
        </g>

        <g opacity=".32">
          <ellipse cx="126" cy="100" rx="112" ry="24" fill="url(#gslRotor)" />
          <ellipse cx="634" cy="100" rx="112" ry="24" fill="url(#gslRotor)" />
          <ellipse cx="126" cy="330" rx="112" ry="24" fill="url(#gslRotor)" />
          <ellipse cx="634" cy="330" rx="112" ry="24" fill="url(#gslRotor)" />
        </g>

        <g stroke="#697278" strokeWidth="2">
          <path d="M322 178 L151 113" stroke="url(#gslArm)" strokeWidth="24" strokeLinecap="round" />
          <path d="M438 178 L609 113" stroke="url(#gslArm)" strokeWidth="24" strokeLinecap="round" />
          <path d="M322 257 L151 317" stroke="url(#gslArm)" strokeWidth="24" strokeLinecap="round" />
          <path d="M438 257 L609 317" stroke="url(#gslArm)" strokeWidth="24" strokeLinecap="round" />
        </g>

        <g fill="#11171b" stroke="#8a9499" strokeWidth="2">
          <circle cx="126" cy="100" r="27" />
          <circle cx="634" cy="100" r="27" />
          <circle cx="126" cy="330" r="27" />
          <circle cx="634" cy="330" r="27" />
        </g>
        <g fill="#4a5358">
          <circle cx="126" cy="100" r="8" />
          <circle cx="634" cy="100" r="8" />
          <circle cx="126" cy="330" r="8" />
          <circle cx="634" cy="330" r="8" />
        </g>

        <path
          d="M319 145 C347 124 413 124 441 145 L474 205 L450 276 C428 304 332 304 310 276 L286 205 Z"
          fill="url(#gslBody)"
          stroke="#879198"
          strokeWidth="2"
        />
        <path d="M335 158 L425 158 L445 202 L315 202 Z" fill="#242c31" opacity=".9" />
        <path d="M320 224 L440 224 L426 272 L334 272 Z" fill="#0b0f12" stroke="#4d565c" />
        <path d="M344 176 L416 176" stroke="#8f999f" strokeWidth="2" opacity=".65" />
        <path d="M357 187 L403 187" stroke="#5f686e" strokeWidth="2" opacity=".8" />

        <g transform="translate(380 282)">
          <rect x="-44" y="-8" width="88" height="36" rx="9" fill="#0b0e10" stroke="#737d82" strokeWidth="2" />
          <circle cx="-21" cy="10" r="15" fill="#050708" stroke="#9aa4a9" strokeWidth="2" />
          <circle cx="-21" cy="10" r="7" fill="#29343a" />
          <circle cx="21" cy="10" r="15" fill="#050708" stroke="#9aa4a9" strokeWidth="2" />
          <circle cx="21" cy="10" r="7" fill="#1e2930" />
          <rect x="-9" y="-22" width="18" height="10" rx="3" fill="#c5222e" />
          <circle cx="0" cy="-17" r="16" fill="none" stroke="#c5222e" strokeOpacity=".2" strokeWidth="8" />
        </g>

        <g fill="#c5222e">
          <rect x="299" y="212" width="7" height="22" />
          <rect x="454" y="212" width="7" height="22" />
        </g>

        <g fontFamily="Arial, sans-serif" fontSize="12" letterSpacing="2.4" fill="#d9dddf">
          <text x="500" y="245">UAV SENSOR PLATFORM</text>
        </g>
        <g fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="2" fill="#c5222e">
          <text x="500" y="264">RGB + LWIR / AIR NODE 01</text>
        </g>
        <path d="M470 238 H490" stroke="#c5222e" strokeWidth="2" />
      </svg>
    </div>
  );
}
