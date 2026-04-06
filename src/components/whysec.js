import { useState } from "react";

const ITEMS = [
  {
    title: "Data-Driven Insights",
    body:  "Leverage millions of verified data points to make informed decisions and precisely target your audience, ensuring every strategy is optimized for maximum impact and ROI.",
  },
  {
    title: "Strategic Connections",
    body:  "Beyond simple networking, we build meaningful, collaborative partnerships that bridge technology with real-world business needs, creating lasting value and expanding market reach.",
  },
  {
    title: "Measurable Growth",
    body:  "Our commitment is to tangible results. We focus on boosting sales, enhancing customer loyalty, and accelerating sustainable growth, providing clear metrics for your success.",
  },
];

export default function WhySec() {
  const [active, setActive] = useState(0);

  return (
    <section className="why-sec">
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <div className="heading">
              <h2>Why GroLinq?</h2>
              <p>Choose GROLINQ to transform your digital presence into a powerful engine for sustainable success.</p>
            </div>
          </div>

          <div className="col-md-8">
            <div className="textslider">
              {ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`box${active === i ? " expanded" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
