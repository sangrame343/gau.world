import React, { useEffect } from "react";
import "../../Modal.css";
import cowImage from "../../assets/gau.jpg";
import gaulogo from "../../assets/gau_logo.png"; // Adjust the path to your image

const LoginModal = ({ onLogin, onShowRegister, onClose }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
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
          <h2>Login</h2>
          <input type="text" placeholder="Phone number" />
          <input type="password" placeholder="OTP or Password" />
          <button onClick={onLogin}>Login</button>
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
