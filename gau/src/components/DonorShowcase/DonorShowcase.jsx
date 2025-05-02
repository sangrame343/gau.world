import React, { useEffect, useState } from "react";
import "./DonorShowcase.css";

const DonorShowcase = () => {
  const [recentDonors, setRecentDonors] = useState([]);
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    const sortedTop = [...donations]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    const recent = donations.slice(0, 3);

    setTopDonors(sortedTop);
    setRecentDonors(recent);
  }, []);

  return (
    <div className="donor-showcase">
      <h2 className="section-title">🌟 Top Donors</h2>
      <div className="card-container">
        {topDonors.map((donor, idx) => (
          <div className="donor-cards" key={idx}>
            <h3>{donor.name}</h3>
            <p>₹{donor.amount}</p>
            <span>
              {" "}
              {donor.title ? `(${donor.title})` : `(${donor.rotis} rotis)`}
            </span>
          </div>
        ))}
      </div>

      {/*  <h2 className="section-title">🕒 Recent Donors</h2>
      <div className="card-container">
        {recentDonors.map((donor, idx) => (
          <div className="donor-cards recent" key={idx}>
            <h3>{donor.name}</h3>
            <p>₹{donor.amount}</p>
            <small>{donor.time}</small>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default DonorShowcase;
