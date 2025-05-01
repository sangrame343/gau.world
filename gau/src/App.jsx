import React, { useEffect, useState } from "react";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import LoginModal from "./components/LoginModal/LoginModal";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Donate from "./components/Donate/Donate";
import Contact from "./components/Contact/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Payment from "./components/Payment/Payment";
import DonorHistory from "./components/DonorHistory/DonorHistory";
const AppContent = ({ isAuthenticated, handleLogin }) => {
  const location = useLocation();

  // Show navbar only on non-home routes
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<DonorHistory />} />
      </Routes>
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <Router>
      {!isAuthenticated && showLogin && (
        <LoginModal
          onLogin={handleLogin}
          onShowRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {!isAuthenticated && showRegister && (
        <RegisterModal
          onRegister={handleLogin}
          onShowLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {isAuthenticated && (
        <AppContent
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
        />
      )}
    </Router>
  );
}

export default App;
