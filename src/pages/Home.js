import React from 'react'
import Header from '../components/Header';
import HeroSection from '../components/HeroSection.js';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CarListing from '../components/CarListing';
import Testimonial from '../components/Testimonial';


const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <CarListing />
      <Testimonial />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default Home