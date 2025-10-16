import React from "react";

const GipsaResultsModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=800,width=800");
    const quoteContent = document.getElementById(
      "printable-quote-gipsa"
    ).innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>GIPSA GMC Insurance Quote</title>
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

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const inr = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(n);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <div id="printable-quote-gipsa">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              GIPSA GMC Insurance Quote
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Premium Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left font-semibold">Person</th>
                    <th className="p-2 text-right font-semibold">
                      Base Premium
                    </th>
                    <th className="p-2 text-right font-semibold">
                      Employer Share
                    </th>
                    <th className="p-2 text-right font-semibold">
                      Employee Share
                    </th>
                    <th className="p-2 text-right font-semibold">GST</th>
                    <th className="p-2 text-right font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {results.rows.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{row.label}</td>
                      <td className="p-2 text-right">{row.base}</td>
                      <td className="p-2 text-right">{row.employerShare}</td>
                      <td className="p-2 text-right">{row.employeeShare}</td>
                      <td className="p-2 text-right">{row.gst}</td>
                      <td className="p-2 text-right font-semibold">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Monthly (Employee share for subsidized members):
                </p>
                <p className="font-semibold text-lg">
                  {inr(results.monthlySubsidized)}
                </p>
              </div>
              <div className="flex justify-between items-center font-bold">
                <p>Monthly Total (incl. GST):</p>
                <p className="text-xl">{inr(results.monthlyGrand)}</p>
              </div>
              <div className="flex justify-between items-center text-lg font-bold mt-2 border-t pt-2">
                <p>Annual Total (incl. GST):</p>
                <p className="text-teal-700 text-xl">
                  {inr(results.monthlyGrand * 12)}
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

export default GipsaResultsModal;
