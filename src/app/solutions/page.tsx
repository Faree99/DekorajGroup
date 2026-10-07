import type { Metadata } from "next";
import { PageHeading, Photo, ArrowLink, FinalCTA } from "@/components/ui";
import { solutions } from "@/lib/content";
export const metadata: Metadata = { title: "Agricultural solutions" };
export default function Page() {
  return (
    <main id="main">
      <PageHeading
        label="Our capabilities"
        title="ONE OPERATION. EVERY CONNECTION."
        description="The buildings, systems and equipment behind a modern agricultural business."
      />
      <div className="wrap solutions-list">
        {solutions.map((s) => (
          <article key={s.slug}>
            <Photo src={s.image} alt={`${s.title} illustrative reference`} />
            <div>
              <span className="section-label">
                {s.number} / {s.capacity}
              </span>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <ArrowLink href={`/solutions/${s.slug}`} variant="outline">
                Explore solution
              </ArrowLink>
            </div>
          </article>
        ))}
      </div>
      <FinalCTA />
    </main>
  );
}
