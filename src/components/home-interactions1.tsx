"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLink, Label, Photo } from "./ui";
import { processSteps } from "@/lib/content";

const systems = [
  [
    "Housing",
    "A foundation for performance.",
    "House layout, service routes and capacity need to work as one.",
    "/images/farm-exterior.webp",
  ],
  [
    "Feeding",
    "Consistency, built into the system.",
    "Plan distribution and access around the size and needs of your flock.",
    "/images/chicks.webp",
  ],
  [
    "Drinking",
    "Water at every point of need.",
    "Connect supply and distribution to the realities of your production house.",
    "/images/poultry-interior.webp",
  ],
  [
    "Cages",
    "Precision in every connection.",
    "Modular cage systems bring housing and daily operations together.",
    "/images/cage-system.webp",
  ],
  [
    "Ventilation",
    "A better operating environment.",
    "Airflow and house design are considered together from the start.",
    "/images/poultry-interior.webp",
  ],
  [
    "Lighting",
    "Designed around the daily cycle.",
    "Lighting forms part of the complete equipment and power plan.",
    "/images/poultry-interior.webp",
  ],
  [
    "Handling",
    "Movement with a purpose.",
    "Practical equipment supports handling, transport and everyday work.",
    "/images/crates.webp",
  ],
  [
    "Biosecurity",
    "Protection begins with planning.",
    "Consider access, separation and movement in the design of the facility.",
    "/images/farm-exterior.webp",
  ],
];
export function InsideSystem() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section className="system-section wrap" id="systems">
      <div className="section-heading">
        <div>
          <Label number="04">Precision at every level</Label>
          <h2>
            INSIDE
            <br />
            <em>THE SYSTEM.</em>
          </h2>
        </div>
        <p>
          A farm is only as strong as the way its components work together.
          Explore what goes into the operation.
        </p>
      </div>
      <div className="system-console">
        <div
          className="system-tabs"
          role="tablist"
          aria-label="Farm system components"
        >
          {systems.map((s, i) => (
            <button
              key={s[0]}
              role="tab"
              id={`system-tab-${i}`}
              aria-controls="system-panel"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const directions: Record<string, number> = {
                  ArrowRight: 1,
                  ArrowDown: 1,
                  ArrowLeft: -1,
                  ArrowUp: -1,
                };
                let next = i;
                if (event.key in directions)
                  next =
                    (i + directions[event.key] + systems.length) %
                    systems.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = systems.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                document.getElementById(`system-tab-${next}`)?.focus();
              }}
            >
              <small>0{i + 1}</small>
              {s[0]}
              <Plus size={16} />
            </button>
          ))}
        </div>
        <div
          id="system-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`system-tab-${active}`}
          className="system-visual"
        >
          <motion.div
            key={active}
            className="system-photo"
            initial={reduced ? false : { scale: 1.025 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Photo
              src={systems[active][3]}
              alt={`${systems[active][0]} reference for an agricultural production system`}
            />
          </motion.div>
          <div className="photo-shade" />
          <span className="system-cross top-left">+</span>
          <span className="system-cross top-right">+</span>
          <div className="system-caption">
            <span className="section-label">System / 0{active + 1}</span>
            <h3>{systems[active][1]}</h3>
            <p>{systems[active][2]}</p>
            <ArrowLink href="/consultation" variant="text">
              Discuss your specification
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
const nodes = [
  [
    "Farm construction",
    "Purpose-built agricultural structures, from planning through installation.",
    "/solutions/poultry-infrastructure",
  ],
  [
    "Farm setup",
    "Join the equipment, services and systems into one working operation.",
    "/solutions/custom-development",
  ],
  [
    "Poultry equipment",
    "The practical components behind daily production.",
    "/mart",
  ],
  [
    "DekorajMart",
    "Explore equipment and prepare a specification enquiry.",
    "/mart",
  ],
  [
    "Cold storage",
    "Storage infrastructure shaped by product and throughput.",
    "/solutions/cold-storage",
  ],
  [
    "Processing",
    "Create the connection between production and value addition.",
    "/solutions/processing-and-warehouses",
  ],
  [
    "Consultation",
    "The right questions before the first decisions.",
    "/consultation",
  ],
  [
    "Financing",
    "Discuss the capital requirements of your proposed project.",
    "/financing",
  ],
  [
    "Partnerships",
    "Connect capabilities and build something together.",
    "/partnerships",
  ],
  [
    "Investment",
    "Begin a structured conversation about project opportunities.",
    "/partnerships?interest=Investment",
  ],
];
export function Ecosystem() {
  const [active, setActive] = useState(0);
  return (
    <section className="ecosystem wrap">
      <div className="ecosystem-title">
        <Label number="05">Connected by design</Label>
        <h2>
          ONE PARTNER.
          <br />
          THE ENTIRE
          <br />
          <em>ECOSYSTEM.</em>
        </h2>
        <p>
          Specialist capabilities. A shared purpose. From a single piece of
          equipment to an integrated agricultural project.
        </p>
      </div>
      <div className="network">
        <div className="network-root">
          <span className="status-dot" />
          DEKORAJ GROUP<span>Integrated infrastructure</span>
        </div>
        <div className="network-nodes">
          {nodes.map((n, i) => (
            <button
              key={n[0]}
              className={active === i ? "active" : ""}
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {n[0]}
              <Plus size={12} />
            </button>
          ))}
        </div>
        <div className="network-detail" aria-live="polite">
          <h3>{nodes[active][0]}</h3>
          <p>{nodes[active][1]}</p>
          <Link href={nodes[active][2]}>
            Explore this capability <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
const intents = [
  ["Build a farm", "/solutions", "/images/farm-exterior.webp"],
  ["Buy equipment", "/mart", "/images/cage-system.webp"],
  [
    "Build cold storage",
    "/solutions/cold-storage",
    "/images/farm-exterior.webp",
  ],
  [
    "Set up processing",
    "/solutions/processing-and-warehouses",
    "/images/cage-system.webp",
  ],
  ["Book a consultation", "/consultation", "/images/chicks.webp"],
  ["Get financing", "/financing", "/images/fields.webp"],
  ["Invest / partner", "/partnerships", "/images/fields.webp"],
];
export function IntentRouter() {
  const [active, setActive] = useState(0);
  return (
    <section className="intent-section" id="build">
      <Photo
        src={intents[active][2]}
        alt="Agricultural infrastructure and equipment reference"
      />
      <div className="intent-shade" />
      <div className="wrap intent-layout">
        <div>
          <Label number="06">Find your next step</Label>
          <h2>
            WHAT
            <br />
            ARE YOU
            <br />
            <em>BUILDING?</em>
          </h2>
        </div>
        <div className="intent-list">
          {intents.map(([title, href, image], i) => (
            <Link
              href={href}
              key={title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={active === i ? "active" : ""}
            >
              <span className="intent-number">0{i + 1}</span>
              <span>{title}</span>
              <ArrowUpRight />
              <div
                className="intent-mobile-image"
                style={{ backgroundImage: `url(${image})` }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="process wrap">
      <div className="process-title">
        <Label number="09">A clear path forward</Label>
        <h2>
          FROM IDEA.
          <br />
          <em>TO OPERATION.</em>
        </h2>
        <p>
          The decisions, details and delivery that bring an agricultural project
          to life.
        </p>
        <div className="process-progress" aria-hidden="true">
          <span style={{ height: `${((active + 1) / 6) * 100}%` }} />
        </div>
      </div>
      <div className="process-list">
        {processSteps.map(([title, description], i) => (
          <details
            key={title}
            open={i === active}
            onToggle={(e) => {
              if (e.currentTarget.open) setActive(i);
            }}
          >
            <summary>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <Plus size={18} />
            </summary>
            <p>{description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
