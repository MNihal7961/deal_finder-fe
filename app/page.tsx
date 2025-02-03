import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="px-6 py-24 md:px-20">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here :
              <Image
                src={"/assets/icons/arrow-right.svg"}
                width={16}
                height={16}
                alt="arrow"
              />
            </p>
            <h1 className="head-text">
              unleash the power of{" "}
              <span className="text-primary">Deal Finder</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and reatin more.
            </p>
            <SearchBar/>
          </div>
          <HeroCarousel/>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">

        </div>
      </section>
    </>
  );
};

export default Home;
