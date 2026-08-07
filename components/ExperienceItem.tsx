interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export default function ExperienceItem({
  company,
  role,
  period,
  bullets,
}: ExperienceItemProps) {
  return (
    <article className="experience-item">
      <header className="experience-item__header">
        <div className="experience-item__meta">
          <span className="experience-item__company">{company}</span>
          <span className="experience-item__role">{role}</span>
        </div>
        <time className="experience-item__period" dateTime={period}>
          {period}
        </time>
      </header>
      {/* role="list" is load-bearing: Safari/VoiceOver drops list semantics
          when list-style is none, which the bullet styling requires. */}
      <ul className="experience-item__bullets" role="list">
        {bullets.map((bullet) => (
          <li key={bullet} className="experience-item__bullet">
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
