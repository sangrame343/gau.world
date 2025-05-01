import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatTime";
import "./Home.css";
import Lottie from "lottie-react";
import confettiAnim from "../../assets/confetti.json";
import DonorShowcase from "../DonorShowcase/DonorShowcase";

const colors = ["#f94144", "#f3722c", "#f8961e", "#90be6d", "#577590"];

const Home = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [activeConfettiIndex, setActiveConfettiIndex] = useState(null);

  useEffect(() => {
    const fetchDonors = () => {
      const stored = localStorage.getItem("donations");
      if (stored) {
        const parsed = JSON.parse(stored).map((donor) => ({
          ...donor,
          time: Number(donor.time), // ensure it's a number
        }));

        setDonors(parsed);
      }
    };

    fetchDonors();
  }, []);

  const playSound = () => {
    const audio = new Audio("../../assets/pop.mp3");
    audio.play();
  };

  const handleCardAppear = (index) => {
    setActiveConfettiIndex(index);
    playSound();

    // Reset after animation
    setTimeout(() => {
      setActiveConfettiIndex(null);
    }, 1500);
  };

  return (
    <div className="home-container">
      <div className="video-background">
        {/* <iframe
          src="https://www.youtube.com/embed/_6U0_7z2XZ4?autoplay=1&mute=1&loop=1&playlist=_6U0_7z2XZ4&controls=0&modestbranding=1"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Background Video"
        ></iframe> */}
      </div>

      <div className="overlay">
        <h1>Welcome to Gau World</h1>
        <button className="donate-btn" onClick={() => navigate("/donate")}>
          Donate Roti
        </button>
        <DonorShowcase />
        <div className="confetti-donor-wrapper">
          {donors.map((donor, index) => (
            <div
              key={index}
              className="confetti-donor-card"
              style={{
                left: `${10 + index * 15}%`,
                backgroundColor: colors[index % colors.length],
                animationDelay: `${index * 2}s`,
              }}
              onAnimationStart={() => handleCardAppear(index)}
            >
              {activeConfettiIndex === index && (
                <Lottie
                  animationData={confettiAnim}
                  className="confetti-lottie"
                  autoplay
                  loop={false}
                />
              )}
              <p className="donor-name">{donor.name}</p>
              <p className="donor-amount">₹{donor.amount}</p>
              <p className="donor-time">{formatTimeAgo(donor.time)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
