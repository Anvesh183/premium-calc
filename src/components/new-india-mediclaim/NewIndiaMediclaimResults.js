import React, { useState } from "react";
import NewIndiaMediclaimResultsModal from "./NewIndiaMediclaimResultsModal";

const NewIndiaMediclaimResults = ({ results }) => {
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

  const {
    totalGrossPremium,
    familyDiscount,
    onlineDiscount,
    termDiscount,
    finalPremium,
    policyTerm,
    members,
    memberWisePremiums,
  } = results;

  return (
    <>
      <div className="card mt-8">
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
                  <th className="p-2 text-right">No Prop. Ded.</th>
                  <th className="p-2 text-right">Maternity</th>
                  <th className="p-2 text-right">Cataract</th>
                  <th className="p-2 text-right">Consumables</th>
                  <th className="p-2 text-right">Co-Pay Disc.</th>
                  <th className="p-2 text-right font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {memberWisePremiums.map((member, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">Member {index + 1}</td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.basePremium)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover1Premium)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover2Premium)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover3Premium)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(member.optionalCover5Premium)}
                    </td>
                    <td className="p-2 text-right text-red-600">
                      - {formatCurrency(member.coPayDiscount)}
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
            <p>{formatCurrency(totalGrossPremium)}</p>
          </div>

          <div className="border-t pt-3 mt-3">
            {familyDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Family Discount ({members.length === 2 ? "5%" : "7.5%"})</p>
                <p>- {formatCurrency(familyDiscount)}</p>
              </div>
            )}
            {onlineDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Online Purchase Discount (10%):</p>
                <p>- {formatCurrency(onlineDiscount)}</p>
              </div>
            )}
            {termDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Long Term Discount ({policyTerm === "2" ? "4%" : "7.5%"})</p>
                <p>- {formatCurrency(termDiscount)}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between font-bold border-t pt-3 mt-3">
            <p>Premium before GST:</p>
            <p className="text-xl">{formatCurrency(finalPremium)}</p>
          </div>
          <div className="flex justify-between">
            <p>GST (0%):</p>
            <p className="font-semibold">{formatCurrency(0)}</p>
          </div>
          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <p className="text-gray-800 font-bold text-xl">
              Final Total Premium:
            </p>
            <p className="font-bold text-2xl text-teal-600">
              {formatCurrency(finalPremium)}
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
        <NewIndiaMediclaimResultsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          results={results}
        />
      )}
    </>
  );
};

export default NewIndiaMediclaimResults;
