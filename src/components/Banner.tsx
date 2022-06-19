import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent z-20 bottom-0" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
      >
        {[
          <div key="1">
            <img src="https://links.papareact.com/gi1" loading="lazy" />
          </div>,
          <div key="2">
            <img src="https://links.papareact.com/6ff" loading="lazy" />
          </div>,
          <div key="3">
            <img src="https://links.papareact.com/7ma" loading="lazy" />
          </div>,
        ]}
      </Carousel>
    </div>
  );
}

export default Banner;
