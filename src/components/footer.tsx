import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" href="/">
            DEKORAJ<span>GROUP</span>
          </Link>
          <p>
            Building the infrastructure
            <br />
            behind modern agriculture.
          </p>
        </div>
        <div className="footer-links">
          {[
            ["Solutions", "/solutions"],
            ["Projects", "/projects"],
            ["DekorajMart", "/mart"],
            ["Consultation", "/consultation"],
            ["Financing", "/financing"],
            ["Invest & partner", "/partnerships"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([name, href]) => (
            <Link href={href} key={href}>
              {name}
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </div>
        <div className="footer-note">
          <span className="section-label">Built for the next generation</span>
          <p>
            Ideas become infrastructure.
            <br />
            Let’s begin with yours.
          </p>
          <Link href="/contact?interest=Updates" className="footer-updates">
            Request company updates <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dekoraj Group</span>
        <span>Agriculture. Infrastructure. Progress.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
