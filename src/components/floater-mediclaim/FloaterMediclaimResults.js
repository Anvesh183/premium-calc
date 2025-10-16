import React, { useState } from "react";
import FloaterMediclaimResultsModal from "./FloaterMediclaimResultsModal";

const FloaterMediclaimResults = ({ results }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  if (!results || !results.memberWisePremiums) {
    return null;
  }

  return (
    <>
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Premium Calculation Results
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Member-wise Premium Breakup
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Member</th>
                  <th className="p-2 text-right">Base Premium</th>
                  <th className="p-2 text-right">Opt. Cover I</th>
                  <th className="p-2 text-right">Opt. Cover II</th>
                  <th className="p-2 text-right">Opt. Cover III</th>
                  <th className="p-2 text-right">Opt. Cover IV</th>
                  <th className="p-2 text-right font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {results.memberWisePremiums.map((member, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">Member {index + 1}</td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.basePremium)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover1Premium || 0)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover2Premium || 0)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover3Premium || 0)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover4Premium || 0)}
                    </td>
                    <td className="p-2 text-right font-semibold">
                      {formatCurrency(member.totalPremium)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between font-bold">
            <p>Total Premium (All Members):</p>
            <p>
              {formatCurrency(
                results.memberWisePremiums.reduce(
                  (acc, member) => acc + member.totalPremium,
                  0
                )
              )}
            </p>
          </div>

          <div className="border-t pt-3 mt-3">
            {results.medicalLoading > 0 && (
              <div className="flex justify-between text-red-600">
                <p>Medical Loading ({results.medicalLoading}%):</p>
                <p>+ {formatCurrency(results.medicalLoading)}</p>
              </div>
            )}

            {results.memberDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>
                  Member Discount ({results.memberDiscountRate}% for{" "}
                  {results.totalMembers} members):
                </p>
                <p>- {formatCurrency(results.memberDiscount)}</p>
              </div>
            )}
            {results.onlineDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Online Purchase Discount (10%):</p>
                <p>- {formatCurrency(results.onlineDiscount)}</p>
              </div>
            )}
            {results.termDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>
                  Long Term Discount ({results.policyTerm === "2" ? "5%" : "7%"}{" "}
                  for {results.policyTerm} years):
                </p>
                <p>- {formatCurrency(results.termDiscount)}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between font-bold border-t pt-3 mt-3">
            <p>Premium before GST:</p>
            <p className="text-xl">
              {formatCurrency(results.premiumBeforeGst)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>GST (0%):</p>
            <p className="font-semibold">{formatCurrency(results.gstAmount)}</p>
          </div>
          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <p className="text-gray-800 font-bold text-xl">
              Final Total Premium:
            </p>
            <p className="font-bold text-2xl text-teal-600">
              {formatCurrency(results.finalPremium)}
            </p>
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
      </div>
      {isModalOpen && (
        <FloaterMediclaimResultsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          results={results}
        />
      )}
    </>
  );
};

export default FloaterMediclaimResults;
