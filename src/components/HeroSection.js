// components/HeroSection.js
import React from 'react';
import './HeroSection.css'

function HeroSection() {
  return (
    <section id="hero" className="bg-danger text-white text-center py-5">
      <div className="container">
        <h1 className="display-4">Garage de Vincent Parrot</h1>
        <p className="lead">Votre destination pour tous vos besoins automobiles</p>
        <a href="#contact" className="btn btn-light btn-lg">Prenez rendez-vous</a>
      </div>
    </section>
  );
}

export default HeroSection;
