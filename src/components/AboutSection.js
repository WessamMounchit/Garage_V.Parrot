import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-4">À propos de nous</h2>
            <p>Nous sommes une équipe de mécaniciens passionnés dédiés à fournir des services automobiles de qualité à nos
              clients. Avec des années d'expérience, nous sommes fiers de notre expertise et de notre engagement envers la
              satisfaction du client.</p>
            <p>Nous nous efforçons de maintenir des normes élevées en matière de réparation, d'entretien et de service à la
              clientèle. Laissez-nous prendre soin de votre véhicule et profitez de la tranquillité d'esprit sur la route.</p>
          </div>
          <div className="col-md-6">
            <img src="https://images.pexels.com/photos/1325710/pexels-photo-1325710.jpeg?auto=compress&cs=tinysrgb&w=600" className="img-fluid" alt="À propos de nous" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
