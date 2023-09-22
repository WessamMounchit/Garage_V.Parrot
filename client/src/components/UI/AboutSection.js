import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/About/about-section.css";
import aboutImg from '../../assets/about-img.jpeg'

const AboutSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6" className="">
            <div className="about__section-content d-flex align-items-center">
              <h2 className="section__title">Le Garage de Vincent Parrot</h2>
              <p className="section__description">Vincent Parrot, fort de ses 15 années d'expérience dans la réparation automobile, a ouvert son propre garage à Toulouse en 2021. Depuis 2 ans, il propose une large gamme de services : réparation de la carrosserie et de la mécanique des voitures ainsi que leur entretien régulier pour garantir leur performance et leur sécurité.</p>
              <p className="section__description">De plus, le Garage V. Parrot met en vente des véhicules d'occasion afin d'accroître son chiffre d'affaires.</p>

              <div className="d-flex gap-5">
                <div className="about__section-item">
                  <p className="about__description">
                    <i class="ri-checkbox-circle-line"></i> Qualité
                  </p>

                  <p className="about__description">
                    <i class="ri-checkbox-circle-line"></i> Engagement
                  </p>
                </div>

                <div className="about__section-item d-flex align-items-center">
                  <p className="about__description">
                    <i class="ri-checkbox-circle-line"></i> Expertise
                  </p>

                  <p className="about__description">
                    <i class="ri-checkbox-circle-line"></i> Passion
                  </p>
                </div>
              </div>

            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="img-fluid w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
