import React from 'react'
import Header from '../components/Header';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/UI/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Testimonial from '../components/Testimonial';
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
      <Testimonial />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default Home