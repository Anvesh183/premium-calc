import React, { useState } from "react";
import TravelCalculator from "./TravelCalculator";
import PlanDetails from "./PlanDetails";
import EligibilityInfo from "./EligibilityInfo";
import MedicalCheckupInfo from "./MedicalCheckupInfo";
import KeyConditions from "./KeyConditions";
import OtherInfo from "./OtherInfo";
import ExclusionsInfo from "./ExclusionsInfo";
import ExtensionCalculator from "./ExtensionCalculator";

const TravelTabs = () => {
  const [activeTab, setActiveTab] = useState("calculator");

  const renderContent = () => {
    switch (activeTab) {
      case "calculator":
        return <TravelCalculator />;
      case "comparison":
        return <PlanDetails />;
      case "details":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="space-y-8">
              <EligibilityInfo />
              <div className="border-t border-gray-200"></div>
              <MedicalCheckupInfo />
              <div className="border-t border-gray-200"></div>
              <KeyConditions />
              <div className="border-t border-gray-200"></div>
              <OtherInfo />
            </div>
          </div>
        );
      case "exclusions":
        return <ExclusionsInfo />;
      case "extension":
        return <ExtensionCalculator />;
      default:
        return <TravelCalculator />;
    }
  };

  const getTabClass = (tabName) => {
    return `px-4 py-3 font-semibold text-sm rounded-t-lg transition-colors duration-200 focus:outline-none whitespace-nowrap ${
      activeTab === tabName
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500 hover:text-blue-600"
    }`;
  };

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <div className="overflow-x-auto">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              className={getTabClass("comparison")}
              onClick={() => setActiveTab("comparison")}
            >
              Plan Comparison
            </button>
            <button
              className={getTabClass("details")}
              onClick={() => setActiveTab("details")}
            >
              Policy Details
            </button>
            <button
              className={getTabClass("exclusions")}
              onClick={() => setActiveTab("exclusions")}
            >
              Exclusions
            </button>
            <button
              className={getTabClass("calculator")}
              onClick={() => setActiveTab("calculator")}
            >
              Premium Calculator
            </button>
            <button
              className={getTabClass("extension")}
              onClick={() => setActiveTab("extension")}
            >
              Policy Extension
            </button>
          </nav>
        </div>
      </div>
      {/* The key prop below is the fix. By setting the key to the activeTab, 
        we force React to re-mount the component completely when the tab changes,
        ensuring a fresh state every time.
      */}
      <div key={activeTab}>{renderContent()}</div>
    </div>
  );
};

export default TravelTabs;
