import React, { useEffect } from "react";
import ServicesSection from "../components/Services/ServicesSection";
import AboutSection from "../components/UI/AboutSection";
import TestimonialSection from "../components/Testimonials/TestimonialSection";
import HeroSlider from "../components/UI/HeroSlider";
import FormContact from "../components/UI/FormContact";
import CarsHome from "../components/Cars/CarsHome";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSlider />
      <ServicesSection />
      <CarsHome />
      <TestimonialSection />
      <AboutSection />
      <FormContact />
    </>
  );
};

export default Home;
