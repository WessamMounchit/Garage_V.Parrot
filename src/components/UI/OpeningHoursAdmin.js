import React, { useEffect, useState } from 'react'
import fetchData from '../../utils/fetchData';
import { onGetopeningHours } from '../../api/openingHours';
import { Container } from 'react-bootstrap';
import CustomModal from './CustomModal';
import EditOpeningHours from '../EditOpeningHours';

const OpeningHoursAdmin = () => {
  const [openingHours, setOpeningHours] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);


  useEffect(() => {
    fetchData(setOpeningHours, onGetopeningHours);
  }, []);

  const handleUpdateOpeningHours = async () => {
    try {
      fetchData(setOpeningHours, onGetopeningHours);
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const daysOfWeekOrder = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  const sortedOpeningHours = openingHours.data
    ? openingHours.data.sort((a, b) => {
      return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
    })
    : [];


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
          {sortedOpeningHours.map((openingHour) => (
            <tr key={openingHour.day}>
              <th scope="row">{openingHour.day}</th>
              <td>{openingHour.morning_open}</td>
              <td>{openingHour.morning_close}</td>
              <td>{openingHour.afternoon_open}</td>
              <td>{openingHour.afternoon_close}</td>
              <td>
                {<i
                  className="btn ri-edit-box-fill edit__icon ri-lg p-0 "
                  onClick={() => {
                    setSelectedDay(openingHour.day);
                    setIsUpdateModalOpen(true);
                  }}>
                </i>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedDay(null); // Réinitialisez selectedDay lorsque la modal se ferme
        }}
        title={`Modifier les horaires pour ${selectedDay || ''}`}
      >
        <EditOpeningHours
          openingHours={sortedOpeningHours}
          onSubmit={handleUpdateOpeningHours}
          selectedDay={selectedDay}
        />
      </CustomModal>



    </Container>
  )
}

export default OpeningHoursAdmin