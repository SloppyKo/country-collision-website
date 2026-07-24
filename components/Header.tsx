"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactButton from "./ContactButton";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Our Story", href: "/#our-story" },
];

const navLinkClasses =
  "relative font-body text-sm text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-200 hover:after:scale-x-100";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo_final.png"
            alt="Country Collision"
            width={604}
            height={394}
            className="h-20 w-auto"
            preload
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={navLinkClasses}>
              {link.label}
            </Link>
          ))}
          <ContactButton label="Contact" />
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col items-start gap-4 px-6 pb-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={navLinkClasses}
            >
              {link.label}
            </Link>
          ))}
          <ContactButton label="Contact" />
        </nav>
      )}

      <div className="h-px w-full bg-border" />
    </header>
  );
}
