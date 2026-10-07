import { PageHeading, Label, Photo } from "@/components/ui";
import { EnquiryForm } from "@/components/enquiry-form";
export const metadata = { title: "Financing enquiries" };
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <main id="main">
      <PageHeading
        label="Equipment & project financing enquiries"
        title="YOUR NEXT OPERATION SHOULDN’T STOP AT CAPITAL."
        description="Start a conversation about the funding requirements of your agricultural project."
      />
      <div className="wrap banner-photo">
        <Photo
          src="/images/fields.webp"
          alt="Agricultural machinery working cultivated farmland"
        />
      </div>
      <section className="wrap form-layout">
        <aside>
          <Label>Explore the possibilities</Label>
          <h2>
            PLAN THE PROJECT.
            <br />
            <em>DISCUSS THE CAPITAL.</em>
          </h2>
          <p>
            Tell us whether you are exploring equipment financing or a wider
            project requirement, and share the proposed scope.
          </p>
          <p className="small-note">
            This is an enquiry, not a credit application, loan offer or
            guarantee of approval. Funding availability, eligibility, rates and
            terms require separate confirmation by the relevant provider.
          </p>
        </aside>
        <EnquiryForm
          interest="Equipment / project financing enquiry"
          live={Boolean(process.env.DEKORAJ_ENQUIRY_WEBHOOK_URL)}
        />
      </section>
    </main>
  );
}
