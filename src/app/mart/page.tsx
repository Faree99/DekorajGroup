import { PageHeading } from "@/components/ui";
import { Catalogue } from "@/components/catalogue";
export const metadata = { title: "DekorajMart | Agricultural equipment" };
export default function Page() {
  return (
    <main id="main">
      <PageHeading
        label="DekorajMart"
        title="EQUIPPED FOR WHAT’S NEXT."
        description="Explore agricultural equipment and build a specification enquiry. Current prices and stock are confirmed by the team."
      />
      <Catalogue />
    </main>
  );
}
