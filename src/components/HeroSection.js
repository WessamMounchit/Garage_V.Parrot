// components/HeroSection.js
import React from 'react';

function HeroSection() {
  return (
    <section id="hero" className="bg-primary text-white text-center py-5">
      <div className="container">
        <h1 className="display-4">Bienvenue chez Garage XYZ</h1>
        <p className="lead">Votre destination pour tous vos besoins automobiles</p>
        <a href="#contact" className="btn btn-light btn-lg">Prenez rendez-vous</a>
      </div>
    </section>
  );
}

export default HeroSection;
