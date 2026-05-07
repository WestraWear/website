import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Image from "next/image";

const footerLinks = [
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Live Sales", href: "/live-sales" },
  { label: "Instagram Gallery", href: "/instagram-gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", color: "var(--champagne)" }}>
      {/* Top border */}
      <div
        className="h-px w-full"
        style={{ background: "rgba(184,149,106,0.1)" }}
      />

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-16 md:gap-24 mb-20">
          {/* Brand */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-4">
              <Image src="/logo_transparent.png" alt="Westra Wear Logo" width={120} height={120} className="h-16 w-16"/>
              <div>
              <span
                className="font-playfair text-5xl"
                style={{ color: "var(--text-dark)", fontStyle: "italic" }}
              >
                Westra Wear
              </span>
              <p
                className="font-inter text-[9px] tracking-[0.4em] uppercase mt-1"
                style={{ color: "var(--text-light)" }}
              >
                Define your presence
              </p>
              </div>
            </div>
            <p
              className="font-inter text-sm leading-7"
              style={{ color: "var(--text-light)" }}
            >
              A premium women&apos;s fashion brand celebrating elegance,
              femininity, and the art of dressing beautifully. Shop with us
              live on Facebook and Instagram.
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com/share/1BWf44pd5s/", label: "Facebook" },
                { Icon: FaInstagram, href: "https://www.instagram.com/westra_wear", label: "Instagram" },
                { Icon: FaWhatsapp, href: "https://wa.me/917501182583", label: "WhatsApp" }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:opacity-60"
                  style={{
                    border: "1px solid rgba(184,149,106,0.2)",
                    color: "var(--gold)",
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="font-inter text-[9px] tracking-[0.4em] uppercase mb-8"
              style={{ color: "var(--gold)" }}
            >
              Navigate
            </h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm transition-colors duration-300 hover:text-[var(--gold)]"
                    style={{ color: "var(--text-light)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-inter text-[9px] tracking-[0.4em] uppercase mb-8"
              style={{ color: "var(--gold)" }}
            >
              Get In Touch
            </h4>
            <div className="flex flex-col gap-5">
              <div>
                <p
                  className="font-inter text-[9px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "var(--text-light)", opacity: 0.5 }}
                >
                  Location
                </p>
                <p
                  className="font-inter text-sm leading-6"
                  style={{ color: "var(--text-mid)" }}
                >
                  Subhas Sarobar Park, Ghoshal Para
                  <br />
                  Beleghata, Kolkata, WB 700010
                </p>
              </div>
              <div>
                <p
                  className="font-inter text-[9px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "var(--text-light)", opacity: 0.5 }}
                >
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/917501182583"
                  className="font-inter text-sm transition-colors duration-300 hover:text-[var(--gold)]"
                  style={{ color: "var(--text-mid)" }}
                >
                  +91 75011 82583
                </a>
              </div>
              <div>
                <p
                  className="font-inter text-[9px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "var(--text-light)", opacity: 0.5 }}
                >
                  Email
                </p>
                <a
                  href="mailto:nathsweta9@gmail.com"
                  className="font-inter text-sm transition-colors duration-300 hover:text-[var(--gold)]"
                  style={{ color: "var(--text-mid)" }}
                >
                  nathsweta9@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(184,149,106,0.08)" }}
        >
          <p
            className="font-inter text-xs"
            style={{ color: "rgba(184,149,106,0.3)" }}
          >
            © {new Date().getFullYear()} Westra Wear. All rights reserved.
          </p>
          <p
            className="font-playfair text-sm italic"
            style={{ color: "rgba(184,149,106,0.35)" }}
          >
            Elegance, Curated.
          </p>
        </div>
      </div>
    </footer>
  );
}