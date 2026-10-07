import { PageHeading, Label } from "@/components/ui";
import { EnquiryForm } from "@/components/enquiry-form";
export const metadata = { title: "Invest & partner" };
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  return (
    <main id="main">
      <PageHeading
        label="Shared ambition / Greater possibilities"
        title="BUILD THE FUTURE OF AGRICULTURE WITH US."
        description="Connect experience, capabilities and ideas through a structured partnership conversation."
      />
      <section className="wrap form-layout">
        <aside>
          <Label>Better, together</Label>
          <h2>
            YOUR EXPERTISE.
            <br />
            <em>OUR NEXT CHAPTER.</em>
          </h2>
          <ul className="feature-list">
            <li>Supplier partnerships</li>
            <li>Institutional partnerships</li>
            <li>Project partnerships</li>
            <li>Investment enquiries</li>
          </ul>
          <p className="small-note">
            Enquiries begin an exploratory discussion. No investment products,
            returns or transactions are offered through this website.
          </p>
        </aside>
        <EnquiryForm
          interest={interest?.slice(0, 100) || "Partnership enquiry"}
          live={Boolean(process.env.DEKORAJ_ENQUIRY_WEBHOOK_URL)}
        />
      </section>
    </main>
  );
}
