// components/ServicesSection.js
import React from 'react';

function ServicesSection() {
  return (
    <section id="services" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="service1.jpg" className="card-img-top" alt="Service 1" />
              <div className="card-body">
                <h5 className="card-title">Réparation automobile</h5>
                <p className="card-text">Nous offrons une large gamme de services de réparation automobile pour tous types de
                  véhicules.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="service2.jpg" className="card-img-top" alt="Service 2" />
              <div className="card-body">
                <h5 className="card-title">Entretien préventif</h5>
                <p className="card-text">Notre équipe expérimentée propose des services d'entretien préventif pour garder votre
                  véhicule en bon état.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="service3.jpg" className="card-img-top" alt="Service 3" />
              <div className="card-body">
                <h5 className="card-title">Diagnostic avancé</h5>
                <p className="card-text">Nous utilisons des outils de diagnostic de pointe pour identifier rapidement les
                  problèmes de votre véhicule.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
