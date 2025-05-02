import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount = 0, type = "roti", title = "" } = location.state || {};

  const [donorName, setDonorName] = useState("");
  const [showToast, setShowToast] = useState(false);

  const rotiCount = Math.floor(amount / 5);

  const handlePayment = () => {
    if (amount < 5) {
      alert("Minimum donation is ₹5");
      return;
    }

    if (!donorName.trim()) {
      alert("Please enter your name");
      return;
    }

    const donation = {
      name: donorName,
      amount,
      type,
      time: Date.now(),
    };

    if (type === "roti") {
      donation.rotis = rotiCount;
    } else {
      donation.title = title;
    }

    const prevData = JSON.parse(localStorage.getItem("donations")) || [];
    localStorage.setItem("donations", JSON.stringify([donation, ...prevData]));

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 2500);
  };

  return (
    <div className="payment-container">
      <h2>Confirm Your Donation</h2>

      <div className="summary-box">
        <p>
          <strong>Donation Amount:</strong> ₹{amount}
        </p>

        {type === "roti" ? (
          <p>
            <strong>Roti Count:</strong> {rotiCount} rotis
          </p>
        ) : (
          <p>
            <strong>Purpose:</strong> {title}
          </p>
        )}

        <input
          type="text"
          placeholder="Your Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Pay Now
      </button>

      {showToast && (
        <div className="toast">
          🎉 Thank you {donorName}! Your donation of ₹{amount} has been
          recorded.
        </div>
      )}
    </div>
  );
};

export default Payment;
