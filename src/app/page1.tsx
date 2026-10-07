import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroJourney } from "@/components/hero-journey";
import {
  Ecosystem,
  InsideSystem,
  IntentRouter,
  Process,
} from "@/components/home-interactions1";
import { ArrowLink, FinalCTA, Label, Photo } from "@/components/ui";
import { consultationTypes, products, solutions } from "@/lib/content";

export default function Home() {
  return (
    <main id="main">
      <HeroJourney />
      <div className="capability-strip">
        <span>Farm construction</span>
        <i>✳</i>
        <span>Automated systems</span>
        <i>✳</i>
        <span>Equipment & technology</span>
        <i>✳</i>
        <span>Project development</span>
      </div>
      <section className="manifesto wrap" id="explore">
        <Label number="03">Built on a bigger idea</Label>
        <div>
          <h2>
            WE DON’T JUST
            <br />
            SUPPLY EQUIPMENT.
            <br />
            WE BUILD
            <br />
            <em>
              AGRICULTURAL
              <br />
              SYSTEMS.
            </em>
          </h2>
          <div className="manifesto-note">
            <span className="line-mark" />
            <p>
              Great operations don’t happen by accident. They are designed,
              engineered and built with every part in mind.
            </p>
            <p>
              We connect farm construction, technology and equipment to help you
              move from an ambitious idea to a working operation.
            </p>
            <ArrowLink href="/about" variant="text">
              This is Dekoraj
            </ArrowLink>
          </div>
        </div>
      </section>
      <section className="construction-panel">
        <div data-parallax className="panel-photo">
          <Photo
            src="/images/farm-exterior.webp"
            alt="Illustrative modern poultry infrastructure with feed silos"
          />
        </div>
        <div className="photo-shade" />
        <div className="wrap panel-content">
          <div className="panel-top">
            <Label>01 / Farm construction</Label>
            <span>From foundation to function</span>
          </div>
          <div className="panel-bottom">
            <div>
              <h2>
                ENGINEERED
                <br />
                <em>FOR SCALE.</em>
              </h2>
              <p>
                Commercial poultry infrastructure designed around capacity,
                automation and operational efficiency.
              </p>
            </div>
            <div className="panel-callout">
              <span className="capacity">50,000</span>
              <span className="section-label">
                Bird capacity / example brief
              </span>
              <p>
                Illustrative capacity. Every project is specified individually.
              </p>
              <ArrowLink
                href="/solutions/poultry-infrastructure"
                variant="outline"
              >
                View solution
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>
      <div className="solution-rail wrap">
        {solutions.slice(1).map((s) => (
          <Link key={s.slug} href={`/solutions/${s.slug}`}>
            <span>{s.number}</span>
            {s.short}
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>
      <InsideSystem />
      <Ecosystem />
      <IntentRouter />
      <section className="mart-preview wrap">
        <div className="section-heading">
          <div>
            <Label number="07">DekorajMart</Label>
            <h2>
              THE EQUIPMENT
              <br />
              <em>BEHIND THE OPERATION.</em>
            </h2>
          </div>
          <ArrowLink href="/mart" variant="text">
            Enter DekorajMart
          </ArrowLink>
        </div>
        <div className="product-grid">
          {products.slice(0, 3).map((p, i) => (
            <Link
              className="product-card"
              key={p.slug}
              href={`/mart/${p.slug}`}
            >
              <div className="product-image">
                <Photo src={p.image} alt={p.title} />
                <span className="product-index">0{i + 1}</span>
                <span className="product-arrow">
                  <ArrowUpRight size={24} />
                </span>
              </div>
              <div className="product-meta">
                <span>{p.category}</span>
                <span>Price on request</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.availability}</p>
            </Link>
          ))}
        </div>
        <p className="small-note">
          Reference equipment shown. Specifications, price and stock are
          confirmed with your quotation.
        </p>
      </section>
      <section className="field-chapter">
        <div data-parallax className="panel-photo">
          <Photo
            src="/images/fields.webp"
            alt="Tractors working a cultivated field in the golden afternoon light"
            position="center 60%"
          />
        </div>
        <div className="photo-shade" />
        <div className="wrap field-copy">
          <Label>A wider horizon</Label>
          <h2>
            FROM THE
            <br />
            FIRST HECTARE
            <br />
            <em>
              TO INDUSTRIAL
              <br />
              SCALE.
            </em>
          </h2>
          <p>
            Beyond poultry. Beyond individual systems. Agricultural development
            built around the full potential of your land.
          </p>
          <ArrowLink href="/solutions/custom-development" variant="outline">
            Explore farm development
          </ArrowLink>
        </div>
      </section>
      <section className="consultation-preview">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Label number="08">Let’s talk about your project</Label>
              <h2>
                START WITH
                <br />
                <em>THE RIGHT CONVERSATION.</em>
              </h2>
            </div>
            <p>
              Choose how you’d like to connect. Explore the calendar and prepare
              your consultation request in a few steps.
            </p>
          </div>
          <div className="consultation-cards">
            {consultationTypes.map((c) => (
              <Link href={`/consultation?type=${c.id}`} key={c.id}>
                <span className="section-label">{c.icon} / Consultation</span>
                <h3>{c.label}</h3>
                <p>{c.note}</p>
                <span className="consultation-detail">{c.duration}</span>
                <div>
                  <span>View dates & details</span>
                  <ArrowUpRight size={23} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <section className="showcase wrap">
        <div className="section-heading">
          <div>
            <Label number="10">Project possibilities</Label>
            <h2>
              BUILT FOR
              <br />
              <em>THE REAL WORLD.</em>
            </h2>
          </div>
          <p>
            Explore example project scopes. Verified Dekoraj case studies and
            delivery figures will be added as they become available.
          </p>
        </div>
        <Link href="/projects" className="showcase-feature">
          <Photo
            src="/images/chicks.webp"
            alt="Reference commercial chick production environment"
          />
          <div className="photo-shade" />
          <div>
            <span className="section-label">Illustrative project scope</span>
            <h3>Commercial poultry facility</h3>
            <p>Capacity planning / Housing / Equipment integration</p>
          </div>
          <span className="showcase-arrow">
            <ArrowUpRight size={32} />
          </span>
        </Link>
        <div className="metrics">
          {[
            ["XX+", "Projects"],
            ["XXK+", "Bird capacity delivered"],
            ["XX", "Locations"],
            ["XX+", "Clients"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="small-note">
          Placeholder metrics. Verified company figures have not been supplied.
        </p>
      </section>
      <section className="finance-preview wrap">
        <div>
          <Label number="11">Capital & collaboration</Label>
          <h2>
            YOUR NEXT
            <br />
            OPERATION
            <br />
            <em>
              STARTS WITH
              <br />
              POSSIBILITY.
            </em>
          </h2>
        </div>
        <div className="finance-stories">
          <article>
            <span className="section-label">01 / Financing enquiries</span>
            <h3>Don’t let the conversation stop at capital.</h3>
            <p>
              Discuss equipment and project financing requirements.
              Availability, eligibility and terms depend on the relevant funding
              provider.
            </p>
            <ArrowLink href="/financing" variant="text">
              Explore financing
            </ArrowLink>
          </article>
          <article>
            <span className="section-label">
              02 / Partnerships & investment
            </span>
            <h3>Build the future of agriculture with us.</h3>
            <p>
              For suppliers, institutions and project partners ready to explore
              what we can build together.
            </p>
            <ArrowLink href="/partnerships" variant="text">
              Start a partnership conversation
            </ArrowLink>
          </article>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
