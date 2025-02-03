"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  {
    imageUrl: "/assets/images/hero-1.svg",
    alt: "hero-1",
  },
  {
    imageUrl: "/assets/images/hero-2.svg",
    alt: "hero-2",
  },
  {
    imageUrl: "/assets/images/hero-3.svg",
    alt: "hero-3",
  },
  {
    imageUrl: "/assets/images/hero-4.svg",
    alt: "hero-4",
  },
  {
    imageUrl: "/assets/images/hero-5.svg",
    alt: "hero-5",
  },
];
const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image, index) => (
          <Image
            key={index}
            src={image.imageUrl}
            width={484}
            height={484}
            alt={image.alt}
            className="object-contain"
          />
        ))}
      </Carousel>
      <Image
        src={"/assets/icons/hand-drawn-arrow.svg"}
        alt="arrow"
        height={175}
        width={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0"
      />
    </div>
  );
};

export default HeroCarousel;
