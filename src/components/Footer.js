import React, { useEffect } from "react";

import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../redux/slices/hoursSlice";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "#",
    display: "Privacy Policy",
  },

  {
    path: "/cars",
    display: "Car Listing",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const openingHours = useSelector((state => state.hours))
  const dispatch = useDispatch()

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
            <Col lg="4" md="4" sm="12">
              <div className="logo footer__logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2 text-decoration-none ">
                    <i class="ri-car-line"></i>
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


            <Col lg="4" md="4" sm="6" className="d-flex justify-content-lg-center">
              <div className="mb-4">
                <div className="hours__title">
                  <h5 className="footer__link-title mb-4">Horraires d'ouverture</h5>
                </div>
                <p className="office__info">{content}</p>
              </div>
            </Col>

            <Col lg="4" md="4" sm="6" className="d-flex justify-content-lg-center">
              <div className="mb-4">
                <h5 className="footer__link-title">Quick Links</h5>
                <ListGroup>
                  {quickLinks.map((item, index) => (
                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </Col>

            <Col lg="12">
              <div className="footer__bottom">
                <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                  <i class="ri-copyright-line"></i>
                  Copyright {year}
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
