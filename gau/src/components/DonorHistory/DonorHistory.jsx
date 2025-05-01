import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { formatTimeAgo } from "../../utils/formatTime";
import "./DonorHistory.css";

const DonorHistory = () => {
  const [donors, setDonors] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const donorsPerPage = 5;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];
    setDonors(data);
  }, []);

  const getFilteredDonors = () => {
    let filtered = [...donors];
    if (filter === "top") {
      filtered.sort((a, b) => b.amount - a.amount);
    }
    if (searchTerm) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const exportToPDF = (donor) => {
    const input = document.getElementById("popup-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save(`donation-${donor.name}.pdf`);
    });
  };

  const paginatedDonors = () => {
    const filtered = getFilteredDonors();
    const indexOfLast = currentPage * donorsPerPage;
    const indexOfFirst = indexOfLast - donorsPerPage;
    return filtered.slice(indexOfFirst, indexOfLast);
  };

  const totalPages = Math.ceil(getFilteredDonors().length / donorsPerPage);

  return (
    <div className="donors-history-container">
      <h2>Donation History</h2>

      <div className="donors-controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("top")}>Top Donors 🔝</button>
      </div>

      {donors.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <div id="donors-history-export" className="donors-list">
          {paginatedDonors().map((donor, idx) => (
            <div
              key={idx}
              className="donors-card-history upgraded"
              onClick={() => setSelectedDonor(donor)}
            >
              <div className="avatar">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    donor.name
                  )}&background=random&rounded=true&size=50`}
                  alt={donor.name}
                />
              </div>
              <div className="donors-info">
                <p className="donors-name">
                  <strong>{donor.name}</strong>
                </p>
                <p className="donors-amount">
                  ₹{donor.amount} ({donor.rotis} rotis)
                </p>
                <p className="donors-time">{formatTimeAgo(donor.time)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {selectedDonor && (
        <div className="donors-popup" onClick={() => setSelectedDonor(null)}>
          <div
            id="popup-content"
            className="donors-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedDonor.name}'s Donation</h3>
            <p>
              <strong>Amount:</strong> ₹{selectedDonor.amount}
            </p>
            <p>
              <strong>Rotis:</strong> {selectedDonor.rotis}
            </p>
            <p>
              <strong>Time:</strong> {formatTimeAgo(selectedDonor.time)}
            </p>
            <button onClick={() => exportToPDF(selectedDonor)}>
              Export Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorHistory;
