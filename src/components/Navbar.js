import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/",            label: "Home" },
  { to: "/about",       label: "About" },
  { to: "/cta",         label: "How it Works" },
  { to: "/testimonials",label: "Solutions" },
  { to: "/blog",        label: "Blog" },
  { to: "/Contact",     label: "Contact Us" },
];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const location = useLocation();

  // Detect scroll to add solid background
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function isActive(path) {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  }

  return (
    <header className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
      <div className="wrap">

        <div className="logo">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/img/logo/logo.png" alt="Grolinq" />
          </Link>
        </div>

        <nav className={menuOpen ? "nav-open" : ""}>
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={isActive(link.to) ? "nav-active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-right">
          <Link to="/Contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>

      {/* Overlay — always in DOM, activated via class */}
      <div
        className={`nav-overlay${menuOpen ? " active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
}
