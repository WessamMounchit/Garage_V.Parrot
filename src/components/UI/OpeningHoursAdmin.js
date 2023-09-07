import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import CustomModal from './CustomModal';
import EditOpeningHours from '../EditOpeningHours';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHours } from '../../redux/slices/hoursSlice';

const OpeningHoursAdmin = () => {

  //////////  STATE   //////////

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const openingHours = useSelector((state => state.hours))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHours())
  }, [dispatch]);

  //////////  FORMAT HOURS   //////////


  const daysOfWeekOrder = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  const sortedOpeningHours = openingHours.data
    ? [...openingHours.data].sort((a, b) => {
      return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
    })
    : [];

  //////////  CONTENT   //////////


  let content;
  if (openingHours.loading) {
    content = <img src="spinner.svg" alt='chargement' />
  }
  else if (openingHours.error) {
    content = <p>Une erreur est survenue...</p>
  }
  else if (openingHours.data?.length > 0) {
    content = sortedOpeningHours.map((openingHour) => (
      <tr key={openingHour.day}>
        <th scope="row">{openingHour.day ? openingHour.day : "Fermé"}</th>
        <td data-label="Matin ouverture">{openingHour.morning_open ? openingHour.morning_open : "Fermé"}</td>
        <td data-label="Matin fermeture">{openingHour.morning_close ? openingHour.morning_close : "Fermé"}</td>
        <td data-label="Après-midi ouverture">{openingHour.afternoon_open ? openingHour.afternoon_open : "Fermé"}</td>
        <td data-label="Après-midi fermeture">{openingHour.afternoon_close ? openingHour.afternoon_close : "Fermé"}</td>
        <td data-label="Modifier">
          {<i
            className="btn ri-edit-box-line edit__icon ri-lg p-0 "
            onClick={() => {
              setSelectedDay(openingHour.day);
              setIsUpdateModalOpen(true);
            }}>
          </i>}
        </td>
      </tr>
    ))
  }


  return (
    <Container>
      <table className="table styled-table">
        <thead>
          <tr>
            <th scope="col">Jour</th>
            <th scope="col">Matin ouverture</th>
            <th scope="col">Matin fermeture</th>
            <th scope="col">Après-midi ouverture</th>
            <th scope="col">Après-midi fermeture</th>
            <th scope="col">Modifier</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedDay(null);
        }}
        title={`Modifier les horaires pour ${selectedDay || ''}`}
      >
        <EditOpeningHours
          openingHours={sortedOpeningHours}
          modalClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedDay(null);
          }}
          selectedDay={selectedDay}
        />
      </CustomModal>



    </Container>
  )
}

export default OpeningHoursAdmin