import React, { useEffect, useState } from "react";
import {
  isAuthenticated,
  setAuthenticatedUser,
  logoutUser,
} from "../src/utils/Auth"; // Import the function

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

const AppContent = ({ isAuthenticated, handleLogin, onLogout }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; // Show navbar only on non-home routes

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
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(
    isAuthenticated()
  );
  const [showLogin, setShowLogin] = useState(!isAuthenticatedState);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleLogin = () => {
    setIsAuthenticatedState(true);
    setShowLogin(false);
    setShowRegister(false);
    setAuthenticatedUser("user"); // Update this with actual user data if needed
  };

  const handleLogout = () => {
    setIsAuthenticatedState(false);
    setShowLogin(true);
    logoutUser();
  };
  return (
    <Router>
      {!isAuthenticatedState && showLogin && (
        <LoginModal
          onLogin={handleLogin}
          onShowRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {!isAuthenticatedState && showRegister && (
        <RegisterModal
          onRegister={handleLogin}
          onShowLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {isAuthenticatedState && (
        <AppContent
          isAuthenticated={isAuthenticatedState}
          handleLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}
    </Router>
  );
}

export default App;
