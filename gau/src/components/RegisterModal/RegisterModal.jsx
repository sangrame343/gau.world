import React, { useEffect } from "react";
import "../../Modal.css";
import cowImage from "../../assets/gau.jpg";
import gaulogo from "../../assets/gau_logo.png";
const RegisterModal = ({ onRegister, onShowLogin, onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

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
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Phone number" />
          <input type="password" placeholder="Password" />
          <button onClick={onRegister}>Register</button>
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
