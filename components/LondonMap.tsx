// Hand-drawn, stylized line map of London for the hero background.
// Abstract on purpose: a Thames-like river, a street grid, and three pins.
// No map tiles, no API keys, no third-party imagery.

const PINS = [
  { x: 1120, y: 150, label: "N17 / SPURS", sub: "SAT MAY 8" },
  { x: 960, y: 430, label: "W1 / GYMKHANA", sub: "SUN MAY 9" },
  { x: 1140, y: 500, label: "WC2 / HOTEL", sub: "FRI-MON" },
];

export function LondonMap() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <rect width="1440" height="900" fill="#141a24" />

      {/* street grid, slightly rotated so it reads as a city, not graph paper */}
      <g stroke="#c9d1dc" strokeOpacity="0.07" strokeWidth="1" transform="rotate(-8 720 450)">
        {Array.from({ length: 30 }, (_, i) => (
          <line key={`v${i}`} x1={-200 + i * 64} y1={-200} x2={-200 + i * 64} y2={1100} />
        ))}
        {Array.from({ length: 22 }, (_, i) => (
          <line key={`h${i}`} x1={-200} y1={-200 + i * 64} x2={1700} y2={-200 + i * 64} />
        ))}
      </g>

      {/* main roads */}
      <g fill="none" stroke="#c9d1dc" strokeOpacity="0.16" strokeWidth="2">
        <path d="M 120 380 C 420 360, 640 420, 1000 400 S 1320 360, 1440 380" />
        <path d="M 880 0 C 870 160, 900 300, 905 520" />
        <path d="M 300 0 C 420 220, 560 360, 700 470" />
        <path d="M 1440 200 C 1200 300, 1000 420, 900 520" />
      </g>

      {/* parks */}
      <g fill="#c9d1dc" fillOpacity="0.05">
        <path d="M 470 420 q 90 -30 170 10 q 20 60 -40 90 q -110 20 -140 -30 z" />
        <path d="M 560 220 q 70 -10 110 30 q -10 50 -70 50 q -60 -20 -40 -80 z" />
      </g>

      {/* the river */}
      <path
        d="M -40 640 C 200 600, 360 700, 560 640 S 820 520, 980 600 S 1180 760, 1300 690 S 1420 640, 1500 660"
        fill="none"
        stroke="#3b5873"
        strokeOpacity="0.85"
        strokeWidth="38"
        strokeLinecap="round"
      />
      <path
        d="M -40 640 C 200 600, 360 700, 560 640 S 820 520, 980 600 S 1180 760, 1300 690 S 1420 640, 1500 660"
        fill="none"
        stroke="#c9d1dc"
        strokeOpacity="0.15"
        strokeWidth="1"
        strokeDasharray="2 10"
      />

      {/* route between pins */}
      <path
        d="M 1140 500 C 1100 380, 1140 260, 1120 150 M 1140 500 C 1060 500, 1010 460, 960 430"
        fill="none"
        stroke="#c39a45"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />

      {/* pins */}
      {PINS.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="16" fill="none" stroke="#c39a45" strokeOpacity="0.45" />
          <circle cx={p.x} cy={p.y} r="5" fill="#d23c2a" />
          <text
            x={p.x + 24}
            y={p.y - 2}
            fill="#c9d1dc"
            fillOpacity="0.75"
            fontSize="13"
            letterSpacing="2"
            fontFamily="ui-monospace, monospace"
          >
            {p.label}
          </text>
          <text
            x={p.x + 24}
            y={p.y + 16}
            fill="#c39a45"
            fillOpacity="0.8"
            fontSize="11"
            letterSpacing="2"
            fontFamily="ui-monospace, monospace"
          >
            {p.sub}
          </text>
        </g>
      ))}

      {/* compass-ish scale bar, bottom right */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="#c9d1dc" fillOpacity="0.4" letterSpacing="2">
        <line x1="1180" y1="840" x2="1300" y2="840" stroke="#c9d1dc" strokeOpacity="0.4" />
        <text x="1180" y="828">51.51 N / 0.13 W</text>
      </g>
    </svg>
  );
}
