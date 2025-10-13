import React from "react";

const ResultsModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "", "height=600,width=800");

    // Write the HTML and CSS for the print document
    printWindow.document.write(
      "<html><head><title>Premium Calculation</title>"
    );
    printWindow.document.write(`
      <style>
        body { 
          font-family: 'Inter', sans-serif; 
          font-size: 14pt; 
          padding: 20px;
        }
        .printable-area {
          width: 100%;
        }
        .printable-area > div {
          border: 1px solid #ccc;
          padding: 1em;
          margin-bottom: 1em;
        }
        .flex {
          display: flex;
        }
        .justify-between {
          justify-content: space-between;
        }
        .items-baseline {
          align-items: baseline;
        }
        .font-semibold {
          font-weight: 600;
        }
        .font-bold {
          font-weight: 700;
        }
        .text-lg {
          font-size: 1.125rem;
        }
        .text-xl {
          font-size: 1.25rem;
        }
        .text-blue-600 { color: #2563eb; }
        .text-blue-700 { color: #1d4ed8; }
        .text-blue-800 { color: #1e40af; }
        .text-green-700 { color: #047857; }
        .text-green-800 { color: #065f46; }
        .border-t { border-top: 1px solid #e5e7eb; }
        .border-b { border-bottom: 1px solid #e5e7eb; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .my-3 { margin-top: 0.75rem; margin-bottom: 0.75rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .pl-2 { padding-left: 0.5rem; }
        .space-y-1 > * + * { margin-top: 0.25rem; }
        .pt-1 { padding-top: 0.25rem; }
        .mt-1 { margin-top: 0.25rem; }
      </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write('<div class="printable-area">');
    printWindow.document.write(content);
    printWindow.document.write("</div>");
    printWindow.document.write("</body></html>");

    printWindow.document.close(); // Important!
    printWindow.focus(); // Necessary for some browsers

    // Trigger the print dialog and close the window after
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 modal-overlay">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 modal-content">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Premium Calculation Result
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <div
          className="space-y-3 text-gray-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-6 text-center flex justify-center gap-4">
          <button
            onClick={handlePrint}
            className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
