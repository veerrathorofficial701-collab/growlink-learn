import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function SuccessSection() {
  return (
    <section className="Success-sec gray_bg">
      <div className="sec-row">
        <div className="heading">
          <h5>OUR MEASURABLE RESULTS</h5>
          <h2>Driving Client Success</h2>
          <p>
            At GROLINQ, client success is a guaranteed outcome. We deliver
            tangible results focused on sustainable growth and online presence,
            ensuring every data-driven strategy translates into measurable
            improvements for our partners.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
          className="success-swiper"
        >
          <SwiperSlide>
            <div className="item">
              <div className="content-bx">
                <div className="offer">+25%</div>
                <h4>Keyword Ranking Improved</h4>
                <p>
                  Our strategic link-building consistently elevates client
                  websites in search engine results, ensuring visibility for
                  critical industry terms and driving targeted organic search
                  traffic.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <div className="content-bx">
                <div className="offer">+300%</div>
                <h4>Organic Traffic Growth</h4>
                <p>
                  Clients see significant increases in qualified organic
                  traffic, driving higher engagement and a more relevant
                  audience. Our tailored approach ensures high-intent traffic
                  for better overall performance.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <div className="content-bx">
                <div className="offer">95%</div>
                <h4>Client Satisfaction</h4>
                <p>
                  Our commitment to quality and service is reflected in high
                  client retention and satisfaction. We build long-term
                  partnerships through transparent communication, consistent
                  results, and dedicated support.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <div className="content-bx">
                <div className="offer">10K+</div>
                <h4>Successful Campaigns</h4>
                <p>
                  We've executed thousands of campaigns, building high-authority
                  backlinks across diverse industries. Our extensive experience
                  delivers impactful results for businesses of all sizes and
                  sectors.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <div className="content-bx">
                <div className="offer">+15%</div>
                <h4>Conversion Rate Lift</h4>
                <p>
                  Beyond traffic, we boost actions that matter most, such as
                  leads, sales, or sign-ups. Our optimized content and targeted
                  placements contribute directly to improved conversion rates,
                  maximizing ROI.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <div className="content-bx">
                <div className="offer">Up to 80</div>
                <h4>Domain Authority Boost</h4>
                <p>
                  Our rigorous link-building strategies significantly increase
                  your website&apos;s Domain Authority (DA) and Domain Rating
                  (DR) scores, enhancing your site&apos;s credibility for search
                  engines.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="bottomText">
          <p>
            These metrics highlight our capability to deliver impactful,
            sustainable growth for our partners. We engineer comprehensive
            strategies that lead to measurable improvements in visibility,
            traffic, and your bottom line. Your success is our mission.
          </p>
        </div>
      </div>
    </section>
  );
}
