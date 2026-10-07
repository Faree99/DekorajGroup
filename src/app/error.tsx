"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="wrap not-found">
      <h1>A SMALL INTERRUPTION.</h1>
      <p>We couldn’t load this page. Please try again.</p>
      <button className="arrow-link solid" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
