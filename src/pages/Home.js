import React from 'react'
import Header from '../components/Header';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/UI/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import TestimonialSection from '../components/UI/TestimonialSection';
import HeroSlider from '../components/UI/HeroSlider';
import CarsSection from '../components/UI/CarsSection';


const Home = () => {
  return (
    <>
      <Header />
      <section className="p-0 hero__slider-section">
        <HeroSlider />
      </section>
      <ServicesSection />
      <CarsSection />
      <TestimonialSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default Home