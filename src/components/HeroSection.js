// components/HeroSection.js
import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section id="hero" className="vh-100 text-black text-center py-5 position-relative">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4">Garage de Vincent Parrot</h1>
            <p className="lead">Votre destination pour tous vos besoins automobiles</p>
            <a href="#contact" className="btn btn-danger btn-lg">Prenez rendez-vous</a>
          </div>
          <div className="col-lg-6">
            <img src="/Car.png" alt="Car" className="car-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
