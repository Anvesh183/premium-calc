import React, { useState } from "react";
import GipsaResultsModal from "./GipsaResultsModal";

const GipsaResults = ({ results }) => {
  const { rows, monthlySubsidized, monthlyGrand } = results;
  const annualGrand = monthlyGrand * 12;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inr = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(n);

  return (
    <>
      <section className="card results" aria-label="Results">
        <h2>Results</h2>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Person</th>
                <th>Base Premium</th>
                <th>Employer Share</th>
                <th>Employee Share</th>
                <th>GST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="6" className="muted">
                    Select members and click <b>Calculate</b>.
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={index}>
                    {row.isError ? (
                      <td colSpan="6" style={{ color: "#b91c1c" }}>
                        {row.label}
                      </td>
                    ) : (
                      <>
                        <td data-label="Person">{row.label}</td>
                        <td data-label="Base Premium">{row.base}</td>
                        <td data-label="Employer Share">{row.employerShare}</td>
                        <td data-label="Employee Share">{row.employeeShare}</td>
                        <td data-label="GST">{row.gst}</td>
                        <td data-label="Total">
                          <b>{row.total}</b>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="results-summary">
          <div className="summary-box">
            Monthly (Employee share for subsidized members):{" "}
            <strong>{inr(monthlySubsidized)}</strong>
          </div>
          <div className="summary-box">
            Monthly (Total incl. GST): <strong>{inr(monthlyGrand)}</strong>
          </div>
          <div className="summary-box">
            Annual Total (Total incl. GST): <strong>{inr(annualGrand)}</strong>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition"
          >
            Download Quote
          </button>
        </div>
      </section>
      {isModalOpen && (
        <GipsaResultsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          results={results}
        />
      )}
    </>
  );
};

export default GipsaResults;
