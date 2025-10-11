import React, { useEffect, useRef } from "react";
import { useGipsaStore } from "../store/gipsa-store";
import { PREMIUMS } from "../data/gipsa-data";
import GipsaInputs from "../components/gipsa-gmc/GipsaInputs";
import GipsaResults from "../components/gipsa-gmc/GipsaResults";
import "./GipsaGmcCalculator.css";

const GipsaGmcCalculator = () => {
  const {
    members,
    payBand,
    gstPct,
    results,
    showResults,
    setMembers,
    setPayBand,
    setGstPct,
    setResults,
    reset,
  } = useGipsaStore();

  const resultsRef = useRef(null);

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  return (
    // The main container class is simplified for consistency
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto gipsa-container">
        <div className="header">
          <h1>GIPSA Staff GMC Premium Calculator</h1>
          <div className="info-box">
            <span className="icon">ℹ️</span>
            <p>
              Company contributes <b>75%</b> of the premium for{" "}
              <b>Employee, Spouse & up to 2 Dependent Children</b> (up to
              entitlement). If a higher SI is chosen, the{" "}
              <b>difference is fully paid by you</b>. Parents, In‑laws &
              Independent Children are <b>self‑paid</b>.
            </p>
          </div>
        </div>

        <div className="content-grid">
          <GipsaInputs
            members={members}
            payBand={payBand}
            gstPct={gstPct}
            onMemberChange={setMembers}
            onPayBandChange={setPayBand}
            onGstChange={setGstPct}
            onCalculate={setResults}
            onReset={reset}
            premiums={PREMIUMS}
          />

          <div ref={resultsRef}>
            {showResults && <GipsaResults results={results} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GipsaGmcCalculator;
