import { useEffect, useRef } from "react";

const CARDS = [
  { num: "01", img: "/img/logo/img-01.png", title: "Pay-As-You-Go Pricing",      body: "Transparent, no-subscription model. Only pay for the links you use." },
  { num: "02", img: "/img/logo/img-02.png", title: "Global Publisher Network",   body: "Instantly access 80,000+ curated media outlets worldwide." },
  { num: "03", img: "/img/logo/img-03.png", title: "AI-Powered Automation",      body: "Automate link matching, content optimization, and performance tracking." },
  { num: "04", img: "/img/logo/img-04.png", title: "24/7 Expert Guidance",       body: "Dedicated SEO strategists offer round-the-clock support for your growth." },
  { num: "05", img: "/img/logo/img-05.png", title: "Full Transparency",          body: "Every step is clear, measurable, and directly aligned with your objectives." },
];

export default function Value() {
  const spaceRef    = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    const spaceHolder = spaceRef.current;
    const horizontal  = horizontalRef.current;
    if (!spaceHolder || !horizontal) return;

    // Disable on mobile — stack vertically via CSS
    if (window.innerWidth <= 991) return;

    function calcSpaceHeight() {
      return Math.max(horizontal.scrollWidth - window.innerWidth + window.innerHeight, 0);
    }

    function setSpaceHeight() {
      spaceHolder.style.height = calcSpaceHeight() + "px";
    }

    function updatePosition() {
      const scrollTop  = window.pageYOffset;
      const start      = spaceHolder.getBoundingClientRect().top + window.pageYOffset;
      const maxTrans   = Math.max(horizontal.scrollWidth - window.innerWidth, 0);
      const available  = Math.max(spaceHolder.offsetHeight - window.innerHeight, 1);
      const relative   = Math.min(Math.max(scrollTop - start, 0), available);
      const progress   = (relative / available) * maxTrans;
      horizontal.style.transform = `translateX(-${progress}px)`;
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => { updatePosition(); ticking = false; });
        ticking = true;
      }
    }

    function onResize() {
      if (window.innerWidth <= 991) {
        spaceHolder.style.height = "auto";
        horizontal.style.transform = "none";
        return;
      }
      setSpaceHeight();
      updatePosition();
    }

    setSpaceHeight();
    updatePosition();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="value-sec">
      <div className="wrapper">
        <div className="space-holder" ref={spaceRef}>
          <div className="sticky black_bg">

            {/* Mobile heading — shown only on small screens via CSS */}
            <div className="heading-box ForMob">
              <h2>Our Unique Value Proposition</h2>
              <p>"GROLINQ empowers brands and agencies with a data-driven link-building marketplace, providing seamless access to high-authority publishers, transparent pricing, and intelligent automation — all from a single platform."</p>
              <h4>Why GROLINQ Stands Apart:</h4>
            </div>

            <div className="horizontal" ref={horizontalRef}>
              <div role="feed" className="cards">

                {/* Desktop heading card */}
                <article className="sample-card">
                  <div className="heading-box">
                    <h2>Our Unique Value Proposition</h2>
                    <p>"GROLINQ empowers brands and agencies with a data-driven link-building marketplace, providing seamless access to high-authority publishers, transparent pricing, and intelligent automation — all from a single platform."</p>
                    <h4>Why GROLINQ Stands Apart:</h4>
                  </div>
                </article>

                {CARDS.map(c => (
                  <article key={c.num} className="sample-card">
                    <div className="content-bx">
                      <div className="number">{c.num}</div>
                      <div className="img">
                        <img src={c.img} alt={c.title} />
                      </div>
                      <div className="text">
                        <h4>{c.title}</h4>
                        <p>{c.body}</p>
                      </div>
                    </div>
                  </article>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
