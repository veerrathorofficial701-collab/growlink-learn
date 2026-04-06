import Banner from "./Banner";
import Services from "../components/services";
import Testimonials from "../components/testimonials-sec";
import Ctapage from "../components/Ctapage";

export default function Solutions() {
  return (
    <>
      <Banner
        title="Our Solutions"
        description="Comprehensive digital growth solutions tailored to your brand's unique needs and goals."
        buttonText="Explore Solutions"
        buttonLink="https://app.grolinq.com"
      />

      <Services />

      <Testimonials />

      <Ctapage />
    </>
  );
}
