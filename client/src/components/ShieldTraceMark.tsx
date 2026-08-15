/* Governance Blueprint brand primitive: a portable shield, trace line, and amber witness mark. */
type ShieldTraceMarkProps = {
  className?: string;
  decorative?: boolean;
};

export function ShieldTraceMark({ className = "", decorative = false }: ShieldTraceMarkProps) {
  return (
    <svg className={`brand-mark ${className}`} viewBox="0 0 48 48" fill="none" role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : "AI-SDLC shield and trace mark"}>
      <path d="M24 3.5 41 9.4v11.1c0 11.4-6.8 19.3-17 24-10.2-4.7-17-12.6-17-24V9.4L24 3.5Z" fill="#123450" stroke="#D8E4E3" strokeWidth="1.25" />
      <path d="M14 17.4h12.6l4.2 4.1H37" stroke="#7DD5DD" strokeWidth="2.15" strokeLinecap="square" />
      <path d="M14 27.7h8.9l4.5-4.5h9.1" stroke="#7DD5DD" strokeWidth="2.15" strokeLinecap="square" />
      <circle cx="14" cy="17.4" r="2.2" fill="#D79B43" />
      <circle cx="37" cy="17.4" r="2.2" fill="#D79B43" />
      <circle cx="14" cy="27.7" r="2.2" fill="#D79B43" />
      <circle cx="36.5" cy="23.2" r="2.2" fill="#D79B43" />
    </svg>
  );
}
