import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ContactSection() {
  return (
    <section id="contact" className="py-5">
      <Container>
        <h2 className="text-center mb-4">Contactez-nous</h2>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="Votre nom" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control type="email" placeholder="Votre adresse e-mail" />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Votre message" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <h4>Informations de contact</h4>
            <ul className="list-unstyled">
              <li><i className="fa fa-map-marker"></i> Adresse: 123 Rue du Garage, Ville, Pays</li>
              <li><i className="fa fa-phone"></i> Téléphone: +1234567890</li>
              <li><i className="fa fa-envelope"></i> Email: info@garageVincentParrot.com</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactSection;
