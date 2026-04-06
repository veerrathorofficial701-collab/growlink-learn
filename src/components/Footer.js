import { useState, useEffect } from "react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-left">
            <div className="privacy_policy">
              Copyright © {year} GROLINQ. All rights reserved.
            </div>
          </div>
          <div className="col-md-6 text-right">
            <div className="links">
              <a href="/privacy-policy">Privacy Policy</a> |
              <a href="/terms-and-conditions"> Terms and Conditions</a>
            </div>
          </div>
        </div>
      </div>

      {showTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
}
