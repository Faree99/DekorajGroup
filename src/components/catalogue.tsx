"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { products, productCategories } from "@/lib/content";
import { Photo } from "./ui";
export function Catalogue() {
  const [category, setCategory] = useState("All equipment");
  const [query, setQuery] = useState("");
  const filtered = products.filter(
    (p) =>
      (category === "All equipment" || p.category === category) &&
      `${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="wrap catalogue">
      <div className="catalogue-toolbar">
        <div className="category-filters" aria-label="Equipment categories">
          {productCategories.map((c) => (
            <button
              key={c}
              className={category === c ? "active" : ""}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="catalogue-search">
          <Search size={17} />
          <input
            type="search"
            placeholder="Find equipment"
            aria-label="Search equipment"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <span className="section-label" aria-live="polite">
        {filtered.length} equipment{" "}
        {filtered.length === 1 ? "listing" : "listings"}
      </span>
      <div className="product-grid catalogue-grid">
        {filtered.map((p) => (
          <Link className="product-card" key={p.slug} href={`/mart/${p.slug}`}>
            <div className="product-image">
              <Photo src={p.image} alt={p.title} />
              <span className="product-arrow">
                <ArrowUpRight />
              </span>
            </div>
            <div className="product-meta">
              <span>{p.category}</span>
              <span>Price on request</span>
            </div>
            <h2>{p.title}</h2>
            <p>{p.availability}</p>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>Let’s find what you need.</h2>
          <p>
            No published equipment matches this selection. Send a specification
            enquiry and ask about sourcing.
          </p>
          <Link
            className="arrow-link outline"
            href={`/contact?interest=${encodeURIComponent(category === "All equipment" ? query || "Equipment sourcing" : category)}`}
          >
            Enquire about equipment <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
