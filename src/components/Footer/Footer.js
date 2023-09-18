import React, { useEffect } from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../../redux/slices/hoursSlice";

const quickLinks = [

  {
    path: "/",
    display: "Acceuil",
  },
  {
    path: "/cars",
    display: "Nos voitures",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/about",
    display: "About",
  }
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const openingHours = useSelector((state => state.hours))
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchHours())
  }, [dispatch]);

  const daysOfWeekOrder = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  const sortedOpeningHours = openingHours.data
    ? [...openingHours.data].sort((a, b) => {
      return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
    })
    : [];

  const formatOpeningHours = (openingHour) => {
    const {
      day,
      morning_open,
      morning_close,
      afternoon_open,
      afternoon_close,
    } = openingHour;

    const isMorningOnly = morning_open && morning_close && !afternoon_open && !afternoon_close;
    const isAfternoonOnly = !morning_open && !morning_close && afternoon_open && afternoon_close;
    const isFullDay = morning_open && afternoon_close && !morning_close && !afternoon_open;
    const isFullDayWithBreak = morning_open && morning_close && afternoon_open && afternoon_close;
    const isClosed = !morning_open && !afternoon_close && !morning_close && !afternoon_open;

    return (
      <div key={day}>
        <p>
          {day}:
          {isFullDayWithBreak && (
            <span> {morning_open} - {morning_close}, {afternoon_open} - {afternoon_close}</span>
          )}
          {isFullDay && <span> {morning_open} - {afternoon_close}</span>}
          {isMorningOnly && <span> {morning_open} - {morning_close}</span>}
          {isAfternoonOnly && <span> {afternoon_open} - {afternoon_close}</span>}
          {isClosed && <span> Fermé</span>}
        </p>
      </div>
    );
  };


  let content;
  if (openingHours.loading) {
    content = <img src="spinner.svg" alt='chargement' />
  }
  else if (openingHours.error) {
    content = <p>Une erreur est survenue...</p>
  }
  else if (openingHours.data?.length > 0) {
    content = sortedOpeningHours?.map(formatOpeningHours)
  }


  return (
    <>
      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4" md="5" sm="12">
              <div className="logo footer__logo">
                <h1>
                  <Link to="/" className=" d-flex align-items-center gap-2 text-decoration-none ">
                    <span>
                      Garage <br /> Vincent Parrot
                    </span>
                  </Link>
                </h1>
              </div>
              <p className="footer__logo-content">
                Découvrez le Garage Vincent Parrot
                et plongez dans l'univers automobile
                exceptionnel du Garage Vincent Parrot.
                Avec une passion pour les véhicules qui
                traverse les générations, nous sommes là
                pour vous offrir des services de réparation,
                d'entretien et de personnalisation
                de la plus haute qualité.
              </p>
            </Col>


            <Col lg="5" md="4" sm="6" className="d-flex justify-content-lg-center">
              <div className="mb-4">
                <div className="hours__title">
                  <h5 className="footer__link-title mb-4">Horraires d'ouverture</h5>
                </div>
                <p className="office__info">{content}</p>
              </div>
            </Col>

            <Col lg="3" md="2" sm="6" className="d-flex justify-content-lg-center">
              <div className="mb-4 footer_link-container">
                <h5 className="footer__link-title">Navigation rapide</h5>
                <ListGroup>

                  {quickLinks.map((item, index) => (
                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))}
                  {isAuth && (
                    <ListGroupItem key="gestion" className="p-0 mt-3 quick__link">
                      <Link to="/dashboard">Gestion</Link>
                    </ListGroupItem>
                  )}

                </ListGroup>
              </div>
            </Col>

            <Col lg="12">
              <div className="footer__bottom">
                <p className="section__description copyright">
                  <i class="ri-copyright-line"></i>
                  Site codé par Wessam Mounchit Copyright {year}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
