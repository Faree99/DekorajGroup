"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Pause, Play, X } from "lucide-react";
import { media } from "./media";

const chapters = [
  { label: "01 / The bigger picture", title: <>FROM THE GROUND.<br /><em>TO A GREATER SCALE.</em></>, text: "Agricultural infrastructure. Thoughtfully planned. Built to work as one." },
  { label: "02 / Get closer", title: <>EVERY STRUCTURE.<br /><em>A PURPOSE.</em></>, text: "From site development to housing, service routes and equipment integration." },
  { label: "03 / Inside the operation", title: <>BUILT TOGETHER.<br /><em>WORKING TOGETHER.</em></>, text: "Discover the systems behind modern poultry production." },
];

export function HeroJourney() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [story, setStory] = useState(false);
  const [storyFailed, setStoryFailed] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      let targetTime = 0;
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".dk-chapter");
        gsap.set(panels.slice(1), { autoAlpha: 0, y: 32 });
        const tl = gsap.timeline({ scrollTrigger: {
          trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.65,
          onUpdate: (s) => { targetTime = s.progress; setChapter(Math.min(2, Math.floor(s.progress * 3))); },
        }});
        tl.to(".dk-aerial", { scale: 1.24, yPercent: 3, duration: 3, ease: "none" }, 0)
          .to(panels[0], { autoAlpha: 0, y: -28, duration: 0.25 }, 0.65)
          .to(panels[1], { autoAlpha: 1, y: 0, duration: 0.3 }, 1)
          .to(panels[1], { autoAlpha: 0, y: -28, duration: 0.25 }, 1.7)
          .to(".dk-interior", { autoAlpha: 1, duration: 0.5 }, 1.9)
          .to(panels[2], { autoAlpha: 1, y: 0, duration: 0.35 }, 2.15);
        // At most one seek is outstanding. Seek the most recent scroll position after it completes.
        const seek = () => {
          const v = video.current;
          if (!v || !ready || failed || v.seeking || !Number.isFinite(v.duration)) return;
          const next = targetTime * Math.max(0, v.duration - 0.05);
          if (Math.abs(v.currentTime - next) > 0.06) { try { v.currentTime = next; } catch { /* media not seekable yet */ } }
        };
        gsap.ticker.add(seek);
        return () => gsap.ticker.remove(seek);
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [ready, failed]);

  useEffect(() => {
    const el = dialog.current;
    if (!el || !story) return;
    el.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { el.querySelector("video")?.pause(); if (el.open) el.close(); document.body.style.overflow = previous; opener.current?.focus(); };
  }, [story]);

  async function toggleVideo() {
    const v = video.current;
    if (!v) return;
    if (!v.paused) { v.pause(); return; }
    try { await v.play(); } catch { setPlaying(false); }
  }

  return <>
    <section className="dk-journey" ref={root} aria-label="The Dekoraj farm journey">
      <div className="dk-stage">
        <img className="dk-aerial" src={media.aerial} alt="Replace with an aerial photograph of your farm" fetchPriority="high" />
        {media.droneVideo && !failed && <video ref={video} className={`dk-drone ${ready ? "is-ready" : ""}`} src={media.droneVideo} muted playsInline preload="metadata" onLoadedData={() => setReady(true)} onError={() => setFailed(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} aria-label="Aerial farm film" />}
        <img className="dk-interior" src={media.interior} alt="Replace with the inside of your poultry house" />
        <div className="dk-film-shade" />
        <div className="dk-stage-top"><span>DEKORAJ GROUP</span><span>AGRICULTURE / ENGINEERING / PROGRESS</span></div>
        <div className="dk-chapters">
          {chapters.map((c, i) => <div className={`dk-chapter dk-chapter-${i}`} key={c.label}>
            <span className="dk-eyebrow">{c.label}</span><h1>{c.title}</h1><p>{c.text}</p>
            <div className="dk-actions"><a className="dk-button" href="/start-project">Start a project <ArrowUpRight size={18} /></a><a className="dk-text-link" href="#explore">Explore Dekoraj <ArrowDown size={16} /></a></div>
          </div>)}
        </div>
        <div className="dk-stage-bottom">
          <a href="#explore" className="dk-scroll"><ArrowDown size={18} /><span>Scroll to discover<small>From the ground up</small></span></a>
          <button ref={opener} className="dk-watch" onClick={() => setStory(true)}><Play size={15} /> Watch our story</button>
          <div className="dk-chapter-indicator" aria-label={`Chapter ${chapter + 1} of 3`}><span>0{chapter + 1} / 03</span><div>{chapters.map((_, i) => <i key={i} className={i === chapter ? "active" : ""} />)}</div></div>
        </div>
        {ready && !failed && <button className="dk-mobile-play" onClick={toggleVideo}>{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? "Pause aerial film" : "Play aerial film"}</button>}
      </div>
    </section>
    <dialog ref={dialog} className="dk-dialog" onClose={() => setStory(false)} onCancel={() => setStory(false)} onClick={e => { if (e.target === e.currentTarget) setStory(false); }}>
      <button className="dk-dialog-close" onClick={() => setStory(false)} aria-label="Close introduction"><X /></button>
      {story && media.storyVideo && !storyFailed ? <video src={media.storyVideo} controls autoPlay playsInline onError={() => setStoryFailed(true)} /> : <div className="dk-story-placeholder"><span className="dk-eyebrow">The Dekoraj story</span><h2>BUILDING WHAT<br /><em>AGRICULTURE RUNS ON.</em></h2><p>{storyFailed ? "The introduction could not be loaded. Please try again later." : "Our farm film is coming soon. Explore the people, structures and systems below."}</p><button className="dk-button" onClick={() => setStory(false)}>Continue exploring <ArrowDown size={18} /></button></div>}
    </dialog>
  </>;
}
