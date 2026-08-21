"use client";

import { useState } from "react";

const links = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#data", label: "Data" },
  { href: "#method", label: "Method" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="GRIM SIGNAL LABS home" onClick={closeMenu}>
        <img
          className="brand-logo"
          src="/grim-signal-labs-logo.png"
          alt="GRIM SIGNAL LABS"
          width="1741"
          height="412"
        />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <a className="header-cta" href="#contact">
        Start a mission <span aria-hidden="true">↗</span>
      </a>

      <button
        className={`menu-toggle${menuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <a className="mobile-mission" href="#contact" onClick={closeMenu}>Start a mission ↗</a>
      </nav>
    </header>
  );
}
