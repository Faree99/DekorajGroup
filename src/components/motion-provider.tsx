"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionProvider() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 900px)",
      () => {
        const lenis = new Lenis({
          autoRaf: false,
          duration: 1.05,
          anchors: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5, scale: 1.1 },
            {
              yPercent: 5,
              scale: 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
        return () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
    );
    return () => media.revert();
  }, [pathname]);
  return null;
}
