import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ArrowLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
  className?: string;
}) {
  return (
    <Link href={href} className={`arrow-link ${variant} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function Label({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <div className="section-label">
      {number && <span>{number} /</span>}
      {children}
    </div>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  position,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 100vw, 90vw"
        priority={priority}
        style={{ objectFit: "cover", objectPosition: position || "center" }}
      />
    </div>
  );
}
export function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="page-heading wrap">
      <Label>{label}</Label>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <Photo
        src="/images/fields.webp"
        alt="Tractors at work across cultivated farmland in warm sunlight"
      />
      <div className="photo-shade" />
      <div className="wrap final-content">
        <Label>The next chapter starts here</Label>
        <h2>
          LET’S BUILD
          <br />
          WHAT AGRICULTURE
          <br />
          <em>NEEDS NEXT.</em>
        </h2>
        <div className="actions">
          <ArrowLink href="/start-project">Start a project</ArrowLink>
          <ArrowLink href="/consultation" variant="outline">
            Book a consultation
          </ArrowLink>
          <ArrowLink href="/mart" variant="text">
            Explore DekorajMart
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
