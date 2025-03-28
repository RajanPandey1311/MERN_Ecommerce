import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import arrow_icon from "../Assets/arrow.png";
import hand_icon from "../Assets/hand_icon.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <Link to="/new-collections" className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </Link>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" style={{height:'100%'}} />
      </div>
    </div>
  );
};

export default Hero;
