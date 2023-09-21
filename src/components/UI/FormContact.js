import React, { useRef, useState } from "react";
import "../../styles/form-contact.css";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';

const FormContact = ({ carName }) => {
  const [subject, setSubject] = useState(carName ? `Je souhaite plus d'information sur la ${carName}` : "")

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();


  const submitHandler = (event) => {
    event.preventDefault();

    setSubject(carName ? `Je souhaite plus d'information sur la ${carName}` : "")
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");

    emailjs.sendForm('service_bgs1zg8', 'template_ttxeezk', form.current, '0W1S_PNWBHWf7hS_R')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    toast.success("Votre message a bien été envoyé");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col lg="7" md="7">
          <h6 className="fw-bold mb-4">Formulaire de contact</h6>

          <Form ref={form} onSubmit={submitHandler}>
            <FormGroup className="contact__form">
              <Form.Control
                placeholder="Sujet"
                type="text"
                value={subject}
                name="subject"
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="contact__form">
              <Form.Control
                placeholder="Nom"
                type="text"
                name="last_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="contact__form">
              <Form.Control
                placeholder="Prénom"
                type="text"
                value={lastName}
                name="first_name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="contact__form">
              <Form.Control
                placeholder="Email"
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="contact__form">
              <textarea
                rows="5"
                placeholder="Message"
                className="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                required
              ></textarea>
            </FormGroup>

            <button className="custom__btn contact__btn w-25 mt-2" type="submit">
              Envoyer
            </button>
          </Form>
        </Col>

        <Col lg="5" md="5" className="contact__container">
          <div className="contact__info">
            <h6 className="fw-bold">Information de contact</h6>

            <div className=" d-flex align-items-center gap-2">
              <h6 className="label__contact">Adresse:</h6>
              <p className="section__description contact__text mb-0">
                123 Rue de Vincent, Paris, France
              </p>
            </div>

            <div className=" d-flex align-items-center gap-2">
              <h6 className="label__contact">Telephone:</h6>
              <p className="section__description contact__text mb-0">+88683896366</p>
            </div>

            <div className=" d-flex align-items-center gap-2">
              <h6 className="label__contact">Email:</h6>
              <p className="section__description contact__text mb-0">example@gmail.com</p>
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
