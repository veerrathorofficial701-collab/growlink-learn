import Banner from "./Banner";
import Growth from "../components/Growth";
import Value from "../components/value";
import Ctapage from "../components/Ctapage";

export default function HowItWorks() {
  return (
    <>
      <Banner
        title="How It Works"
        description="A simple, transparent, and powerful process to grow your digital presence with GROLINQ."
        buttonText="Get Started"
        buttonLink="https://app.grolinq.com"
      />

      <section className="how-steps-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading text-center">
                <h2>Your Journey to Growth</h2>
                <p>Four simple steps to launch your link-building campaign</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="content-bx text-center">
                <div className="step-number">01</div>
                <h4>Sign Up</h4>
                <p>Create your free GROLINQ account and set up your brand or agency profile in minutes.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="content-bx text-center">
                <div className="step-number">02</div>
                <h4>Choose Publishers</h4>
                <p>Browse our network of 80,000+ curated media outlets and select the best fit for your niche.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="content-bx text-center">
                <div className="step-number">03</div>
                <h4>Launch Campaign</h4>
                <p>Submit your content or let our team craft it. We handle outreach, placement, and publishing.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="content-bx text-center">
                <div className="step-number">04</div>
                <h4>Track Results</h4>
                <p>Monitor your backlinks, rankings, and traffic in real time through your GROLINQ dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Growth />

      <Value />

      <Ctapage />
    </>
  );
}
