import { PageHeading } from "@/components/ui";
export const metadata = { title: "Website terms", robots: { index: false } };
export default function Page() {
  return (
    <main id="main">
      <PageHeading label="Website information" title="WEBSITE TERMS." />
      <article className="wrap prose">
        <p className="preview-notice">
          Draft website terms for company and legal review before public launch.
        </p>
        <h2>Information and quotations</h2>
        <p>
          Service descriptions, images and example project scopes introduce
          possible solutions. Specifications, prices, stock, lead times and
          delivery scope must be confirmed in a project-specific quotation.
        </p>
        <h2>Consultation requests</h2>
        <p>
          Selecting a time or submitting a form does not confirm a booking.
          Sample availability is labelled as a preview. This version of the
          website does not collect payments.
        </p>
        <h2>Financing and partnerships</h2>
        <p>
          These forms invite enquiries only. They do not offer credit, guarantee
          financing approval, promise investment returns or execute investment
          transactions.
        </p>
        <h2>Visual references</h2>
        <p>
          Photography and concept imagery illustrate the type of infrastructure
          and equipment discussed. They do not establish ownership or prove
          completed Dekoraj projects. Placeholder company metrics are explicitly
          labelled.
        </p>
      </article>
    </main>
  );
}
