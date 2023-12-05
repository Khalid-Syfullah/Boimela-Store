import React from "react";
import { BestSellerSection } from "../../components/BestSellerSection";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import { NewArrivalSection } from "../../components/NewArrivalSection";
import { OurPicksSection } from "../../components/OurPicksSection";
import { PopularSection } from "../../components/PopularSection";
import Topbar from "../../components/Topbar/Topbar";

const LandingPage = () => {
  return (
    <>
      <Topbar />
      <Hero />
      <BestSellerSection />
      <OurPicksSection />
      <PopularSection />
      <NewArrivalSection />
      <Footer />
    </>
  );
};

export default LandingPage;
