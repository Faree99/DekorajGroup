import { ArrowLink } from "@/components/ui";
export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <span className="section-label">404 / Off the planned route</span>
      <h1>
        LET’S GET YOU
        <br />
        <em>BACK ON TRACK.</em>
      </h1>
      <p>This page could not be found.</p>
      <ArrowLink href="/">Back to Dekoraj</ArrowLink>
    </main>
  );
}
