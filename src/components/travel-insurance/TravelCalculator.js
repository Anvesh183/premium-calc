import React, { useState, useEffect, useRef } from "react";
import { TRAVEL_PREMIUMS } from "../../data/travel-data";
import TravelResults from "./TravelResults";
import TravellerInput from "./TravellerInput";
import PlanComparisonResults from "./PlanComparisonResults";

const initialTravellerState = [{ id: 1, age: "6m-50", sumInsured: "25000" }];
const initialInputsState = {
  destination: "Worldwide including USA & Canada",
  duration: "",
  discount: "0",
};
const initialDatesState = { startDate: "", endDate: "" };

const TravelCalculator = () => {
  const [travellers, setTravellers] = useState(initialTravellerState);
  const [inputs, setInputs] = useState(initialInputsState);
  const [dates, setDates] = useState(initialDatesState);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [applyPlanToAll, setApplyPlanToAll] = useState(true);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  useEffect(() => {
    setResults(null);
  }, [inputs, travellers, dates]);

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      const start = new Date(dates.startDate);
      const end = new Date(dates.endDate);

      if (end < start) {
        setError("End date cannot be before the start date.");
        setInputs((prev) => ({ ...prev, duration: "" }));
        return;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (diffDays > 180) {
        setError("The maximum initial policy period is 180 days.");
        setInputs((prev) => ({ ...prev, duration: "" }));
      } else {
        setError("");
        setInputs((prev) => ({ ...prev, duration: diffDays.toString() }));
      }
    } else {
      setInputs((prev) => ({ ...prev, duration: "" }));
    }
  }, [dates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => ({ ...prev, [name]: value }));
  };

  const handleTravellerChange = (index, field, value) => {
    const newTravellers = [...travellers];
    newTravellers[index][field] = value;

    if (applyPlanToAll && index === 0 && field === "sumInsured") {
      for (let i = 1; i < newTravellers.length; i++) {
        newTravellers[i].sumInsured = value;
      }
    }
    setTravellers(newTravellers);
  };

  const addTraveller = () => {
    const firstTravellerSumInsured =
      travellers.length > 0 ? travellers[0].sumInsured : "25000";
    setTravellers([
      ...travellers,
      {
        id: Date.now(),
        age: "6m-50",
        sumInsured: applyPlanToAll ? firstTravellerSumInsured : "25000",
      },
    ]);
  };

  const removeTraveller = (index) => {
    const newTravellers = travellers.filter((_, i) => i !== index);
    setTravellers(newTravellers);
  };

  const handleReset = () => {
    setTravellers(initialTravellerState);
    setInputs(initialInputsState);
    setDates(initialDatesState);
    setResults(null);
    setError("");
    setApplyPlanToAll(true);
  };

  const handleCalculate = () => {
    if (error) return;

    const { destination, duration, discount } = inputs;
    const durationNum = parseInt(duration, 10);

    if (!durationNum || durationNum <= 0) {
      setError("Please select a valid start and end date.");
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
              isPlanDisabled={applyPlanToAll && index > 0}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <button
            onClick={addTraveller}
            className="text-sm font-semibold text-teal-500 hover:text-teal-600 mb-4 sm:mb-0"
          >
            + Add another traveller
          </button>
          {travellers.length > 1 && (
            <div className="flex items-center">
              <input
                id="apply-to-all"
                type="checkbox"
                checked={applyPlanToAll}
                onChange={(e) => setApplyPlanToAll(e.target.checked)}
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label
                htmlFor="apply-to-all"
                className="ml-2 block text-sm text-gray-900"
              >
                Apply same plan to all travellers
              </label>
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Trip Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
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
                Trip Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={dates.startDate}
                onChange={handleDateChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trip End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={dates.endDate}
                onChange={handleDateChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="self-end">
              <label className="block text-sm font-medium text-gray-700">
                Duration (days)
              </label>
              <input
                type="number"
                name="duration"
                value={inputs.duration}
                readOnly
                placeholder="-"
                className="mt-1 block w-full p-3 border bg-gray-100 rounded-md shadow-sm text-center font-semibold"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
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
            <div className="self-end flex gap-2">
              <button
                onClick={handleCalculate}
                disabled={!!error || !inputs.duration}
                className={`w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg transition ${
                  !!error || !inputs.duration
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-teal-600"
                }`}
              >
                Calculate
              </button>
              <button
                onClick={handleReset}
                className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Reset
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 md:col-span-4">{error}</p>
            )}
          </div>
        </div>
      </div>
      <div ref={resultsRef}>
        {results && (
          <>
            <TravelResults results={results} />
            <PlanComparisonResults
              results={results}
              travellers={travellers}
              inputs={inputs}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TravelCalculator;
