import React, { useEffect, useState } from "react";
import "../../Modal.css";
import cowImage from "../../assets/gau.jpg";
import gaulogo from "../../assets/gau_logo.png";
import { loginUser, setAuthenticatedUser } from "../../utils/Auth";

const LoginModal = ({ onLogin, onShowRegister, onClose }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleLogin = () => {
    if (!phone || !password) {
      alert("Please enter both phone number and password.");
      return;
    }

    const success = loginUser(phone, password);
    if (success) {
      setAuthenticatedUser(phone);
      onLogin(); // Notify App that login is successful
    } else {
      alert("Invalid phone number or password.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal two-column-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="modal-left">
          <img src={cowImage} alt="Cow" />
        </div>

        <div className="modal-right">
          <div className="modal-logo">
            <img src={gaulogo} alt="GAU Logo" />
          </div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p>
            Don’t have an account?{" "}
            <span onClick={onShowRegister} className="link">
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
