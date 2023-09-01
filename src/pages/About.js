import React from 'react'
import Helmet from '../components/Helmet'
import CommonSection from '../components/UI/CommonSection'
import AboutSection from '../components/UI/AboutSection'
import { Col, Container, Row } from 'react-bootstrap'
import '../styles/about-page.css'
import firstImg from "../assets/service5.jpeg";
import secondImg from "../assets/service7.jpeg";


const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="À propos" />
      <AboutSection />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={firstImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12" className='d-flex align-items-center'>
              <div className="about__page-content">
                <h2 className="section__title">
                  La Confiance Avant Tout
                </h2>

                <p className="section__description">
                Au Garage V. Parrot, nous plaçons la confiance au cœur de notre métier. Chaque voiture qui entre dans notre atelier est traitée avec le plus grand soin. Nos techniciens hautement qualifiés s'engagent à fournir des services de réparation et d'entretien de la plus haute qualité.
                </p>

                <p className="section__description">
                Nous comprenons à quel point votre véhicule est précieux, c'est pourquoi nous le traitons comme le nôtre.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      <section className="about__page-section">
        <Container>
          <Row>

            <Col lg="6" md="6" sm="12" className='d-flex align-items-center'>
              <div className="about__page-content">
                <h2 className="section__title">
                Votre Partenaire Automobile
                </h2>

                <p className="section__description">
                Vincent Parrot considère son atelier comme un véritable partenaire de confiance pour ses clients. Il sait que chaque voiture mérite une attention particulière,
                </p>

                <p className="section__description">
                c'est pourquoi il met tout en œuvre pour fournir un service personnalisé et une expertise inégalée. Chez Garage V. Parrot, votre voiture est entre de bonnes mains.
                </p>
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={secondImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>

  )
}

export default About