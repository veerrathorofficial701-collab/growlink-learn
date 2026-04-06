import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const TESTIMONIALS = [
  {
    quote: "GROLINQ has been instrumental in our digital expansion. Their strategic link-building campaigns brought immediate improvements to our search rankings and organic traffic. A truly essential partner!",
    name:  "Sarah J.",
    role:  "Marketing Director, InnovateTech",
  },
  {
    quote: "The quality of content and the precision of backlink placements from GROLINQ are unparalleled. They understood our niche perfectly, delivering consistent, high-authority results.",
    name:  "David C.",
    role:  "Founder & CEO, EcoSolutions",
  },
  {
    quote: "Working with GROLINQ has significantly amplified our online presence. Their efficient content distribution and dedicated support have allowed us to reach new audiences and grow our brand sustainably.",
    name:  "Maria P.",
    role:  "E-commerce Manager, StyleVault",
  },
  {
    quote: "GROLINQ's platform is incredibly intuitive. We launched our first campaign within hours and saw measurable ranking improvements within two weeks. Highly recommended for any serious agency.",
    name:  "James K.",
    role:  "SEO Lead, DigitalPeak Agency",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <div className="heading">
              <h5>CLIENT TESTIMONIALS</h5>
              <h2>Voices of Success</h2>
              <p>
                Hear directly from our valued partners about the tangible results
                and transformative growth they've experienced by working with GROLINQ.
              </p>
            </div>

            <Swiper
              modules={[Pagination, Autoplay, A11y]}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              a11y={{ prevSlideMessage: "Previous testimonial", nextSlideMessage: "Next testimonial" }}
              loop={true}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640:  { slidesPerView: 1 },
                768:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="testimonials-swiper"
            >
              {TESTIMONIALS.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="item">
                    <div className="content-bx">
                      <p>"{t.quote}"</p>
                    </div>
                    <div className="user">
                      <h4>{t.name}</h4>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="bottomText">
              <p>Our commitment is to your success, reflected in every partnership and every story of growth.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
