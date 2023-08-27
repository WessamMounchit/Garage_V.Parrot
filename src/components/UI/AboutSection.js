import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/about-section.css";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
    /* style={
      aboutClass === "aboutPage"
        ? { marginTop: "0px" }
        : { marginTop: "280px" }
    } */
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h2 className="section__title">À propos de nous</h2>
              <p className="section__description">Nous sommes une équipe de mécaniciens passionnés dédiés à fournir des services automobiles de qualité à nos
                clients. Avec des années d'expérience, nous sommes fiers de notre expertise et de notre engagement envers la
                satisfaction du client.</p>
              <p className="section__description">Nous nous efforçons de maintenir des normes élevées en matière de réparation, d'entretien et de service à la
                clientèle. Laissez-nous prendre soin de votre véhicule et profitez de la tranquillité d'esprit sur la route.</p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Qualité
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Engagement
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Expertise
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Passion
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src="https://images.pexels.com/photos/1325710/pexels-photo-1325710.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="img-fluid w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
