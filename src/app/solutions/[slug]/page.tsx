import { notFound } from "next/navigation";
import { solutions } from "@/lib/content";
import { ArrowLink, FinalCTA, Label, Photo } from "@/components/ui";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  return { title: s?.title || "Solution", description: s?.description };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <main id="main">
      <section className="detail-hero">
        <Photo
          src={s.image}
          alt={`${s.title} illustrative reference`}
          priority
        />
        <div className="photo-shade" />
        <div className="wrap">
          <Label>
            {s.number} / {s.title}
          </Label>
          <h1>{s.intro}</h1>
          <p>{s.description}</p>
          <ArrowLink
            href={`/start-project?interest=${encodeURIComponent(s.title)}`}
          >
            Discuss your project
          </ArrowLink>
        </div>
        <small className="image-disclosure">
          Illustrative reference / project specifications vary
        </small>
      </section>
      <section className="scope-section wrap">
        <div>
          <Label>The scope</Label>
          <h2>
            PLANNED TOGETHER.
            <br />
            <em>BUILT TO WORK.</em>
          </h2>
          <p>
            Every brief starts with your location, target capacity, operating
            requirements and investment plan. Final scope and pricing follow
            assessment.
          </p>
        </div>
        <ol>
          {s.scope.map((item, i) => (
            <li key={item}>
              <span>0{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>
      <div className="wrap detail-note">
        <p>
          Project price: individually quoted
          <br />
          Capacity, lead time and delivery scope: confirmed after assessment
        </p>
        <ArrowLink href="/consultation" variant="outline">
          Start with a consultation
        </ArrowLink>
      </div>
      <FinalCTA />
    </main>
  );
}
