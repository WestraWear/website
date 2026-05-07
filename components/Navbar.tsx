"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Live Sales", href: "/live-sales" },
  { label: "Instagram", href: "/instagram-gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          borderBottom: scrolled ? "1px solid rgba(184,149,106,0.12)" : "1px solid transparent",
          background: scrolled ? "rgba(248,244,238,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          paddingTop: scrolled ? "14px" : "24px",
          paddingBottom: scrolled ? "14px" : "24px",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex">
            <Image src="/logo_transparent.png" alt="Westra Wear Logo" width={120} height={120} className="h-8 w-8"/>
            <div className="group flex flex-col items-start leading-none">
              <span
                className="font-playfair text-[22px] tracking-[0.12em] transition-opacity duration-300 group-hover:opacity-70"
                style={{ color: "var(--text-dark)", fontStyle: "italic" }}
              >
                Westra Wear
              </span>
              <span
                className="font-inter text-[8px] tracking-[0.4em] uppercase mt-0.5"
                style={{ color: "var(--text-light)", letterSpacing: "0.35em" }}
              >
                Define your presence
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="gold-underline font-inter text-[10px] tracking-[0.22em] uppercase transition-colors duration-300"
                style={{
                  color: pathname === link.href ? "var(--gold)" : "var(--text-mid)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/917501182583"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2.5 font-inter text-[10px] tracking-[0.25em] uppercase btn-whatsapp flex items-center gap-2"
              style={{
                border: "1px solid rgba(184,149,106,0.5)",
                color: "var(--gold)",
              }}
            >
              <FaWhatsapp size={12} />
              WhatsApp
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "var(--text-dark)",
                transform: menuOpen ? "rotate(45deg) translate(3.5px, 3.5px)" : "",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "var(--text-dark)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "var(--text-dark)",
                transform: menuOpen ? "rotate(-45deg) translate(3.5px, -3.5px)" : "",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-end"
            style={{ background: "var(--bg)" }}
          >
            {/* top close area */}
            <div
              className="absolute top-0 right-0 left-0 h-20 border-b"
              style={{ borderColor: "rgba(184,149,106,0.08)" }}
            />
            <div className="flex flex-col justify-center items-start gap-6 px-10 pb-20 pt-28 h-full">
              <span
                className="font-inter text-[9px] tracking-[0.4em] uppercase mb-6"
                style={{ color: "var(--text-light)" }}
              >
                Navigation
              </span>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.15 }}
                >
                  <Link
                    href={link.href}
                    className="font-playfair text-4xl tracking-tight transition-colors duration-300 hover:text-[var(--gold)]"
                    style={{ color: pathname === link.href ? "var(--gold)" : "var(--text-dark)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.15 }}
                href="https://wa.me/917501182583"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 font-inter text-[10px] tracking-[0.3em] uppercase px-6 py-3 btn-whatsapp flex items-center gap-2"
                style={{ border: "1px solid rgba(184,149,106,0.4)", color: "var(--gold)" }}
              >
                <FaWhatsapp size={12} />
                WhatsApp Us
              </motion.a>

              <div
                className="absolute bottom-10 left-10 right-10 h-px"
                style={{ background: "rgba(184,149,106,0.1)" }}
              />
              <p
                className="absolute bottom-14 left-10 font-inter text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "var(--text-light)" }}
              >
                Define your presence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
