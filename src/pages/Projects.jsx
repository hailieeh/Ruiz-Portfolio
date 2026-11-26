const projects = [
  {
    id: 1,
    title: "FaithEvents – Church Attendance and Events Tracker",
    description:
      "A QR code-based attendance and event tracking system for a church setting.",
  },
  {
    id: 2,
    title: "Project Title 2 (placeholder)",
    description: "One-line description coming soon.",
  },
  {
    id: 3,
    title: "Project Title 3 (placeholder)",
    description: "One-line description coming soon.",
  },
];

export default function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <div className="cards">
        {projects.map((p) => (
          <article className="card" key={p.id}>
            <div className="card-image">Image placeholder</div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
