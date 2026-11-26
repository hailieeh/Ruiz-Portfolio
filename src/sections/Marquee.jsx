const words = [
  "Programming",
  "Graphic Design",
  "Video Editing",
  "Virtual Assistance",
  "Social Media Management",
];

export default function Marquee() {
  const row = (key, hidden) => (
    <div className="marquee-row" key={key} aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span className="marquee-item" key={w}>
          {w}
          <i className="marquee-star" aria-hidden="true">✺</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        {row("a", false)}
        {row("b", true)}
        {row("c", true)}
      </div>
    </div>
  );
}
