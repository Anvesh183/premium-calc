import React from "react";

const NewIndiaMediclaimResultsModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=800,width=800");
    const quoteContent = document.getElementById(
      "printable-quote-new-india"
    ).innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>New India Mediclaim Insurance Quote</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <style>
            body { font-family: 'Inter', sans-serif; }
            .print-table th, .print-table td { font-size: 0.8rem; padding: 0.3rem; }
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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const {
    memberWisePremiums,
    totalGrossPremium,
    familyDiscount,
    onlineDiscount,
    termDiscount,
    finalPremium,
    policyTerm,
    members,
  } = results;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <div id="printable-quote-new-india">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              New India Mediclaim Insurance Quote
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border">
            {/* Member-wise breakup */}
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Member-wise Premium Breakup
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm print-table">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Member</th>
                    <th className="p-2 text-right">Base</th>
                    <th className="p-2 text-right">No Prop. Ded.</th>
                    <th className="p-2 text-right">Maternity</th>
                    <th className="p-2 text-right">Cataract</th>
                    <th className="p-2 text-right">Consum.</th>
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

            {/* Overall calculation */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Total Premium (All Members):</p>
                <p className="font-semibold">
                  {formatCurrency(totalGrossPremium)}
                </p>
              </div>

              {familyDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <p>
                    Family Discount ({members.length === 2 ? "5%" : "7.5%"}):
                  </p>
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
                  <p>
                    Long Term Discount ({policyTerm === "2" ? "4%" : "7.5%"}):
                  </p>
                  <p>- {formatCurrency(termDiscount)}</p>
                </div>
              )}

              <div className="flex justify-between items-center font-bold border-t pt-3 mt-3">
                <p className="text-gray-800">Premium before GST:</p>
                <p className="text-xl">{formatCurrency(finalPremium)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">GST (0%):</p>
                <p className="font-semibold">{formatCurrency(0)}</p>
              </div>
              <div className="flex justify-between items-center border-t pt-3 mt-3">
                <p className="text-gray-800 font-bold text-xl">
                  Final Total Premium:
                </p>
                <p className="font-bold text-2xl text-blue-600">
                  {formatCurrency(finalPremium)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center flex justify-center gap-4 print:hidden">
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

export default NewIndiaMediclaimResultsModal;
