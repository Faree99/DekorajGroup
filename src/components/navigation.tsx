"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { solutions } from "@/lib/content";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setMega(false);
      }
    };
    const outside = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMega(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  const close = () => {
    setMenu(false);
    setMega(false);
  };
  return (
    <header
      ref={navRef}
      className={`site-header ${scrolled || pathname !== "/" || menu || mega ? "compact" : ""}`}
    >
      <Link
        href="/"
        className="brand"
        onClick={close}
        aria-label="Dekoraj Group home"
      >
        <span className="brand-mark">
          <i />
          <i />
          <i />
        </span>
        <span>
          DEKORAJ<small>G R O U P</small>
        </span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        <button
          aria-expanded={mega}
          aria-controls="solutions-menu"
          onClick={() => setMega(!mega)}
        >
          Solutions <ChevronDown size={12} />
        </button>
        <Link href="/projects">Projects</Link>
        <Link href="/mart">DekorajMart</Link>
        <Link href="/financing">Financing</Link>
        <Link href="/partnerships">Invest & partner</Link>
        <Link href="/about">About</Link>
      </nav>
      <Link href="/start-project" className="nav-cta">
        Start a project <ArrowUpRight size={16} />
      </Link>
      <button
        className="menu-toggle"
        aria-label={menu ? "Close menu" : "Open menu"}
        aria-expanded={menu}
        aria-controls="mobile-menu"
        onClick={() => setMenu(!menu)}
      >
        {menu ? <X /> : <Menu />}
      </button>
      {mega && (
        <div className="mega-menu" id="solutions-menu">
          <div>
            <span className="section-label">One connected operation</span>
            <h3>
              From the ground.
              <br />
              To what’s next.
            </h3>
            <Link href="/solutions" onClick={close}>
              Explore every solution <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="mega-links">
            {solutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} onClick={close}>
                <span>{s.number}</span>
                {s.short}
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
        </div>
      )}
      {menu && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {[
            ["Solutions", "/solutions"],
            ["Projects", "/projects"],
            ["DekorajMart", "/mart"],
            ["Consultation", "/consultation"],
            ["Financing", "/financing"],
            ["Invest & partner", "/partnerships"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, href], i) => (
            <Link href={href} key={href} onClick={close}>
              <small>0{i + 1}</small>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
