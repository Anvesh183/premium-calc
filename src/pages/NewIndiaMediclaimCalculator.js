import React from "react";
import NewIndiaMediclaimTabs from "../components/new-india-mediclaim/NewIndiaMediclaimTabs";

const NewIndiaMediclaimCalculator = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            New India <span className="text-teal-500">Mediclaim Policy</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Premium Calculator</p>
        </header>
        <NewIndiaMediclaimTabs />
      </div>
    </div>
  );
};

export default NewIndiaMediclaimCalculator;
