import React, { useState, useRef, useEffect } from "react";
import { useMotorInputs } from "../../../hooks/useMotorInputs";
import {
  calculateOneYearPremium,
  calculateLongTermPremium,
} from "../../../utils/motorCalculations";
import PrivateCarResults from "./PrivateCarResults";
import PolicyTypeSelector from "./PolicyTypeSelector";
import VehicleDetailsSection from "./VehicleDetailsSection";
import AddonSections from "./AddonSections";

const PrivateCarInputs = () => {
  const { inputs, setInputs, handleInputChange, setPolicyType, handleReset } =
    useMotorInputs();
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  useEffect(() => {
    setResults(null);
    if (inputs.policyDuration === "3") {
      const { longTermPackage } = inputs;
      setInputs((prev) => ({
        ...prev,
        nilDep:
          longTermPackage === "basic" ||
          longTermPackage === "pro" ||
          longTermPackage === "elite"
            ? prev.cc === "above1500"
              ? "above1500"
              : "upto1500"
            : "none",
        engineProtect: longTermPackage === "pro" || longTermPackage === "elite",
        rti: longTermPackage === "elite" ? "standard" : "none",
      }));
    }
  }, [inputs, setInputs]);

  const handleCalculate = () => {
    const calculatedResults =
      inputs.policyDuration === "3"
        ? calculateLongTermPremium(inputs)
        : calculateOneYearPremium(inputs);

    if (calculatedResults) {
      setResults(calculatedResults);
    }
  };

  return (
    <>
      <div className="card">
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Select Policy Duration
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setInputs((p) => ({ ...p, policyDuration: "1" }))}
              className={`btn ${
                inputs.policyDuration === "1" ? "primary" : ""
              }`}
            >
              1 Year (Standard)
            </button>
            <button
              onClick={() => setInputs((p) => ({ ...p, policyDuration: "3" }))}
              className={`btn ${
                inputs.policyDuration === "3" ? "primary" : ""
              }`}
            >
              3 Years (New Car)
            </button>
          </div>
          {inputs.policyDuration === "3" && (
            <p className="text-xs text-amber-700 mt-2 p-2 bg-amber-100 rounded-md">
              <strong>Note:</strong> Long-term policies are available for brand
              new vehicles only.
            </p>
          )}
        </div>

        {inputs.policyDuration === "1" ? (
          <PolicyTypeSelector
            policyType={inputs.policyType}
            setPolicyType={setPolicyType}
          />
        ) : (
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Select Long-Term Package
            </label>
            <select
              name="longTermPackage"
              value={inputs.longTermPackage}
              onChange={handleInputChange}
              className="mt-1 block w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="basic">Protect Basic (OD + Nil Dep)</option>
              <option value="pro">Protect Pro (Basic + Engine Protect)</option>
              <option value="elite">Protect Elite (Pro + RTI)</option>
            </select>
          </div>
        )}

        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Select Fuel Type
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                setInputs((p) => ({ ...p, fuelType: "petrol_diesel" }))
              }
              className={`btn ${
                inputs.fuelType === "petrol_diesel" ? "primary" : ""
              }`}
            >
              Petrol / Diesel / CNG
            </button>
            <button
              onClick={() => setInputs((p) => ({ ...p, fuelType: "electric" }))}
              className={`btn ${
                inputs.fuelType === "electric" ? "primary" : ""
              }`}
            >
              Electric
            </button>
          </div>
        </div>

        <VehicleDetailsSection
          inputs={inputs}
          handleInputChange={handleInputChange}
          setInputs={setInputs}
        />

        {inputs.policyType !== "liability" && (
          <AddonSections
            inputs={inputs}
            handleInputChange={handleInputChange}
          />
        )}

        {inputs.policyType !== "od" && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Liability & PA Covers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  id="paOwnerDriver"
                  name="paOwnerDriver"
                  type="checkbox"
                  checked={inputs.paOwnerDriver}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="paOwnerDriver"
                  className="ml-2 text-sm text-gray-700"
                >
                  PA Cover for Owner-Driver
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="llToPaidDriver"
                  name="llToPaidDriver"
                  type="checkbox"
                  checked={inputs.llToPaidDriver}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="llToPaidDriver"
                  className="ml-2 text-sm text-gray-700"
                >
                  LL to Paid Driver
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t flex justify-end gap-4">
          <button
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={handleReset}
          >
            Reset
          </button>
          <button className="btn primary" onClick={handleCalculate}>
            Calculate Premium
          </button>
        </div>
      </div>
      <div ref={resultsRef}>
        {results && (
          <PrivateCarResults
            results={results}
            policyType={inputs.policyType}
            duration={inputs.policyDuration}
          />
        )}
      </div>
    </>
  );
};

export default PrivateCarInputs;
