import React, { useState } from "react";
import "../../styles/form-contact.css";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormContact = ({ carName }) => {
  const [subject, setsubject] = useState(carName ? `Je souhaite plus d'information sur la ${carName}` : "")
  
  const socialLinks = [
    {
      url: "#",
      icon: "ri-facebook-line",
    },
    {
      url: "#",
      icon: "ri-instagram-line",
    },
    {
      url: "#",
      icon: "ri-linkedin-line",
    },
    {
      url: "#",
      icon: "ri-twitter-line",
    },
  ];
  

  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Container className="my-4">
    <Row>
      <Col lg="7" md="7">
        <h6 className="fw-bold mb-4">Formulaire de contact</h6>

        <Form onSubmit={submitHandler}>
          <FormGroup className="contact__form">
            <Form.Control placeholder="Sujet" type="text" value={subject} onChange={(e) => setsubject(e.target.value)} />
          </FormGroup>
          <FormGroup className="contact__form">
            <Form.Control placeholder="Nom" type="text" />
          </FormGroup>
          <FormGroup className="contact__form">
            <Form.Control placeholder="Prénom" type="text" />
          </FormGroup>
          <FormGroup className="contact__form">
            <Form.Control placeholder="Email" type="email" />
          </FormGroup>
          <FormGroup className="contact__form">
            <textarea
              rows="5"
              placeholder="Message"
              className="textarea"
            ></textarea>
          </FormGroup>

          <button className=" contact__btn" type="submit">
            Envoyer
          </button>
        </Form>
      </Col>

      <Col lg="5" md="5" className="d-flex justify-content-center align-items-center">
        <div className="contact__info">
          <h6 className="fw-bold">Information de contact</h6>

          <div className=" d-flex align-items-center gap-2">
          <h6 className="fs-6 mb-0">Adresse:</h6>
          <p className="section__description mb-0">
            123 Rue de Vincent, Paris, France
          </p>
          </div>

          <div className=" d-flex align-items-center gap-2">
            <h6 className="fs-6 mb-0">Telephone:</h6>
            <p className="section__description mb-0">+88683896366</p>
          </div>

          <div className=" d-flex align-items-center gap-2">
            <h6 className="mb-0 fs-6">Email:</h6>
            <p className="section__description mb-0">example@gmail.com</p>
          </div>

          <h6 className="fw-bold mt-4">Follow Us</h6>

          <div className=" d-flex align-items-center gap-4 mt-3">
            {socialLinks.map((item, index) => (
              <Link
                to={item.url}
                key={index}
                className="social__link-icon"
              >
                <i class={item.icon}></i>
              </Link>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);
};

export default FormContact;
