import { notFound } from "next/navigation";
import { products } from "@/lib/content";
import { ArrowLink, Label, Photo } from "@/components/ui";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return { title: p?.title || "Equipment", description: p?.description };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main" className="wrap product-detail">
      <div className="product-detail-photo">
        <Photo src={p.image} alt={p.title} priority />
      </div>
      <div>
        <Label>DekorajMart / {p.category}</Label>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
        <div className="price-line">
          <strong>Price on request</strong>
          <span>{p.availability}</span>
        </div>
        <ul className="feature-list">
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <ArrowLink href={`/contact?interest=${encodeURIComponent(p.title)}`}>
          Request a quotation
        </ArrowLink>
        <p className="small-note">
          Reference equipment photo. Confirm dimensions, configuration, stock,
          lead time and delivery charges before purchase.
        </p>
        <ArrowLink href="/mart" variant="text">
          Back to all equipment
        </ArrowLink>
      </div>
    </main>
  );
}
