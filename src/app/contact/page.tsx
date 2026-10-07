import { PageHeading, Label, ArrowLink } from "@/components/ui";
import { EnquiryForm } from "@/components/enquiry-form";
export const metadata = { title: "Contact Dekoraj" };
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
        label="Get in touch"
        title="THE NEXT STEP STARTS HERE."
        description="A project, a product, a question or a possible partnership. Let’s start the conversation."
      />
      <section className="wrap form-layout">
        <aside>
          <Label>One point of connection</Label>
          <h2>
            WHAT’S
            <br />
            <em>ON YOUR MIND?</em>
          </h2>
          <p>
            Use the enquiry form to prepare a clear brief for the team, or
            explore consultation formats for a more focused conversation.
          </p>
          <ArrowLink href="/consultation" variant="text">
            Explore consultations
          </ArrowLink>
        </aside>
        <EnquiryForm
          interest={interest?.slice(0, 120) || "General enquiry"}
          live={Boolean(process.env.DEKORAJ_ENQUIRY_WEBHOOK_URL)}
        />
      </section>
    </main>
  );
}
