import React from "react";
import "../../styles/hero-slider.css";
import heroImage from "../../assets/Lamborghini.png";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  return (
    <section className="p-0 hero__slider-section">
      <div className="hero">
        <div className="hero__left">
          <h1 className="hero__title">
            Plongez dans un univers automobile exceptionnel !
          </h1>

          <p className="hero__subtitle">
            Nous sommes là pour vous offrir des services de réparation,
            d'entretien et de personnalisation de la plus haute qualité.
          </p>
          <Link to="/cars" className="text-decoration-none">
            <button className="custom__btn">Découvrez nos voitures</button>
          </Link>
        </div>
        <div className="hero__image-container">
          <div className="hero__image">
            <img src={heroImage} alt="hero" className="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
