import { PageHeading, Label, Photo, FinalCTA } from "@/components/ui";
export const metadata = { title: "About Dekoraj Group" };
export default function Page() {
  return (
    <main id="main">
      <PageHeading
        label="This is Dekoraj"
        title="BUILDING WHAT MODERN AGRICULTURE RUNS ON."
        description="An integrated approach to agricultural infrastructure, technology and commerce."
      />
      <div className="wrap banner-photo">
        <Photo
          src="/images/farm-exterior.webp"
          alt="Illustrative modern agricultural infrastructure"
        />
      </div>
      <section className="wrap scope-section">
        <div>
          <Label>Our perspective</Label>
          <h2>
            THINK IN SYSTEMS.
            <br />
            <em>BUILD FOR THE FUTURE.</em>
          </h2>
        </div>
        <div className="body-copy">
          <p>
            Modern agriculture depends on connections: between land and
            infrastructure, buildings and equipment, technical decisions and
            daily operations.
          </p>
          <p>
            Dekoraj Group brings these conversations together across farm
            construction, project development, poultry systems, equipment, cold
            storage and processing.
          </p>
          <p>
            The ambition is straightforward: help agricultural businesses plan
            and build infrastructure around the operation they want to create.
          </p>
          <p className="small-note">
            This site presents Dekoraj’s proposed service ecosystem. Company
            history, certifications, delivery statistics and team profiles await
            verified company information.
          </p>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
