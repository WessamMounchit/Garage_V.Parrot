// components/ContactSection.js
import React from 'react';

function ContactSection() {
  return (
    <section id="contact" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Contactez-nous</h2>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" className="form-control" id="name" placeholder="Votre nom" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Adresse e-mail</label>
                <input type="email" className="form-control" id="email" placeholder="Votre adresse e-mail" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" rows="5" placeholder="Votre message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          </div>
          <div className="col-md-6">
            <h4>Informations de contact</h4>
            <ul className="list-unstyled">
              <li><i className="fa fa-map-marker"></i> Adresse: 123 Rue du Garage, Ville, Pays</li>
              <li><i className="fa fa-phone"></i> Téléphone: +1234567890</li>
              <li><i className="fa fa-envelope"></i> Email: info@garageXYZ.com</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
