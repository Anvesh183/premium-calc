import React from "react";

const TravelResultsModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=800,width=800");
    const quoteContent = document.getElementById("printable-quote").innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Travel Insurance Quote</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <style>
            body { 
              font-family: 'Inter', sans-serif;
            }
          </style>
        </head>
        <body class="p-8">
          ${quoteContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Use a timeout to ensure all styles are loaded before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        {/* This is the area that will be printed */}
        <div id="printable-quote">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Quote<span className="text-blue-600">Assist</span>
            </h1>
            <p className="text-lg font-semibold text-gray-700">
              Overseas Travel Insurance Quote
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Traveller Premiums
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left font-semibold">Traveller</th>
                    <th className="p-2 text-left font-semibold">Sum Insured</th>
                    <th className="p-2 text-right font-semibold">
                      Base Premium
                    </th>
                    <th className="p-2 text-right font-semibold">
                      Age Loading
                    </th>
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

            <div className="mt-6 space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Sub-total Premium:</p>
                <p className="font-semibold text-lg">
                  {formatCurrency(results.totalBasePremium)}
                </p>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <p>Discount:</p>
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
                <p className="text-gray-600">GST:</p>
                <p className="font-semibold text-lg">
                  {formatCurrency(results.gstAmount)}
                </p>
              </div>
              <div className="flex justify-between items-center border-t pt-3 mt-3">
                <p className="text-gray-800 font-bold text-xl">
                  Final Total Premium:
                </p>
                <p className="font-bold text-2xl text-blue-600">
                  {formatCurrency(results.finalPremium)}
                </p>
              </div>
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
