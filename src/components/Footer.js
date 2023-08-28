import React, { useEffect, useState } from "react";

import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { onGetopeningHours } from "../api/openingHours";
import EditOpeningHours from "./EditOpeningHours";

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

  const [openingHours, setOpeningHours] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const role = secureLocalStorage.getItem('role')



  const compareDaysOfWeek = (day1, day2) => {
    const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    return daysOfWeek.indexOf(day1) - daysOfWeek.indexOf(day2);
  };

  useEffect(() => {
    setOpeningHours({ ...openingHours, loading: true });
    onGetopeningHours()
      .then((response) => {
        const sortedOpeningHours = response.data.sort((a, b) => compareDaysOfWeek(a.day, b.day));
        setOpeningHours({ loading: false, error: false, data: sortedOpeningHours });
      })
      .catch((error) => {
        setOpeningHours({ loading: false, error: true, data: undefined });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshOpeningHours = () => {
    setOpeningHours({ ...openingHours, loading: true });
    onGetopeningHours()
      .then((response) => {
        const sortedOpeningHours = response.data.sort((a, b) => compareDaysOfWeek(a.day, b.day));
        setOpeningHours({ loading: false, error: false, data: sortedOpeningHours });
      })
      .catch((error) => {
        setOpeningHours({ loading: false, error: true, data: undefined });
      });
  }


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


  const handleUpdateOpeningHours = async () => {
    try {
      refreshOpeningHours()
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  let content;
  if (openingHours.loading) content = <img src="spinner.svg" alt='chargement' />
  else if (openingHours.error) content = <p>Une erreur est survenue...</p>
  else if (openingHours.data?.length === 0) content = <p>Aucune voiture disponible</p>
  else if (openingHours.data?.length > 0) {
    content = openingHours.data.map(formatOpeningHours)
  }

  const editIcon = isAuth && role === 'admin' && (
    <i
      className="btn ri-edit-box-line ri-lg mx-2"
      onClick={() => setIsUpdateModalOpen(true)}>
    </i>
  )


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
                  <span>{editIcon}</span>
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



      <Modal show={isUpdateModalOpen} onHide={() => setIsUpdateModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les horaires d'ouverture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditOpeningHours openingHours={openingHours.data} onSubmit={handleUpdateOpeningHours} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="m-2" onClick={() => setIsUpdateModalOpen(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Footer;
