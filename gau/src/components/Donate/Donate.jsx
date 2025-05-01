import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donate.css";

const Donate = () => {
  const [amount, setAmount] = useState(5);
  const [custom, setCustom] = useState("");
  const navigate = useNavigate();

  const handleDonate = () => {
    const finalAmount = custom ? parseInt(custom) : amount;
    navigate("/payment", { state: { amount: finalAmount } });
  };

  return (
    <div className="donate-container">
      <h2 className="donate-title">
        Choose Amount <span>(₹5 per Roti)</span>
      </h2>

      <div className="donate-options">
        {[5, 10, 15].map((val) => (
          <button
            key={val}
            className={amount === val && !custom ? "active" : ""}
            onClick={() => {
              setAmount(val);
              setCustom("");
            }}
          >
            ₹{val}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder="Custom Amount (₹)"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
      />

      <button className="donate-next" onClick={handleDonate}>
        Continue to Payment
      </button>
    </div>
  );
};

export default Donate;
