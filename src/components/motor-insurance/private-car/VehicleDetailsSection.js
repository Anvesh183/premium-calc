import React from "react";

const VehicleDetailsSection = ({ inputs, handleInputChange, setInputs }) => {
  const handleDateChange = (e) => {
    let value = e.target.value;
    const { name } = e.target;
    const prevValue = inputs[name] || "";

    if (value.length < prevValue.length) {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
        vehicleAge: calculateVehicleAge(
          name === "purchaseDate" ? value : inputs.purchaseDate,
          name === "renewalDate" ? value : inputs.renewalDate
        ).ageBracket,
      }));
      return;
    }

    let numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length >= 2) {
      numericValue = numericValue.slice(0, 2) + "/" + numericValue.slice(2);
    }
    if (numericValue.length >= 5) {
      numericValue = numericValue.slice(0, 5) + "/" + numericValue.slice(5, 9);
    }

    const formattedValue = numericValue.slice(0, 10);

    const { years, ageBracket, isValid } = calculateVehicleAge(
      name === "purchaseDate" ? formattedValue : inputs.purchaseDate,
      name === "renewalDate" ? formattedValue : inputs.renewalDate
    );

    if (formattedValue.length === 10 && !isValid) {
      alert("Invalid date. Please enter a date in dd/mm/yyyy format.");
      return;
    }

    if (years > 50) {
      alert("Purchase date cannot be more than 50 years in the past.");
      setInputs((prev) => ({ ...prev, purchaseDate: "", vehicleAge: "0-5" }));
      return;
    }

    setInputs((prev) => ({
      ...prev,
      [name]: formattedValue,
      vehicleAge: ageBracket,
    }));
  };

  const calculateVehicleAge = (dateString, renewalDateString) => {
    const parseDate = (str) => {
      if (!str || str.length !== 10) return null;
      const parts = str.split("/");
      if (parts.length !== 3) return null;
      const [day, month, year] = parts.map(Number);
      if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year) ||
        year < 1900 ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      ) {
        return null;
      }
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return null;
      }
      return date;
    };

    const purchaseDate = parseDate(dateString);
    const renewalDate = parseDate(renewalDateString) || new Date();

    if (!purchaseDate) {
      return { years: null, ageBracket: "0-5", isValid: false };
    }

    let age = renewalDate.getFullYear() - purchaseDate.getFullYear();
    const m = renewalDate.getMonth() - purchaseDate.getMonth();
    if (m < 0 || (m === 0 && renewalDate.getDate() < purchaseDate.getDate())) {
      age--;
    }

    let ageBracket = "0-5";
    if (age >= 10) ageBracket = ">10";
    else if (age >= 5) ageBracket = "5-10";

    return { years: age, ageBracket, isValid: true };
  };

  const vehicleAgeYears = calculateVehicleAge(
    inputs.purchaseDate,
    inputs.renewalDate
  ).years;

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">
        Vehicle & Policy Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {inputs.fuelType === "petrol_diesel" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cubic Capacity (CC)
            </label>
            <select
              name="cc"
              value={inputs.cc}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="upto1000">Up to 1000 cc</option>
              <option value="1001-1500">1001 - 1500 cc</option>
              <option value="above1500">Above 1500 cc</option>
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kilowatt (KW)
            </label>
            <select
              name="kw"
              value={inputs.kw}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="upto30">Up to 30 KW</option>
              <option value="30-65">&gt; 30 KW to 65 KW</option>
              <option value="above65">Above 65 KW</option>
            </select>
          </div>
        )}

        {inputs.policyType !== "liability" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purchase Date
              </label>
              <input
                type="text"
                name="purchaseDate"
                value={inputs.purchaseDate || ""}
                onChange={handleDateChange}
                placeholder="dd/mm/yyyy"
                maxLength="10"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
              {vehicleAgeYears !== null && vehicleAgeYears >= 0 && (
                <p className="text-xs text-gray-600 mt-1 pl-1">
                  Vehicle Age:{" "}
                  <span className="font-bold text-teal-600">
                    {vehicleAgeYears} years
                  </span>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Renewal Date
              </label>
              <input
                type="text"
                name="renewalDate"
                value={inputs.renewalDate || ""}
                onChange={handleDateChange}
                placeholder="dd/mm/yyyy"
                maxLength="10"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Insured Declared Value (IDV)
              </label>
              <input
                type="number"
                name="idv"
                value={inputs.idv}
                onChange={handleInputChange}
                placeholder="e.g., 500000"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Zone
              </label>
              <select
                name="zone"
                value={inputs.zone}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="A">Zone A (Major Cities)</option>
                <option value="B">Zone B (Rest of India)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                No Claim Bonus (NCB)
              </label>
              <select
                name="ncb"
                value={inputs.ncb}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="0">0%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="35">35%</option>
                <option value="45">45%</option>
                <option value="50">50%</option>
              </select>
            </div>
          </>
        )}
      </div>

      {inputs.policyType === "package" && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <input
              id="payd"
              name="payd"
              type="checkbox"
              checked={inputs.payd}
              onChange={handleInputChange}
              className="h-4 w-4 text-teal-600 border-gray-300 rounded"
            />
            <label
              htmlFor="payd"
              className="ml-2 text-sm font-medium text-gray-800"
            >
              Opt for Pay As You Drive (PAYD)
            </label>
          </div>
          {inputs.payd && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Kilometer Slab
              </label>
              <select
                name="paydOption"
                value={inputs.paydOption}
                onChange={handleInputChange}
                className="mt-1 block w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="none">Beyond 10,000 Kms (0% discount)</option>
                <option value="10000">Up to 10,000 Kms (10% discount)</option>
                <option value="8000">Up to 8,000 Kms (15% discount)</option>
                <option value="6000">Up to 6,000 Kms (20% discount)</option>
                <option value="4000">Up to 4,000 Kms (25% discount)</option>
              </select>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VehicleDetailsSection;
