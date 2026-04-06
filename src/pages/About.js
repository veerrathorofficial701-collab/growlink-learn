import Banner from "./Banner";
import IntroSec from "../components/introsec";
import WhySec from "../components/whysec";
import Ctapage from "../components/Ctapage";

export default function About() {
  return (
    <>
      <Banner
        title="About Us"
        description="We help agencies and brands scale their digital presence through strategic link building and PR."
        buttonText="Get Started "
        buttonLink="https://app.grolinq.com"
      />

      <IntroSec
        title_intro="Who We Are"
        description_intor="GROLINQ is a data-driven link-building marketplace that connects brands and agencies with high-authority publishers worldwide. We combine strategic PR, content marketing, and intelligent automation to deliver measurable growth for our clients."
        buttonLink_intor="https://app.grolinq.com"
        buttonText_intor="Join GROLINQ"
        intor_img="/img/logo/aboutus-img.png"
      />

      <WhySec />

      <Ctapage />
    </>
  );
}
