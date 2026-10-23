import { Eye, HeartHandshake, Sprout } from "lucide-react";

const values = [
  {
    title: "Thoughtful Choices",
    description:
      "Discover food and grocery options that suit your preferences and everyday needs.",
    Icon: Sprout,
  },
  {
    title: "Everyday Simplicity",
    description:
      "Enjoy an approachable browsing experience with clear information and intuitive navigation.",
    Icon: HeartHandshake,
  },
  {
    title: "Clarity and Transparency",
    description:
      "Explore product names, descriptions, categories and prices presented in a consistent way.",
    Icon: Eye,
  },
];

function MissionSection() {
  return (
    <section id="about" className="section mission-section">
      <div className="container mission-section__layout">
        <div className="mission-section__intro">
          <p className="eyebrow">About OrganicIntake</p>

          <h2>
            Making thoughtful food choices feel simple.
          </h2>

          <p className="mission-section__description">
            OrganicIntake is designed as a welcoming place
            to explore organic food and everyday grocery
            essentials, with a focus on clarity, simplicity
            and considered choices.
          </p>

          <p className="mission-section__signature">
            Thoughtfully chosen, simply explored.
          </p>
        </div>

        <div className="mission-values">
          {values.map(({ title, description, Icon }) => (
            <article className="mission-value" key={title}>
              <div className="mission-value__icon">
                <Icon size={23} aria-hidden="true" />
              </div>

              <div className="mission-value__content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MissionSection;