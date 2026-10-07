import { PageHeading, Label } from "@/components/ui";
import { EnquiryForm } from "@/components/enquiry-form";
export const metadata = { title: "Start a project" };
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
        label="Your next chapter"
        title="EVERY GREAT OPERATION STARTS WITH AN IDEA."
      />
      <section className="wrap form-layout">
        <aside>
          <Label>Tell us what you’re building</Label>
          <h2>
            LET’S PUT
            <br />
            YOUR PLAN
            <br />
            <em>IN MOTION.</em>
          </h2>
          <p>
            A few details help shape the first conversation. Share what you
            know. We can work through the rest together.
          </p>
          <ol>
            <li>Define your project</li>
            <li>Discuss the requirements</li>
            <li>Agree on the next step</li>
          </ol>
        </aside>
        <EnquiryForm
          interest={interest?.slice(0, 120) || "Farm project"}
          live={Boolean(process.env.DEKORAJ_ENQUIRY_WEBHOOK_URL)}
        />
      </section>
    </main>
  );
}
