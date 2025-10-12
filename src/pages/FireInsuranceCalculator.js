import React, { useState, useEffect, Suspense } from "react";
import Header from "../components/fire-insurance/Header";
import Tips from "../components/fire-insurance/Tips";
import RatesTable from "../components/fire-insurance/RatesTable";
import PremiumCalculator from "../components/fire-insurance/PremiumCalculator";
import ShortPeriodCalculator from "../components/fire-insurance/ShortPeriodCalculator";
import ReferenceData from "../components/fire-insurance/ReferenceData";
import { supabase } from "../supabaseClient";
import RatesTableSkeleton from "../components/fire-insurance/RatesTableSkeleton";
import Spinner from "../components/common/Spinner";

const FireInsuranceCalculator = () => {
  const [allRates, setAllRates] = useState([]);
  const [allZones, setAllZones] = useState([]);
  const [filteredRates, setFilteredRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <Tips />
        <Suspense fallback={<Spinner />}>
          {loading ? (
            <RatesTableSkeleton />
          ) : (
            <RatesTable
              allRates={allRates}
              filteredRates={filteredRates}
              setFilteredRates={setFilteredRates}
            />
          )}
          <PremiumCalculator allZones={allZones} />
        </Suspense>
        <ShortPeriodCalculator />
        <ReferenceData />
      </div>
    </div>
  );
};

export default FireInsuranceCalculator;
