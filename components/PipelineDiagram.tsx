export default function PipelineDiagram() {
  return (
    <svg
      viewBox="0 0 535 90"
      width="100%"
      style={{ maxWidth: 480, display: 'block', overflow: 'visible' }}
      role="img"
      aria-label="Dependency diagram: Soundscape and ascii-roto both feed into RO-SHAM-BO.EXE; Soundscape also feeds into The Forgetting Machine"
    >
      <defs>
        <marker
          id="pipeline-arrow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polyline
            points="0,0.5 5,3 0,5.5"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1"
          />
        </marker>
      </defs>

      {/* Lines: Soundscape → RO-SHAM-BO.EXE (horizontal) */}
      <line
        x1="90"
        y1="28"
        x2="378"
        y2="28"
        stroke="var(--border)"
        strokeWidth="1"
        markerEnd="url(#pipeline-arrow)"
      />

      {/* Lines: Soundscape → The Forgetting Machine (diagonal) */}
      <line
        x1="90"
        y1="28"
        x2="378"
        y2="68"
        stroke="var(--border)"
        strokeWidth="1"
        markerEnd="url(#pipeline-arrow)"
      />

      {/* Lines: ascii-roto → RO-SHAM-BO.EXE (diagonal) */}
      <line
        x1="90"
        y1="68"
        x2="378"
        y2="28"
        stroke="var(--border)"
        strokeWidth="1"
        markerEnd="url(#pipeline-arrow)"
      />

      {/* Source dots */}
      <circle cx="85" cy="28" r="2.5" fill="var(--muted)" />
      <circle cx="85" cy="68" r="2.5" fill="var(--muted)" />

      {/* Source labels */}
      <text
        x="0"
        y="33"
        fontSize="12"
        fontFamily="var(--font-sans)"
        fill="var(--muted)"
        textAnchor="start"
      >
        Soundscape
      </text>
      <text
        x="0"
        y="73"
        fontSize="12"
        fontFamily="var(--font-sans)"
        fill="var(--muted)"
        textAnchor="start"
      >
        ascii-roto
      </text>

      {/* Target labels */}
      <text
        x="390"
        y="33"
        fontSize="12"
        fontFamily="var(--font-sans)"
        fill="var(--muted)"
        textAnchor="start"
      >
        RO-SHAM-BO.EXE
      </text>
      <text
        x="390"
        y="73"
        fontSize="12"
        fontFamily="var(--font-sans)"
        fill="var(--muted)"
        textAnchor="start"
      >
        The Forgetting Machine
      </text>
    </svg>
  );
}
