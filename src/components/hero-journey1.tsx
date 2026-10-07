"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play, X } from "lucide-react";
import { ArrowLink, Label, Photo } from "./ui";

export function HeroJourney() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDialogElement>(null);
  const [story, setStory] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
            },
          });
          tl.to(".hero-image", { scale: 1.18, duration: 1.2, ease: "none" }, 0)
            .to(
              ".hero-copy, .hero-bottom",
              { y: -60, opacity: 0, duration: 0.3 },
              0.12,
            )
            .fromTo(
              ".interior-scene",
              { clipPath: "inset(100% 0 0 0)" },
              { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "none" },
              0.43,
            )
            .fromTo(
              ".interior-image",
              { scale: 1.02 },
              { scale: 1.15, duration: 0.65, ease: "none" },
              0.65,
            )
            .fromTo(".interior-copy", { y: 45 }, { y: 0, duration: 0.5 }, 0.8);
        }, root);
        return () => ctx.revert();
      },
    );
    return () => mm.revert();
  }, []);
  useEffect(() => {
    if (!story) return;
    intro.current?.showModal();
    const timer = setTimeout(() => {
      intro.current?.close();
      setStory(false);
    }, 4800);
    return () => clearTimeout(timer);
  }, [story]);
  return (
    <>
      <section
        ref={root}
        className="hero-journey"
        aria-label="Explore agricultural infrastructure"
      >
        <div className="journey-stage">
          <div className="exterior-scene">
            <Photo
              className="hero-image"
              src="/images/farm-exterior.webp"
              alt="Concept visual of modern commercial poultry houses, feed silos and a gravel service road at dawn"
              priority
              position="62% center"
            />
            <div className="hero-shade" />
            <div className="hero-copy wrap">
              <Label>Infrastructure for a growing world</Label>
              <h1>
                BUILDING THE
                <br />
                INFRASTRUCTURE
                <br />
                BEHIND MODERN
                <br />
                <em>AGRICULTURE.</em>
              </h1>
              <div className="hero-under">
                <p>
                  From commercial farm construction and automated poultry
                  systems to equipment, cold-chain infrastructure and project
                  development.
                </p>
                <div className="actions">
                  <ArrowLink href="/start-project">Start a project</ArrowLink>
                  <ArrowLink href="#explore" variant="text">
                    Explore Dekoraj
                  </ArrowLink>
                </div>
              </div>
            </div>
            <div className="hero-bottom wrap">
              <a href="#explore" className="scroll-cue">
                <span className="circle">
                  <ArrowDown size={17} />
                </span>
                <span>
                  Scroll to explore<small>From the ground up</small>
                </span>
              </a>
              <button className="story-button" onClick={() => setStory(true)}>
                <Play size={12} /> The Dekoraj introduction
              </button>
              <span className="scene-note">
                01 / Agricultural infrastructure
                <small>Illustrative concept visual</small>
              </span>
            </div>
            <div className="hero-side">
              AGRICULTURE / ENGINEERING / PROGRESS
            </div>
          </div>
          <div className="interior-scene">
            <Photo
              className="interior-image"
              src="/images/poultry-interior.webp"
              alt="Poultry house with birds, automated feeder lines and drinking systems"
              position="center 42%"
            />
            <div className="photo-shade" />
            <div className="interior-copy wrap">
              <Label number="02">Inside the operation</Label>
              <h2>
                INFRASTRUCTURE
                <br />
                THAT PERFORMS
                <br />
                <em>AT SCALE.</em>
              </h2>
              <p>
                Modern poultry production depends on more than buildings.
                Infrastructure, equipment and operational systems work better
                together.
              </p>
              <ArrowLink
                href="/solutions/layer-and-broiler-systems"
                variant="outline"
              >
                Explore the systems
              </ArrowLink>
            </div>
            <div className="technical-tag tag-one">
              <span>01</span> Automated feeding
              <i />
            </div>
            <div className="technical-tag tag-two">
              <span>02</span> Water systems
              <i />
            </div>
            <div className="interior-specs">
              <span>Housing</span>
              <span>Ventilation</span>
              <span>Power</span>
              <span>Biosecurity</span>
              <span>Capacity planning</span>
            </div>
          </div>
        </div>
      </section>
      <dialog
        ref={intro}
        className="intro-dialog"
        onClose={() => setStory(false)}
        onCancel={() => setStory(false)}
      >
        <button
          onClick={() => {
            intro.current?.close();
            setStory(false);
          }}
        >
          Skip introduction <X size={17} />
        </button>
        <span className="section-label">DEKORAJ GROUP</span>
        <h2>
          BUILDING WHAT
          <br />
          MODERN AGRICULTURE
          <br />
          <em>RUNS ON.</em>
        </h2>
        <div className="intro-line" />
        <p>Agricultural infrastructure / Technology / Commerce</p>
      </dialog>
    </>
  );
}
