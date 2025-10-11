import React, { useState, useEffect } from "react";
import { TRAVEL_PREMIUMS } from "../../data/travel-data";
import TravelResults from "./TravelResults";
import TravellerInput from "./TravellerInput";

const TravelCalculator = () => {
  const [travellers, setTravellers] = useState([
    { id: 1, age: "6m-50", sumInsured: "25000" },
  ]);
  const [inputs, setInputs] = useState({
    destination: "Worldwide including USA & Canada",
    duration: "7",
    discount: "0",
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  // This effect clears the main results when inputs change
  useEffect(() => {
    setResults(null);
  }, [inputs, travellers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // --- Start of Real-time Validation ---
    if (name === "duration") {
      const durationNum = parseInt(value, 10);
      if (durationNum > 180) {
        setError("The maximum initial policy period is 180 days.");
      } else if (value && durationNum <= 0) {
        setError("Please enter a valid trip duration.");
      } else {
        setError(""); // Clear error if the new value is valid
      }
    }
    // --- End of Real-time Validation ---

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleTravellerChange = (index, field, value) => {
    const newTravellers = [...travellers];
    newTravellers[index][field] = value;
    setTravellers(newTravellers);
  };

  const addTraveller = () => {
    setTravellers([
      ...travellers,
      { id: Date.now(), age: "6m-50", sumInsured: "25000" },
    ]);
  };

  const removeTraveller = (index) => {
    const newTravellers = travellers.filter((_, i) => i !== index);
    setTravellers(newTravellers);
  };

  const handleCalculate = () => {
    // Final check before calculation, even with real-time validation
    if (error) return;

    const { destination, duration, discount } = inputs;
    const durationNum = parseInt(duration, 10);

    if (!durationNum || durationNum <= 0) {
      setError("Please enter a valid trip duration.");
      return;
    }

    let totalBasePremium = 0;
    const travellerPremiums = [];

    for (const traveller of travellers) {
      let premiumAgeBand = traveller.age;
      if (traveller.age === "71-75" || traveller.age === "76-90") {
        premiumAgeBand = "61-70";
      }

      const premiumData = TRAVEL_PREMIUMS[destination]?.[
        traveller.sumInsured
      ]?.[premiumAgeBand]?.find((p) => p.days >= durationNum);

      if (!premiumData) {
        setError(
          `Could not find a premium for Traveller with age ${traveller.age} and Sum Insured $${traveller.sumInsured}.`
        );
        return;
      }

      let basePremium = premiumData.premium;
      let ageLoading = 0;
      let ageLoadingPercentage = 0;

      if (traveller.age === "71-75") {
        ageLoadingPercentage = 50;
        ageLoading = basePremium * 0.5;
      } else if (traveller.age === "76-90") {
        ageLoadingPercentage = 100;
        ageLoading = basePremium * 1.0;
      }

      const totalForTraveller = basePremium + ageLoading;
      totalBasePremium += totalForTraveller;
      travellerPremiums.push({
        ...traveller,
        basePremium,
        ageLoading,
        ageLoadingPercentage,
        total: totalForTraveller,
      });
    }

    const discountAmount = totalBasePremium * (parseFloat(discount) / 100);
    const premiumAfterDiscount = totalBasePremium - discountAmount;
    const gstAmount = premiumAfterDiscount * 0.18;
    const finalPremium = premiumAfterDiscount + gstAmount;

    setResults({
      totalBasePremium,
      travellerPremiums,
      discountAmount,
      premiumAfterDiscount,
      gstAmount,
      finalPremium,
    });
    setError("");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Traveller Details
        </h3>
        <div className="space-y-4 mb-6">
          {travellers.map((traveller, index) => (
            <TravellerInput
              key={traveller.id}
              index={index}
              traveller={traveller}
              onTravellerChange={handleTravellerChange}
              onRemoveTraveller={removeTraveller}
            />
          ))}
        </div>
        <button
          onClick={addTraveller}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 mb-6"
        >
          + Add another traveller
        </button>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Trip Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Destination
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
                Trip Duration (days)
              </label>
              <input
                type="number"
                name="duration"
                value={inputs.duration}
                onChange={handleInputChange}
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discount (%)
              </label>
              <select
                name="discount"
                value={inputs.discount}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="0">No Discount</option>
                <option value="10">Digital Discount (10%)</option>
                <option value="5">Web Aggregator (5%)</option>
                <option value="10">Loyalty Discount (10%)</option>
                <option value="33.33">Staff Discount (33.33%)</option>
              </select>
            </div>
            <div className="self-end md:col-start-3">
              <button
                onClick={handleCalculate}
                disabled={!!error}
                className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition ${
                  error ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
              >
                Calculate Premium
              </button>
            </div>
          </div>
        </div>
      </div>
      {results && <TravelResults results={results} />}
    </>
  );
};

export default TravelCalculator;
