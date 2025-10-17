import React from "react";
import PrivateCarInputs from "../../components/motor-insurance/private-car/PrivateCarInputs";

const PrivateCarCalculator = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Private Car{" "}
            <span className="text-teal-500">Premium Calculator</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Calculate your motor insurance premium based on the latest tariffs.
          </p>
        </header>
        <PrivateCarInputs />
      </div>
    </div>
  );
};

export default PrivateCarCalculator;
