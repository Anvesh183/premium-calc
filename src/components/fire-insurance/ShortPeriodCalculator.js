import React, { useState } from "react";

const ShortPeriodCalculator = () => {
  const [annualPremium, setAnnualPremium] = useState("");
  const [policyPeriod, setPolicyPeriod] = useState("0.10");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    if (annualPremium > 0) {
      const shortPeriodPremium = annualPremium * parseFloat(policyPeriod);
      const gstRate = 0.18;
      const gstAmount = shortPeriodPremium * gstRate;
      const totalPremiumWithGST = shortPeriodPremium + gstAmount;

      const resultHTML = `
         <div class="space-y-2 text-center">
             <p class="text-lg">
                 ₹${parseFloat(annualPremium).toLocaleString("en-IN")} x ${
        parseFloat(policyPeriod) * 100
      }% = 
                 <span class="font-bold text-blue-600">₹${shortPeriodPremium.toLocaleString(
                   "en-IN",
                   { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                 )}</span>
                 <span class="text-sm">(before GST)</span>
             </p>
             <div class="border-t pt-2 mt-2">
                 <p class="text-lg">
                     + GST (18%): <span class="font-semibold text-green-700">₹${gstAmount.toLocaleString(
                       "en-IN",
                       { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                     )}</span>
                 </p>
                 <p class="text-xl font-bold text-gray-800">
                     Total Payable: <span class="text-green-800">₹${totalPremiumWithGST.toLocaleString(
                       "en-IN",
                       { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                     )}</span>
                 </p>
             </div>
         </div>
     `;
      setResult(resultHTML);
    } else {
      setResult(
        `<p class="text-center font-semibold text-red-600">Please enter a valid Annual Premium.</p>`
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-1">
        3. Short Period Rate Calculator
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        For policies with a term of less than 12 months.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label
            htmlFor="annualPremium"
            className="block text-sm font-medium text-gray-700"
          >
            Annual Premium (₹)
          </label>
          <input
            type="number"
            id="annualPremium"
            placeholder="e.g., 5000"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={annualPremium}
            onChange={(e) => setAnnualPremium(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="policyPeriod"
            className="block text-sm font-medium text-gray-700"
          >
            Policy Period
          </label>
          <select
            id="policyPeriod"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={policyPeriod}
            onChange={(e) => setPolicyPeriod(e.target.value)}
          >
            <option value="0.10">Up to 15 days</option>
            <option value="0.15">Up to 1 month</option>
            <option value="0.30">Up to 2 months</option>
            <option value="0.40">Up to 3 months</option>
            <option value="0.50">Up to 4 months</option>
            <option value="0.60">Up to 5 months</option>
            <option value="0.70">Up to 6 months</option>
            <option value="0.75">Up to 7 months</option>
            <option value="0.80">Up to 8 months</option>
            <option value="0.85">Up to 9 months</option>
            <option value="1.00">Exceeding 9 months</option>
          </select>
        </div>
        <div>
          <button
            id="calculateShortPeriodBtn"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            onClick={handleCalculate}
          >
            Calculate Short Period Premium
          </button>
        </div>
      </div>
      {result && (
        <div
          id="shortPeriodResult"
          className="mt-6 p-4 bg-gray-50 rounded-lg"
          dangerouslySetInnerHTML={{ __html: result }}
        ></div>
      )}
    </div>
  );
};

export default ShortPeriodCalculator;
