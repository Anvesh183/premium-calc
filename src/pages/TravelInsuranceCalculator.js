import React from "react";
import Header from "../components/travel-insurance/Header";
import TravelTabs from "../components/travel-insurance/TravelTabs";

const TravelInsuranceCalculator = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <TravelTabs />
      </div>
    </div>
  );
};

export default TravelInsuranceCalculator;
