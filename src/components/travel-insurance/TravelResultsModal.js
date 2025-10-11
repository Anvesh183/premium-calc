import React from "react";

const TravelResultsModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=800,width=600");
    printWindow.document.write(
      "<html><head><title>Travel Insurance Quote</title>"
    );
    printWindow.document.write(
      "<style>body { font-family: sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; } .total { font-weight: bold; } </style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h1>Overseas Travel Insurance Quote</h1>");
    printWindow.document.write(
      document.getElementById("printable-quote").innerHTML
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div id="printable-quote">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Premium Quote Summary
          </h2>
          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            Traveller Premiums
          </h3>
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Traveller</th>
                <th className="p-2">Sum Insured</th>
                <th className="p-2">Base Premium</th>
                <th className="p-2">Age Loading</th>
                <th className="p-2">Total</th>
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
                  <td className="p-2">
                    {formatCurrency(traveller.basePremium)}
                  </td>
                  <td className="p-2">
                    {formatCurrency(traveller.ageLoading)} (
                    {traveller.ageLoadingPercentage}%)
                  </td>
                  <td className="p-2 font-semibold">
                    {formatCurrency(traveller.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <p>Sub-total Premium:</p>
              <p className="font-semibold">
                {formatCurrency(results.totalBasePremium)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-green-600">Discount:</p>
              <p className="font-semibold text-green-600">
                - {formatCurrency(results.discountAmount)}
              </p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Premium Before GST:</p>
              <p>{formatCurrency(results.premiumAfterDiscount)}</p>
            </div>
            <div className="flex justify-between">
              <p>GST (18%):</p>
              <p className="font-semibold">
                {formatCurrency(results.gstAmount)}
              </p>
            </div>
            <div className="flex justify-between text-2xl font-bold text-blue-600 border-t pt-2 mt-2">
              <p>Final Total Premium:</p>
              <p>{formatCurrency(results.finalPremium)}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center flex justify-center gap-4">
          <button
            onClick={handlePrint}
            className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition"
          >
            Print / Save as PDF
          </button>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelResultsModal;
