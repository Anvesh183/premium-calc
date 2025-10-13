import React, { useState } from "react";
import TravelResultsModal from "./TravelResultsModal";

const TravelResults = ({ results }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Premium Calculation Results
        </h2>

        <h3 className="text-lg font-semibold text-gray-700">
          Traveller Premiums
        </h3>
        <div className="overflow-x-auto mt-2 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Traveller</th>
                <th className="p-2 text-left">Sum Insured</th>
                <th className="p-2 text-right">Base Premium</th>
                <th className="p-2 text-right">Age Loading</th>
                <th className="p-2 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {results.travellerPremiums.map((traveller, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    Traveller {index + 1} ({traveller.age})
                  </td>
                  <td className="p-2">
                    ${parseInt(traveller.sumInsured).toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency(traveller.basePremium)}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency(traveller.ageLoading)} (
                    {traveller.ageLoadingPercentage}%)
                  </td>
                  <td className="p-2 text-right font-semibold">
                    {formatCurrency(traveller.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Sub-total Premium:</p>
            <p className="font-semibold text-lg">
              {formatCurrency(results.totalBasePremium)}
            </p>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <p>Discount ({results.discount}%):</p>
            <p className="font-semibold text-lg">
              - {formatCurrency(results.discountAmount)}
            </p>
          </div>
          <div className="flex justify-between items-center font-bold border-t pt-3 mt-3">
            <p className="text-gray-800">Premium before GST:</p>
            <p className="text-xl">
              {formatCurrency(results.premiumAfterDiscount)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">GST ({results.gstPercentage}%):</p>
            <p className="font-semibold text-lg">
              {formatCurrency(results.gstAmount)}
            </p>
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
        <TravelResultsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          results={results}
        />
      )}
    </>
  );
};

export default TravelResults;
