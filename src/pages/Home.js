import React from 'react'
import ServicesSection from '../components/Services/ServicesSection';
import AboutSection from '../components/UI/AboutSection';
import TestimonialSection from '../components/Testimonials/TestimonialSection';
import HeroSlider from '../components/UI/HeroSlider';
import FormContact from '../components/UI/FormContact';
import CarsHome from '../components/Cars/CarsHome';


const Home = () => {
  return (
    <>
      <HeroSlider />
      <ServicesSection />
      <CarsHome />
      <TestimonialSection />
      <AboutSection />
      <FormContact />
    </>
  )
}

export default Home