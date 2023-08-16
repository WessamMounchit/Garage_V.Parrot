import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { onGetopeningHours } from '../api/openingHours';
import EditOpeningHours from './EditOpeningHours';
import secureLocalStorage from 'react-secure-storage';
import { useSelector } from 'react-redux';

function Footer() {

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
    setOpeningHours({...openingHours, loading: true});
    onGetopeningHours()
      .then((response) => {
        const sortedOpeningHours = response.data.sort((a, b) => compareDaysOfWeek(a.day, b.day));
        setOpeningHours({loading: false, error: false, data: sortedOpeningHours});
      })
      .catch((error) => {
        setOpeningHours({loading: false, error: true, data: undefined});
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshOpeningHours = () =>{
    setOpeningHours({...openingHours, loading: true});
    onGetopeningHours()
      .then((response) => {
        const sortedOpeningHours = response.data.sort((a, b) => compareDaysOfWeek(a.day, b.day));
        setOpeningHours({loading: false, error: false, data: sortedOpeningHours});
      })
      .catch((error) => {
        setOpeningHours({loading: false, error: true, data: undefined});
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
      refreshOpeningHours()
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  let content;
  if(openingHours.loading) content = <img src="spinner.svg" alt='chargement' />
  else if(openingHours.error) content = <p>Une erreur est survenue...</p>
  else if(openingHours.data?.length === 0) content = <p>Aucune voiture disponible</p>
  else if(openingHours.data?.length > 0) {
    content = openingHours.data.map(formatOpeningHours)}


  return (
    <>
      <footer className="py-4 bg-dark text-white text-center">
        <div className="container">
          <p>Tous droits réservés &copy; 2023 Garage Viencent Parrot</p>
          <div>
            {isAuth && role === 'admin' && (
            <Button variant="warning" className="m-2" onClick={() => setIsUpdateModalOpen(true)}>
              Modifier les horraires
              </Button>
            )}
            <h3>Horaires d'ouverture :</h3>
            {content}
          </div>
        </div>
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
}

export default Footer;
