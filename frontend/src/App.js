import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import NewCollections from "./Components/NewCollections/NewCollections";

import { useEffect, useState } from "react";
function App() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${serverUrl}/allproducts`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(() => setLoading(false));
  }, [serverUrl]);
  return (
    <div className="App">
      <BrowserRouter>
      {loading && (
          <>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                color: "#fff",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  border: "8px solid #f3f3f3",
                  borderRadius: "50%",
                  borderTop: "8px solid #3498db",
                  width: "60px",
                  height: "60px",
                  animation: "spin 2s linear infinite",
                  marginBottom: "20px",
                }}
              ></div>
              <div>Sorry for the inconvenience, Loading...</div>
            </div>
          </>
        )}
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />

          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route exact path="/new-collections" element={<NewCollections />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
