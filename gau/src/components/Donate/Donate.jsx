import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donate.css";

const donations = [
  { title: "Dry Cake Seeds 30 kg", price: 650 },
  { title: "Jaggery 40 kg", price: 1600 },
  { title: "Barley Flour 100 kg", price: 2000 },
  { title: "Medicines for cows", price: 2100 },
  { title: "Wheat Bran 650 kg", price: 17000 },
  { title: "2 Trolley Green Grass", price: 21000 },
  { title: "Dried Green", price: 31000 },
  { title: "Feed 10 Cows", price: 1500 },
  { title: "Feed 20 Cows", price: 3000 },
  { title: "Feed 50 Cows", price: 7000 },
  { title: "1 Day Maintenance of Goshala", price: 51000 },
  { title: "Adopt 1 Cow for 1 Month", price: 3000 },
  { title: "Adopt 1 Cow for 3 Month", price: 9000 },
  { title: "Adopt 1 Cow for 1 Year", price: 36000 },
  { title: "Adopt 1 Cow for Its Lifetime", price: 360000 },
];

const Donate = () => {
  const [activeTab, setActiveTab] = useState("roti");
  const [amount, setAmount] = useState(5);
  const [custom, setCustom] = useState("");
  const navigate = useNavigate();

  const handleDonate = (
    selectedAmount,
    donationType = "roti",
    donationTitle = ""
  ) => {
    const finalAmount = selectedAmount || (custom ? parseInt(custom) : amount);
    navigate("/payment", {
      state: { amount: finalAmount, type: donationType, title: donationTitle },
    });
  };

  const getRotiCount = () => {
    const amt = custom ? parseInt(custom) : amount;
    return isNaN(amt) ? 0 : Math.floor(amt / 5);
  };

  return (
    <div className="donate-container">
      <div className="tab-buttons">
        <button
          className={activeTab === "roti" ? "active" : ""}
          onClick={() => setActiveTab("roti")}
        >
          Donate Roti
        </button>
        <button
          className={activeTab === "others" ? "active" : ""}
          onClick={() => setActiveTab("others")}
        >
          Other Donations
        </button>
      </div>

      {activeTab === "roti" && (
        <div className="roti-section">
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
          <p className="roti-count">
            🍽️ You are donating <strong>{getRotiCount()}</strong> rotis.
          </p>

          <button className="donate-next" onClick={() => handleDonate()}>
            Continue to Payment
          </button>
        </div>
      )}

      {activeTab === "others" && (
        <div className="other-donations">
          <h2 className="donate-title">Cow Service</h2>
          <p className="donate-info">
            According to the Skanda Purana, even showing respect to cows can
            help eradicate our sinful acts... Learn more
          </p>

          <div className="donation-cards">
            {donations.map((item, idx) => (
              <div className="donation-card" key={idx}>
                <h3>{item.title}</h3>
                <p>₹ {item.price.toLocaleString()}</p>

                <button
                  onClick={() => handleDonate(item.price, "others", item.title)}
                >
                  Donate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
