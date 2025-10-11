import React, { useState } from "react";
import { TRAVEL_EXTENSION_PREMIUMS } from "../../data/travel-extension-data";

const ExtensionCalculator = () => {
  const [inputs, setInputs] = useState({
    destination: "Worldwide including USA & Canada",
    age: "6m-50",
    sumInsured: "25000",
    extensionDays: "30",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setResult(null);
    setError("");
  };

  const handleCalculate = () => {
    const { destination, age, sumInsured, extensionDays } = inputs;

    if (age === "71-75" || age === "76-90") {
      setError(
        "Policy extension for ages 71 and above requires special approval. Please contact the office."
      );
      setResult(null);
      return;
    }

    // --- Start of Exact Premium Lookup ---
    const extensionPremium =
      TRAVEL_EXTENSION_PREMIUMS[destination]?.[sumInsured]?.[age]?.[
        extensionDays
      ];
    // --- End of Exact Premium Lookup ---

    if (extensionPremium === undefined) {
      setError(
        "Could not find a premium for the selected combination. Please check the inputs."
      );
      setResult(null);
      return;
    }

    const gst = extensionPremium * 0.18;
    const finalPremium = extensionPremium + gst;

    setResult({
      extensionPremium: extensionPremium.toFixed(2),
      gst: gst.toFixed(2),
      finalPremium: finalPremium.toFixed(2),
    });
    setError("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Policy Extension Calculator
      </h2>
      <p className="text-gray-500 mb-6">
        Calculate the premium for extending your existing policy (for ages up to
        70).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destination Area
          </label>
          <select
            name="destination"
            value={inputs.destination}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option>Worldwide including USA & Canada</option>
            <option>Worldwide excluding USA & Canada</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sum Insured (USD)
          </label>
          <select
            name="sumInsured"
            value={inputs.sumInsured}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="25000">$25,000</option>
            <option value="50000">$50,000</option>
            <option value="100000">$100,000</option>
            <option value="250000">$250,000</option>
            <option value="500000">$500,000</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Age Band
          </label>
          <select
            name="age"
            value={inputs.age}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="6m-50">6 months - 50 years</option>
            <option value="51-60">51 - 60 years</option>
            <option value="61-70">61 - 70 years</option>
            <option value="71-75">
              71 - 75 years (Not applicable for extension)
            </option>
            <option value="76-90">
              76 - 90 years (Not applicable for extension)
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Extension Period
          </label>
          <select
            name="extensionDays"
            value={inputs.extensionDays}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="30">Up to 30 Days</option>
            <option value="60">Up to 60 Days</option>
            <option value="90">Up to 90 Days</option>
            <option value="120">Up to 120 Days</option>
            <option value="150">Up to 150 Days</option>
            <option value="180">Up to 180 Days</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCalculate}
          className="w-full md:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition"
        >
          Calculate Extension Premium
        </button>
      </div>

      {error && (
        <p className="mt-4 text-center font-semibold text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Extension Premium Result
          </h3>
          <div className="space-y-2 mt-4 text-gray-700">
            <div className="flex justify-between">
              <p>Extension Premium (before GST):</p>
              <p className="font-semibold text-gray-900">
                ₹{result.extensionPremium}
              </p>
            </div>
            <div className="flex justify-between">
              <p>GST (18%):</p>
              <p className="font-semibold text-gray-900">₹{result.gst}</p>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2 border-t pt-2">
              <p>Total Payable:</p>
              <p className="text-green-700">₹{result.finalPremium}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtensionCalculator;
