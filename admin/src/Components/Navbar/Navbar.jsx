import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  const handleBackToStore = () => {
    window.location.href = "https://rajan-ecommerce.vercel.app/";
  };

  return (
    <div className="navbar">
      <img src={navlogo} className="nav-logo" alt="Logo" />
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
