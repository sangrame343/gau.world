import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;
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

    // Save test data in localStorage
    const donation = {
      name: donorName,
      amount: amount,
      rotis: rotiCount,
      time: Date.now(),
    };

    const prevData = JSON.parse(localStorage.getItem("donations")) || [];
    localStorage.setItem("donations", JSON.stringify([donation, ...prevData]));

    // Show toast
    setShowToast(true);

    // Redirect or reset
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
        <p>
          <strong>Roti Count:</strong> {rotiCount} rotis
        </p>
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
