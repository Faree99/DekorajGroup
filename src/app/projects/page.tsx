import { PageHeading, Photo, ArrowLink, Label } from "@/components/ui";
export const metadata = { title: "Project scopes & possibilities" };
const examples = [
  {
    title: "Commercial poultry facility",
    image: "/images/farm-exterior.webp",
    type: "Poultry infrastructure",
    capacity: "50,000 birds · illustrative target",
    scope: "Planning, housing and equipment integration",
  },
  {
    title: "Integrated layer operation",
    image: "/images/cage-system.webp",
    type: "Layer production",
    capacity: "Defined during assessment",
    scope: "Cage systems, feeding, drinking and house setup",
  },
  {
    title: "Complete farm development",
    image: "/images/fields.webp",
    type: "Agricultural development",
    capacity: "Site and business-plan dependent",
    scope: "Site planning, construction and operational systems",
  },
];
export default function Page() {
  return (
    <main id="main">
      <PageHeading
        label="Project possibilities"
        title="BUILT AROUND WHAT YOU WANT TO ACHIEVE."
        description="Illustrative scopes for a conversation about your next project. These are not verified completed Dekoraj case studies."
      />
      <section className="wrap project-examples">
        {examples.map((p, i) => (
          <article key={p.title}>
            <div className="project-example-photo">
              <Photo src={p.image} alt={`${p.title} illustrative reference`} />
            </div>
            <div>
              <Label>0{i + 1} / Example scope</Label>
              <h2>{p.title}</h2>
              <dl>
                {[
                  ["Project type", p.type],
                  ["Capacity", p.capacity],
                  ["Scope", p.scope],
                  ["Location", "To be agreed"],
                  ["Completion / year", "Not a completed project claim"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <ArrowLink
                href={`/start-project?interest=${encodeURIComponent(p.title)}`}
                variant="outline"
              >
                Discuss a similar project
              </ArrowLink>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
