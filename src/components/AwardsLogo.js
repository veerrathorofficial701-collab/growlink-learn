import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function AwardsLogo() {
  return (
    <section className="awards_logo">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h4>Trusted by 500+ Digital Agencies & 2500+ Businesses Globally</h4>

            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 1500, disableOnInteraction: false }}
              loop={true}
              slidesPerView={6}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 2 },
                600: { slidesPerView: 4 },
                1000: { slidesPerView: 6 },
              }}
            >
              {[
                "buywebsiteleads-logo.webp",
                "casinobetsodds-logo.webp",
                "cryptotokenmedia-logo.webp",
                "hayakawa-logo.webp",
                "newsinsights-logo.webp",
                "synthesisworld-logo.webp",
                "fbuddy-logo.webp",
              ].map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    className="img-responsive"
                    src={`/img/logo/${img}`}
                    alt={img.replace(".webp", "")} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
