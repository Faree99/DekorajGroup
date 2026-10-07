"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { media } from "./media";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => { gsap.fromTo(ref.current, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 94%", once: true } }); });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

const systems = [
  { name: "Housing", title: "A foundation for performance.", text: "House layout, access routes and capacity planning form the backbone of the operation.", image: media.structure, x: 35, y: 48 },
  { name: "Feeding", title: "Consistency in every line.", text: "Distribution and equipment access planned around your production requirements.", image: media.interior, x: 57, y: 58 },
  { name: "Cage systems", title: "Precision in every connection.", text: "Explore cage layouts, material choices and equipment integration with our team.", image: media.cages, x: 69, y: 38 },
  { name: "Ventilation", title: "Designed to breathe.", text: "Airflow, power and housing design considered together from the beginning.", image: media.interior, x: 45, y: 25 },
];
export function InsideSystem() {
  const [active, setActive] = useState(0);
  const current = systems[active];
  return <section className="dk-systems dk-wrap" id="systems">
    <Reveal className="dk-section-heading"><div><span className="dk-eyebrow">03 / Explore the operation</span><h2>EVERY PART.<br /><em>ONE SYSTEM.</em></h2></div><p>Select a system. Take a closer look at how every piece fits.</p></Reveal>
    <div className="dk-system-grid">
      <div className="dk-system-visual"><img key={current.image} src={current.image} alt={`${current.name} — media placeholder`} loading="lazy" /><span className="dk-image-caption">SYSTEM EXPLORER / {current.name.toUpperCase()}</span>{systems.map((s, i) => <button key={s.name} style={{ left: `${s.x}%`, top: `${s.y}%` }} className={`dk-hotspot ${active === i ? "active" : ""}`} onClick={() => setActive(i)} aria-label={`Explore ${s.name}`} aria-pressed={active === i}><Plus size={18} /></button>)}</div>
      <div className="dk-system-detail"><div className="dk-system-tabs" aria-label="Farm systems">{systems.map((s, i) => <button key={s.name} onClick={() => setActive(i)} aria-pressed={active === i} className={active === i ? "active" : ""}><span>0{i + 1}</span>{s.name}<ArrowUpRight size={16} /></button>)}</div><div className="dk-system-copy" aria-live="polite"><span className="dk-eyebrow">0{active + 1} / {current.name}</span><h3>{current.title}</h3><p>{current.text}</p><a href="/solutions/layer-and-broiler-systems" className="dk-text-link">Discuss your system <ArrowUpRight size={18} /></a></div></div>
    </div>
  </section>;
}
const gallery = [
  { image: media.aerial, label: "A different perspective", type: "The farm / Aerial", desc: "The whole operation, seen from above." },
  { image: media.structure, label: "Where plans take shape", type: "The structures / Architecture", desc: "Details of the farm housing and service routes." },
  { image: media.team, label: "The people behind the progress", type: "On site / Construction", desc: "Craft, coordination and care at work." },
  { image: media.ceo, label: "Knowledge you can build on", type: "Behind the systems / Leadership", desc: "A closer look at equipment with the Dekoraj team." },
];
export function FieldGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const item = gallery[index];
  function change(delta: number) { setIndex(i => (i + delta + gallery.length) % gallery.length); }
  useEffect(() => {
    if (!open || !dialog.current) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog.current?.close(); document.body.style.overflow = previous; opener.current?.focus(); };
  }, [open]);
  return <section className="dk-gallery dk-wrap" id="field">
    <Reveal className="dk-section-heading"><div><span className="dk-eyebrow">04 / From the field</span><h2>REAL WORK.<br /><em>EVERY ANGLE.</em></h2></div><p>The place. The people. The details that bring an operation to life.</p></Reveal>
    <div className="dk-gallery-main"><button ref={opener} className="dk-gallery-open" onClick={() => setOpen(true)} aria-label={`Enlarge ${item.label}`}><img src={item.image} alt={`${item.label} — replace with your photograph`} loading="lazy" /><span>View photograph <Plus size={18} /></span></button><div className="dk-gallery-meta" aria-live="polite"><span className="dk-eyebrow">{item.type}</span><h3>{item.label}</h3><p>{item.desc}</p></div><div className="dk-gallery-controls"><button onClick={() => change(-1)} aria-label="Previous photograph"><ArrowLeft size={20} /></button><span>0{index + 1} / 04</span><button onClick={() => change(1)} aria-label="Next photograph"><ArrowRight size={20} /></button></div></div>
    <div className="dk-thumbnails">{gallery.map((g, i) => <button key={g.label} className={index === i ? "active" : ""} onClick={() => setIndex(i)} aria-pressed={index === i}><img src={g.image} alt="" loading="lazy" /><span>0{i + 1} / {g.type.split(" / ")[0]}</span></button>)}</div>
    <dialog className="dk-dialog dk-lightbox" ref={dialog} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} onKeyDown={e => { if (e.key === "ArrowRight") change(1); if (e.key === "ArrowLeft") change(-1); }}><button className="dk-dialog-close" aria-label="Close photograph" onClick={() => setOpen(false)}><X /></button><img src={item.image} alt={item.label} /><div className="dk-lightbox-bar"><button onClick={() => change(-1)} aria-label="Previous photograph"><ArrowLeft /></button><span>{item.label}</span><button onClick={() => change(1)} aria-label="Next photograph"><ArrowRight /></button></div></dialog>
  </section>;
}
const intents = [
  { name: "Build a farm", heading: "From your first sketch to a working operation.", text: "Tell us about your land, capacity and plans. Let’s define the infrastructure together.", href: "/start-project", action: "Start your project" },
  { name: "Find equipment", heading: "The right tools for your operation.", text: "Explore poultry systems and agricultural equipment. Discuss specifications with our team.", href: "/mart", action: "Explore DekorajMart" },
  { name: "Get expert advice", heading: "Start with the right conversation.", text: "Choose an online consultation, an in-person meeting or a site visit.", href: "/consultation", action: "Explore consultations" },
  { name: "Partner with us", heading: "Build something bigger, together.", text: "For suppliers, institutions and project partners exploring agricultural development.", href: "/partnerships", action: "Start a conversation" },
];
export function IntentRouter() {
  const [active, setActive] = useState(0);
  const item = intents[active];
  return <section className="dk-intent" id="next"><div className="dk-wrap"><Reveal><span className="dk-eyebrow">05 / Your next move</span><h2>WHAT ARE YOU<br /><em>HERE TO BUILD?</em></h2></Reveal><div className="dk-intent-grid"><div className="dk-intent-options">{intents.map((intent, i) => <button key={intent.name} onClick={() => setActive(i)} className={active === i ? "active" : ""} aria-pressed={active === i}><span>0{i + 1}</span>{intent.name}<ArrowUpRight size={22} /></button>)}</div><div className="dk-intent-result" aria-live="polite"><span className="dk-eyebrow">Let’s make it happen</span><h3>{item.heading}</h3><p>{item.text}</p><a className="dk-button" href={item.href}>{item.action}<ArrowUpRight size={18} /></a></div></div></div></section>;
}
const steps = [
  ["Discover", "We start with your vision.", "Discuss your goals, site, intended capacity and operational needs."],
  ["Design", "Make every detail count.", "Define layout, infrastructure, equipment and the practical delivery plan."],
  ["Develop", "Bring the plan to life.", "Coordinate site works, construction and equipment installation against the agreed scope."],
  ["Deliver", "Ready for the next chapter.", "Review the finished scope, handover needs and operational support requirements."],
];
export function Process() {
  const [active, setActive] = useState(0);
  return <section className="dk-process dk-wrap"><Reveal className="dk-section-heading"><div><span className="dk-eyebrow">06 / How we work</span><h2>A CLEAR PATH.<br /><em>FROM IDEA TO IMPACT.</em></h2></div><p>One connected journey. Explore each step.</p></Reveal><div className="dk-process-grid">{steps.map(([label, title, text], i) => <article className={active === i ? "active" : ""} key={label}><button onClick={() => setActive(i)} aria-expanded={active === i} aria-controls={`dk-step-${i}`}><span>0{i + 1}</span><h3>{label}</h3><Plus size={20} /></button><div id={`dk-step-${i}`} hidden={active !== i}><h4>{title}</h4><p>{text}</p></div></article>)}</div></section>;
}
