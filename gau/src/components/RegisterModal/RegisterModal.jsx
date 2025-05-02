import React, { useEffect, useState } from "react";
import "../../Modal.css";
import cowImage from "../../assets/gau.jpg";
import gaulogo from "../../assets/gau_logo.png";
import {
  registerUser,
  setAuthenticatedUser,
  loginUser,
} from "../../utils/Auth"; // Make sure path is correct

const RegisterModal = ({ onRegister, onShowLogin, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleRegister = () => {
    if (!name || !phone || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const isDuplicate = loginUser(phone); // Checks if phone already registered
    if (isDuplicate) {
      alert("This phone number is already registered.");
      return;
    }

    // Save user and mark as logged in
    registerUser({ name, phone, password });
    setAuthenticatedUser(phone);
    onRegister(); // Notify App to hide modal and update login state
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
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account?{" "}
            <span onClick={onShowLogin} className="link">
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
