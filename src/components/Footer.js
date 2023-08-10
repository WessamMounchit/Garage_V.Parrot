import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { onGetopeningHours } from '../api/openingHours';
import EditOpeningHours from './EditOpeningHours';

function Footer() {

  const [openingHours, setOpeningHours] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const compareDaysOfWeek = (day1, day2) => {
    const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    return daysOfWeek.indexOf(day1) - daysOfWeek.indexOf(day2);
  };

useEffect(() => {
    onGetopeningHours()
      .then((response) => {
        const sortedOpeningHours = response.data.sort((a, b) => compareDaysOfWeek(a.day, b.day));
        setOpeningHours(sortedOpeningHours);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          ) }
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
      onGetopeningHours()
      .then((response) => {
        const sortedOpeningHours = response.data.sort((a, b) => compareDaysOfWeek(a.day, b.day));
        setOpeningHours(sortedOpeningHours);
      })
      .catch((error) => {
        console.error(error);
      });
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <footer className="py-4 bg-dark text-white text-center">
        <div className="container">
          <p>Tous droits réservés &copy; 2023 Garage Viencent Parrot</p>
          <div>
            <Button variant="warning" className="m-2" onClick={() => setIsUpdateModalOpen(true)}>Modifier les horraires</Button>
            <h3>Horaires d'ouverture :</h3>
            {openingHours.map(formatOpeningHours)}
          </div>
        </div>
      </footer>

      <Modal show={isUpdateModalOpen} onHide={() => setIsUpdateModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les horaires d'ouverture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditOpeningHours openingHours={openingHours} onSubmit={handleUpdateOpeningHours} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="m-2" onClick={() => setIsUpdateModalOpen(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Footer;
