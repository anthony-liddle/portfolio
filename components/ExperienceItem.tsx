interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  description: string;
}

export default function ExperienceItem({
  company,
  role,
  period,
  description,
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
      <p className="experience-item__description">{description}</p>
    </article>
  );
}
