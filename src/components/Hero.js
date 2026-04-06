import { useEffect, useRef } from "react";

const WORDS  = ["Small", "Medium", "Enterprise"];
const PERIOD = 2000;

export default function Hero() {
  const rotateRef = useRef(null);
  const stateRef  = useRef({ txt: "", isDeleting: false, loopNum: 0 });

  useEffect(() => {
    const el = rotateRef.current;
    if (!el) return;

    let timer;

    function tick() {
      const s        = stateRef.current;
      const fullTxt  = WORDS[s.loopNum % WORDS.length];

      s.txt = s.isDeleting
        ? fullTxt.substring(0, s.txt.length - 1)
        : fullTxt.substring(0, s.txt.length + 1);

      el.innerHTML = `<span class="wrap">${s.txt}</span>`;

      let delta = 150 - Math.random() * 60;
      if (s.isDeleting) delta /= 2;

      if (!s.isDeleting && s.txt === fullTxt) {
        delta = PERIOD;
        s.isDeleting = true;
      } else if (s.isDeleting && s.txt === "") {
        s.isDeleting = false;
        s.loopNum++;
        delta = 400;
      }

      timer = setTimeout(tick, delta);
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home-slider">
      <div className="slider-wrap">
        <div className="text">
          <h1>
            Your <b>Trusted</b> Link Building Partner <br />
            for <span ref={rotateRef} className="txt-rotate"></span> Digital Agencies
          </h1>
          <p>
            Providing essential services for improving search engine rankings
            through effective link building, helping businesses grow their
            online visibility.
          </p>
          <div className="buttons">
            <div className="default_btn">
              <a href="https://app.grolinq.com">Grow Your Agency Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
