import React from "react";
import FloaterMediclaimTabs from "../components/floater-mediclaim/FloaterMediclaimTabs";

const FloaterMediclaimCalculator = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            New India Floater{" "}
            <span className="text-teal-500">Mediclaim Policy</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Long-Term Premium Calculator
          </p>
        </header>
        <FloaterMediclaimTabs />
      </div>
    </div>
  );
};

export default FloaterMediclaimCalculator;
