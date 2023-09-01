import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { onUpdateOpeningHours } from '../api/openingHours';

const EditOpeningHours = ({ openingHours, onSubmit, selectedDay }) => {
  const [openingHoursData, setOpeningHoursData] = useState([...openingHours]);
  const [modifiedIndices, setModifiedIndices] = useState([]);
  const openingHoursOfDay = openingHoursData.filter((item) => item.day === selectedDay);

  const markAsModified = (day) => {
    const index = openingHoursData.findIndex((item) => item.day === day);
    if (index !== -1) {
      if (!modifiedIndices.includes(index)) {
        setModifiedIndices((prevModifiedIndices) => [...prevModifiedIndices, index]);
      }
    }
  };

  const handleChange = (event, day, period) => {
    const { value } = event.target;
    setOpeningHoursData((prevOpeningHours) =>
      prevOpeningHours.map((item) =>
        item.day === day ? { ...item, [period]: value } : item
      )
    );
    markAsModified(day);
  };

  const handleSetClosed = (day) => {
    setOpeningHoursData((prevOpeningHours) =>
      prevOpeningHours.map((item) =>
        item.day === day
          ? {
            ...item,
            morning_open: null,
            morning_close: null,
            afternoon_open: null,
            afternoon_close: null,
          }
          : item
      )
    );
    markAsModified(day);
  };

  const handleCloseAfternoonOnly = (day) => {
    setOpeningHoursData((prevOpeningHours) =>
      prevOpeningHours.map((item) =>
        item.day === day
          ? {
            ...item,
            afternoon_open: null,
            afternoon_close: null,
          }
          : item
      )
    );
    markAsModified(day);
  };

  const handleCloseMorningOnly = (day) => {
    setOpeningHoursData((prevOpeningHours) =>
      prevOpeningHours.map((item) =>
        item.day === day
          ? {
            ...item,
            morning_open: null,
            morning_close: null,
          }
          : item
      )
    );
    markAsModified(day);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const modifiedOpeningHours = modifiedIndices.map((index) => openingHoursData[index]);

    if (modifiedOpeningHours.length > 0) {
      try {
        const response = await onUpdateOpeningHours(modifiedOpeningHours);
        toast.success(response.data.info);
        onSubmit();
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } else {
      toast.info("No changes were made to opening hours.");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {openingHoursOfDay.map((item) => (
          <div key={item.day} className="mb-3">
            <h4>{item.day}</h4>
            <Form.Group controlId={`morning_open_${item.day}`}>
              <Form.Label>Matin (ouverture) :</Form.Label>
              <Form.Control
                type="time"
                value={item.morning_open || ''}
                onChange={(e) => handleChange(e, item.day, 'morning_open')}
                className="form-control"
                placeholder="Entrez l'heure d'ouverture du matin"
              />
            </Form.Group>
            <Form.Group controlId={`morning_close_${item.day}`}>
              <Form.Label>Matin (fermeture) :</Form.Label>
              <Form.Control
                type="time"
                value={item.morning_close || ''}
                onChange={(e) => handleChange(e, item.day, 'morning_close')}
                className="form-control"
                placeholder="Entrez l'heure de fermeture du matin"
              />
            </Form.Group>
            <Form.Group controlId={`afternoon_open_${item.day}`}>
              <Form.Label>Après-midi (ouverture) :</Form.Label>
              <Form.Control
                type="time"
                value={item.afternoon_open || ''}
                onChange={(e) => handleChange(e, item.day, 'afternoon_open')}
                className="form-control"
                placeholder="Entrez l'heure d'ouverture de l'après-midi"
              />
            </Form.Group>
            <Form.Group controlId={`afternoon_close_${item.day}`}>
              <Form.Label>Après-midi (fermeture) :</Form.Label>
              <Form.Control
                type="time"
                value={item.afternoon_close || ''}
                onChange={(e) => handleChange(e, item.day, 'afternoon_close')}
                className="form-control"
                placeholder="Entrez l'heure de fermeture de l'après-midi"
              />
            </Form.Group>


            <Button variant="danger" onClick={() => handleSetClosed(item.day)}>
              Fermer toute la journée
            </Button>
            <Button variant="warning" onClick={() => handleCloseMorningOnly(item.day)}>
              Fermer le matin
            </Button>
            <Button variant="danger" onClick={() => handleCloseAfternoonOnly(item.day)}>
              Fermer l'après-midi
            </Button>
          </div>
        ))}
        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
      </Form>
    </div>
  );
};

export default EditOpeningHours;
