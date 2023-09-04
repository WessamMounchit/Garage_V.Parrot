import React from "react";
import "../../styles/hero-slider.css";
import heroImage from '../../assets/hero.png'

const HeroSlider = () => {
  return (
    <div className="hero">
      <div className="hero__left">
        <h1 className="hero__title">
          Find, book, rent a car—quick and super easy!
        </h1>

        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process.
        </p>
        <button className="custom__btn">Contactez-nous</button>

      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <img src={heroImage} alt="hero" fill className="" />
        </div>

      </div>
    </div>
  );
};

export default HeroSlider;
