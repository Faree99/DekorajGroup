import { PageHeading } from "@/components/ui";
export const metadata = { title: "Privacy notice", robots: { index: false } };
export default function Page() {
  return (
    <main id="main">
      <PageHeading label="Website information" title="PRIVACY NOTICE." />
      <article className="wrap prose">
        <p className="preview-notice">
          Draft operational notice for review before public launch. The
          company’s legal identity, privacy contact and retention arrangements
          must be supplied.
        </p>
        <h2>Your enquiry details</h2>
        <p>
          The forms ask for contact details and information about a proposed
          project or consultation. In preview mode, the application validates
          the request but does not store it or deliver it to the business. You
          may download a copy to your own device.
        </p>
        <h2>When enquiry delivery is enabled</h2>
        <p>
          Submitted details are passed to the business’s configured enquiry
          system to respond to the request. The business must publish its
          approved retention period, processing arrangements and privacy contact
          before collecting real enquiries.
        </p>
        <h2>Browser storage and tracking</h2>
        <p>
          This source project does not include advertising trackers or
          analytics. It does not store enquiry details in local browser storage.
          Technical hosting logs may be maintained by the chosen hosting
          provider.
        </p>
        <h2>Questions and requests</h2>
        <p>
          The website operator must add its verified privacy contact and
          applicable rights-request procedure before launch.
        </p>
      </article>
    </main>
  );
}
