import React from "react";

import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-black fw-bold mb-3">Bienvenue</h4>
            <h1 className="text-black mb-4">Au garage Vincent Parrot</h1>

            <button className="btn reserve__btn">
              <Link to="/cars">Contactez-nous</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-black fw-bold  mb-3">Bienvenue</h4>
            <h1 className="text-black mb-4">Au garage Vincent Parrot</h1>

            <button className="btn reserve__btn">
              <Link to="/cars">Contactez-nous</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-black fw-bold mb-3">Bienvenue</h4>
            <h1 className="text-black mb-4">Au garage Vincent Parrot</h1>

            <button className="btn reserve__btn">
              <Link to="/cars">Contactez-nous</Link>
            </button>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
