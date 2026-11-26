// The "hr" lettermark: one h whose right leg is also the stem of the r.
// Single solid path built from circular arcs, so it stays sharp at any size.
export const LOGO_PATH =
  "M65 44H116V111.4A106 106 0 0 1 251.5 133A106 106 0 0 1 332 96V147A55 55 0 0 0 277 202V346H226V202A55 55 0 0 0 116 202V346H65Z";

export default function Logo({ size = 36, className = "", title = "HR monogram" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="65 44 267 302"
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      <path d={LOGO_PATH} />
    </svg>
  );
}
