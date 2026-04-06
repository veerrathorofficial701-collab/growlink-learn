import { useEffect, useRef } from "react";

const ITEMS = [
  { img: "/img/logo/solutions-logo.png", alt: "solutions",   title: "Strategic Digital Solutions", body: "We provide tailored digital solutions that drive sustainable growth in today's evolving market." },
  { img: "/img/logo/connections.png",    alt: "connections", title: "Meaningful Connections",       body: "We cultivate valuable relationships, connecting technology, people, and opportunities for mutual benefit." },
  { img: "/img/logo/Impact.png",         alt: "impact",      title: "Innovative Impact",            body: "We bridge advanced technology with real-world business challenges to deliver measurable results." },
];

export default function Growth() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".content-bx");
    if (!cards) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="Growth-sec" ref={sectionRef}>
      <div className="container">
        <div className="row">

          <div className="col-md-12">
            <div className="heading">
              <h2>Your Catalyst for Digital Growth</h2>
              <p>At GROLINQ, we propel brands into the future. By integrating strategic PR, expansive digital reach, and precise data analytics, we deliver measurable results.</p>
            </div>
          </div>

          {ITEMS.map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="content-bx" style={{ transitionDelay: `${i * 0.15}s` }}>
                <img src={item.img} alt={item.alt} className="img-responsive" />
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
