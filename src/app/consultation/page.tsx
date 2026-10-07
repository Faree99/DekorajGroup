import { PageHeading } from "@/components/ui";
import { Booking } from "@/components/booking";
export const metadata = { title: "Book a consultation" };
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return (
    <main id="main">
      <PageHeading
        label="Consultation / Let’s begin"
        title="THE RIGHT CONVERSATION CHANGES EVERYTHING."
        description="Online, at the office or on your site. Choose a format and explore the next step for your project."
      />
      <section className="wrap booking-section">
        <Booking
          initialType={
            ["online", "office", "site"].includes(type || "") ? type : "online"
          }
          live={Boolean(process.env.DEKORAJ_ENQUIRY_WEBHOOK_URL)}
        />
      </section>
    </main>
  );
}
