// components/HeroSection.js
import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section id="hero" className="text-black text-center py-5 position-relative">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <h1 className="display-4 fw-bold ">Garage de Vincent Parrot</h1>
            <p className="lead">Votre destination pour tous vos besoins automobiles</p>
            <a href="#contact" className="btn btn-danger btn-lg">Prenez rendez-vous</a>
          </div>
          <div className="col-lg-7">
            <img src="/Car.png" alt="Car" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
