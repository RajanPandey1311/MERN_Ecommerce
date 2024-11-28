import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo.png";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  const handleBackToStore = () => {
    window.location.href = "https://rajan-ecommerce.vercel.app/";
  };

  return (
    <div className="navbar">
              <div className="nav-logo">
          <img src={navlogo} alt="logo" />
          <p className="company-name">WANDERWISH</p>
        </div>
      <div className="navbar-buttons">
        <button className="back-to-store-btn" onClick={handleBackToStore}>
          Back to Store
        </button>
        <img src={navProfile} className="nav-profile" alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
