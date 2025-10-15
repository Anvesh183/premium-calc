import React, { useState } from "react";
import FloaterMediclaimInputs from "./FloaterMediclaimInputs";
import FloaterMediclaimEligibility from "./FloaterMediclaimEligibility";
import FloaterMediclaimCoverages from "./FloaterMediclaimCoverages";
import FloaterMediclaimExclusions from "./FloaterMediclaimExclusions";

const FloaterMediclaimTabs = () => {
  const [activeTab, setActiveTab] = useState("calculator");

  const renderContent = () => {
    switch (activeTab) {
      case "calculator":
        return <FloaterMediclaimInputs />;
      case "eligibility":
        return <FloaterMediclaimEligibility />;
      case "coverage":
        return <FloaterMediclaimCoverages />;
      case "exclusions":
        return <FloaterMediclaimExclusions />;
      default:
        return <FloaterMediclaimInputs />;
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
              className={getTabClass("eligibility")}
              onClick={() => setActiveTab("eligibility")}
            >
              Eligibility & Features
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
          </nav>
        </div>
      </div>
      <div key={activeTab}>{renderContent()}</div>
    </div>
  );
};

export default FloaterMediclaimTabs;
