import React from "react";

const TravellerInput = ({
  traveller,
  index,
  onTravellerChange,
  onRemoveTraveller,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4 bg-gray-50 rounded-lg">
      <div className="md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">
          Traveller {index + 1} Age
        </label>
        <select
          name="age"
          value={traveller.age}
          onChange={(e) => onTravellerChange(index, "age", e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="6m-50">6 months - 50 years</option>
          <option value="51-60">51 - 60 years</option>
          <option value="61-70">61 - 70 years</option>
          <option value="71-75">71 - 75 years</option>
          <option value="76-90">76 - 90 years</option>
        </select>
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">
          Sum Insured (USD)
        </label>
        <select
          name="sumInsured"
          value={traveller.sumInsured}
          onChange={(e) =>
            onTravellerChange(index, "sumInsured", e.target.value)
          }
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="25000">$25,000 (Basic)</option>
          <option value="50000">$50,000 (Economy)</option>
          <option value="100000">$100,000 (Advanced)</option>
          <option value="250000">$250,000 (Elite)</option>
          <option value="500000">$500,000 (Supreme)</option>
        </select>
      </div>

      {index > 0 && (
        <div className="md:col-span-1">
          <button
            onClick={() => onRemoveTraveller(index)}
            className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Remove Traveller
          </button>
        </div>
      )}
    </div>
  );
};

export default TravellerInput;
