import React, { useState } from "react";
import NewIndiaMediclaimInputs from "./NewIndiaMediclaimInputs";
import NewIndiaMediclaimCoverages from "./NewIndiaMediclaimCoverages";
import NewIndiaMediclaimExclusions from "./NewIndiaMediclaimExclusions";
import NewIndiaMediclaimEligibility from "./NewIndiaMediclaimEligibility";

const NewIndiaMediclaimTabs = () => {
  const [activeTab, setActiveTab] = useState("calculator");

  const renderContent = () => {
    switch (activeTab) {
      case "calculator":
        return <NewIndiaMediclaimInputs />;
      case "coverage":
        return <NewIndiaMediclaimCoverages />;
      case "exclusions":
        return <NewIndiaMediclaimExclusions />;
      case "eligibility":
        return <NewIndiaMediclaimEligibility />;
      default:
        return null;
    }
  };

  const getTabClass = (tabName) => {
    return `px-4 py-3 font-semibold text-sm rounded-t-lg transition-colors duration-200 focus:outline-none whitespace-nowrap ${
      activeTab === tabName
        ? "border-b-2 border-teal-500 text-teal-500"
        : "text-gray-500 hover:text-teal-500"
    }`;
  };

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <div className="overflow-x-auto">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              className={getTabClass("calculator")}
              onClick={() => setActiveTab("calculator")}
            >
              Premium Calculator
            </button>
            <button
              className={getTabClass("coverage")}
              onClick={() => setActiveTab("coverage")}
            >
              Coverage Details
            </button>
            <button
              className={getTabClass("exclusions")}
              onClick={() => setActiveTab("exclusions")}
            >
              Exclusions
            </button>
            <button
              className={getTabClass("eligibility")}
              onClick={() => setActiveTab("eligibility")}
            >
              Eligibility & Features
            </button>
          </nav>
        </div>
      </div>
      <div key={activeTab}>{renderContent()}</div>
    </div>
  );
};

export default NewIndiaMediclaimTabs;
