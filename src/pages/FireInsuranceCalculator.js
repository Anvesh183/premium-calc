import React, { useState, useEffect } from "react";
import Header from "../components/fire-insurance/Header";
import Tips from "../components/fire-insurance/Tips";
import RatesTable from "../components/fire-insurance/RatesTable";
import PremiumCalculator from "../components/fire-insurance/PremiumCalculator";
import ShortPeriodCalculator from "../components/fire-insurance/ShortPeriodCalculator";
import ReferenceData from "../components/fire-insurance/ReferenceData";
import { supabase } from "../supabaseClient";

const FireInsuranceCalculator = () => {
  const [allRates, setAllRates] = useState([]);
  const [allZones, setAllZones] = useState([]);
  const [filteredRates, setFilteredRates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let ratesData, zonesData;

        if (process.env.NODE_ENV === "development") {
          const [ratesResponse, zonesResponse] = await Promise.all([
            supabase.from("rates").select("*"),
            supabase.from("earthquake_zones").select("*"),
          ]);

          if (ratesResponse.error) throw ratesResponse.error;
          if (zonesResponse.error) throw zonesResponse.error;

          ratesData = ratesResponse.data;
          zonesData = zonesResponse.data;
        } else {
          const response = await fetch("/.netlify/functions/get-data");
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch data");
          }
          ratesData = data.rates;
          zonesData = data.zones;
        }

        setAllRates(ratesData);
        setAllZones(zonesData);
        setFilteredRates(ratesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <Tips />
        <RatesTable
          allRates={allRates}
          filteredRates={filteredRates}
          setFilteredRates={setFilteredRates}
        />
        <PremiumCalculator allZones={allZones} />
        <ShortPeriodCalculator />
        <ReferenceData />
      </div>
    </div>
  );
};

export default FireInsuranceCalculator;
