import React, { useState, useEffect, useCallback } from "react";
import ResultsModal from "./ResultsModal";

const PremiumCalculator = ({ allZones, filteredRates }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [sumInsured, setSumInsured] = useState("");
  const [baseRate, setBaseRate] = useState("");
  const [stfi, setStfi] = useState("0");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [eqZone, setEqZone] = useState("0");
  const [terrorism, setTerrorism] = useState("0");
  const [adjustment, setAdjustment] = useState("");
  const [kutcha, setKutcha] = useState(false);
  const [floater, setFloater] = useState(false);
  const [zoneResult, setZoneResult] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRowCode, setSelectedRowCode] = useState(null);

  // Determine if the risk is industrial based on the STFI category selection
  const isIndustrial = stfi === "0.370";

  useEffect(() => {
    const uniqueStates = [
      ...new Set(allZones.map((zone) => zone.state)),
    ].sort();
    setStates(uniqueStates);
  }, [allZones]);

  // Effect to auto-select the correct EQ zone when dependencies change
  useEffect(() => {
    if (state && district) {
      const zoneInfo = allZones.find(
        (z) => z.state === state && z.district === district
      );
      if (zoneInfo) {
        const riskZone = zoneInfo.zone;
        setZoneResult(`Risk Location Zone: ${riskZone}`);

        let zoneValue = "";
        if (riskZone === "V") zoneValue = isIndustrial ? "0.500" : "0.250";
        else if (riskZone === "IV")
          zoneValue = isIndustrial ? "0.250" : "0.150";
        else if (riskZone === "III") zoneValue = "0.100";
        else if (riskZone === "II") zoneValue = "0.050";

        // Only set the zone if a valid one is found
        if (zoneValue) {
          setEqZone(zoneValue);
        }
      } else {
        setZoneResult("");
      }
    }
  }, [state, district, stfi, allZones, isIndustrial]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    const filteredDistricts = allZones
      .filter((zone) => zone.state === selectedState)
      .map((zone) => zone.district)
      .sort();
    setDistricts(filteredDistricts);
    setDistrict("");
    setZoneResult("");
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleRowClick = useCallback(
    (rateData) => {
      setSelectedRowCode(rateData.code);
      const tsi = parseFloat(sumInsured) || 0;
      if (tsi > 0) {
        if (tsi <= 50000000) {
          setBaseRate(rateData.us_sookshma);
        } else {
          setBaseRate(rateData.sf_std);
        }
      }
    },
    [sumInsured]
  );

  useEffect(() => {
    const tableBody = document.getElementById("ratesTableBody");
    if (!tableBody) return;
    const clickHandler = (e) => {
      const row = e.target.closest("tr");
      if (row && row.dataset.rate) {
        handleRowClick(JSON.parse(row.dataset.rate));
      }
    };
    tableBody.addEventListener("click", clickHandler);
    return () => tableBody.removeEventListener("click", clickHandler);
  }, [handleRowClick]);

  useEffect(() => {
    const allRows = document.querySelectorAll("#ratesTableBody tr");
    allRows.forEach((row) => {
      const rateData = JSON.parse(row.dataset.rate);
      row.classList.toggle("selected-row", rateData.code === selectedRowCode);
    });
  }, [selectedRowCode, filteredRates]);

  const handleCalculate = () => {
    const tsi = parseFloat(sumInsured) || 0;
    const base = parseFloat(baseRate) || 0;
    const eq = parseFloat(eqZone) || 0;
    const stfiRate = parseFloat(stfi) || 0;
    const terror = parseFloat(terrorism) || 0;
    const kutchaLoading = kutcha ? 4.0 : 0;
    const adjustmentPercentage = parseFloat(adjustment) || 0;

    if (tsi <= 0 || isNaN(base)) {
      setModalContent(
        `<p class="text-center font-semibold text-red-600">Please enter a valid Total Sum Insured and Base Rate.</p>`
      );
      setModalOpen(true);
      return;
    }

    let totalRate = base + eq + stfiRate + terror + kutchaLoading;
    const discountPercentage = Math.abs(adjustmentPercentage);
    const adjustmentFactor = 1 - discountPercentage / 100;
    const policyRate = totalRate * adjustmentFactor;
    const floaterLoadingRate = floater ? policyRate * 0.1 : 0;
    const finalRate = policyRate + floaterLoadingRate;
    const premium = (finalRate / 1000) * tsi;
    const minimumPremium = 100;
    const finalPremium = Math.max(premium, minimumPremium);
    const gstRate = 0.18;
    const gstAmount = finalPremium * gstRate;
    const totalPremiumWithGST = finalPremium + gstAmount;

    let resultHTML = `
      <div class="p-4 bg-gray-50 rounded-lg">
        <div class="flex justify-between items-baseline">
          <p class="font-semibold text-lg">Total Sum Insured (TSI):</p>
          <p class="font-bold text-lg text-blue-600">₹ ${tsi.toLocaleString(
            "en-IN"
          )}</p>
        </div>
      </div>
      <div class="border-t border-b border-gray-200 py-3 my-3">
        <p class="font-semibold mb-2 text-gray-800">Rate Calculation (per mille):</p>
        <div class="space-y-1 text-sm pl-2">
          <div class="flex justify-between"><span>Base Rate:</span> <span>${base.toFixed(
            4
          )}</span></div>
          <div class="flex justify-between"><span>EQ Loading:</span> <span>+ ${eq.toFixed(
            4
          )}</span></div>
          <div class="flex justify-between"><span>STFI Loading:</span> <span>+ ${stfiRate.toFixed(
            4
          )}</span></div>
          <div class="flex justify-between"><span>Terrorism Loading:</span> <span>+ ${terror.toFixed(
            4
          )}</span></div>
          ${
            kutchaLoading > 0
              ? `<div class="flex justify-between"><span>Kutcha Loading:</span> <span>+ ${kutchaLoading.toFixed(
                  4
                )}</span></div>`
              : ""
          }
          <div class="flex justify-between font-bold border-t pt-1 mt-1"><span>Subtotal Rate:</span> <span>${totalRate.toFixed(
            4
          )}</span></div>
          ${
            adjustmentPercentage !== 0
              ? `<div class="flex justify-between"><span>Discount (${adjustmentPercentage}%):</span> <span>${
                  adjustmentPercentage > 0 ? "-" : ""
                }${(totalRate * (adjustmentPercentage / 100)).toFixed(
                  4
                )}</span></div>`
              : ""
          }
          <div class="flex justify-between font-bold text-blue-600"><span>Policy Rate:</span> <span>${policyRate.toFixed(
            4
          )}</span></div>
          ${
            floater
              ? `<div class="flex justify-between text-blue-600"><span>Floater Loading (10%):</span> <span>+ ${floaterLoadingRate.toFixed(
                  4
                )}</span></div>`
              : ""
          }
          <div class="flex justify-between font-bold border-t pt-1 mt-1 text-xl text-blue-800"><span>Final Rate:</span> <span>${finalRate.toFixed(
            4
          )}</span></div>
        </div>
      </div>
      <div class="p-4 bg-blue-50 rounded-lg mb-3">
        <div class="flex justify-between items-baseline">
          <p class="font-semibold text-xl">Final Premium (before GST):</p>
          <p class="font-bold text-xl text-blue-700">₹ ${finalPremium.toLocaleString(
            "en-IN",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )}</p>
        </div>
        ${
          finalPremium === minimumPremium
            ? `<p class="text-xs text-center mt-2 text-gray-500">(Minimum premium applied)</p>`
            : ""
        }
      </div>
      <div class="p-4 bg-green-50 rounded-lg">
        <div class="flex justify-between items-baseline">
          <p class="font-semibold text-xl">GST (18%):</p>
          <p class="font-bold text-xl text-green-700">₹ ${gstAmount.toLocaleString(
            "en-IN",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )}</p>
        </div>
        <div class="flex justify-between items-baseline mt-2 border-t pt-2 border-green-200">
          <p class="font-semibold text-xl">Total Payable Premium:</p>
          <p class="font-bold text-xl text-green-800">₹ ${totalPremiumWithGST.toLocaleString(
            "en-IN",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )}</p>
        </div>
      </div>`;
    setModalContent(resultHTML);
    setModalOpen(true);
  };

  const handleReset = () => {
    setSumInsured("");
    setBaseRate("");
    setStfi("0");
    setState("");
    setDistrict("");
    setEqZone("0");
    setTerrorism("0");
    setAdjustment("");
    setKutcha(false);
    setFloater(false);
    setZoneResult("");
    setSelectedRowCode(null);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        2. Annual Premium Calculator
      </h2>
      <div className="calculator-grid">
        <div className="calculator-row">
          <div className="calculator-cell">
            <label
              htmlFor="sumInsured"
              className="block text-sm font-medium text-gray-700"
            >
              Total Sum Insured (TSI)
            </label>
            <input
              type="number"
              id="sumInsured"
              value={sumInsured}
              onChange={(e) => setSumInsured(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="calculator-cell">
            <label
              htmlFor="baseRate"
              className="block text-sm font-medium text-gray-700"
            >
              Base Rate (per mille)
            </label>
            <input
              type="number"
              step="0.001"
              id="baseRate"
              value={baseRate}
              onChange={(e) => setBaseRate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="calculator-cell">
            <label
              htmlFor="stfi"
              className="block text-sm font-medium text-gray-700"
            >
              STFI Category
            </label>
            <select
              id="stfi"
              value={stfi}
              onChange={(e) => setStfi(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="0">Not Applicable</option>
              <option value="0.220">Non-Industrial</option>
              <option value="0.370">Industrial Risk</option>
              <option value="0.520">Storage warehouses (closed)</option>
              <option value="2.250">Storage warehouses (open)</option>
              <option value="0.520">Roads, Bridges, Tunnels, Pipelines</option>
              <option value="0.520">Railway / Metro Tracks</option>
              <option value="0.520">T&D / Cellular Network Lines</option>
            </select>
          </div>
        </div>
        <div className="calculator-row">
          <div className="calculator-cell">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State/UT
            </label>
            <select
              id="state"
              value={state}
              onChange={handleStateChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select State/UT</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="calculator-cell">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              District
            </label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm font-semibold text-blue-600 h-5">
              {zoneResult}
            </div>
          </div>
          <div className="calculator-cell">
            <label
              htmlFor="eqZone"
              className="block text-sm font-medium text-gray-700"
            >
              Earthquake Zone
            </label>
            <select
              id="eqZone"
              value={eqZone}
              onChange={(e) => setEqZone(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="0">Not Applicable</option>
              {isIndustrial ? (
                <optgroup label="Industrial">
                  <option value="0.500">Zone I (Industrial)</option>
                  <option value="0.250">Zone II (Industrial)</option>
                  <option value="0.100">Zone III (Industrial)</option>
                  <option value="0.050">Zone IV (Industrial)</option>
                </optgroup>
              ) : (
                <optgroup label="Non-Industrial">
                  <option value="0.250">Zone I (Non-Industrial)</option>
                  <option value="0.150">Zone II (Non-Industrial)</option>
                  <option value="0.100">Zone III (Non-Industrial)</option>
                  <option value="0.050">Zone IV (Non-Industrial)</option>
                </optgroup>
              )}
            </select>
          </div>
        </div>
        <div className="calculator-row">
          <div className="calculator-cell">
            <label
              htmlFor="terrorism"
              className="block text-sm font-medium text-gray-700"
            >
              Terrorism Category
            </label>
            <select
              id="terrorism"
              value={terrorism}
              onChange={(e) => setTerrorism(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="0">Not Applicable</option>
              <option value="0.07">Residential</option>
              <option value="0.13">Non-Industrial</option>
              <option value="0.21">Industrial</option>
            </select>
          </div>
          <div className="calculator-cell">
            <label
              htmlFor="adjustment"
              className="block text-sm font-medium text-gray-700"
            >
              Discount (%)
            </label>
            <input
              type="number"
              id="adjustment"
              value={adjustment}
              onChange={(e) => setAdjustment(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="calculator-cell pt-6">
            <div className="flex items-center mb-2">
              <input
                id="kutcha"
                type="checkbox"
                className="h-4 w-4 rounded"
                checked={kutcha}
                onChange={(e) => setKutcha(e.target.checked)}
              />
              <label htmlFor="kutcha" className="ml-2 text-sm text-gray-700">
                Kutcha Construction (+4.00)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="floater"
                type="checkbox"
                className="h-4 w-4 rounded"
                checked={floater}
                onChange={(e) => setFloater(e.target.checked)}
              />
              <label htmlFor="floater" className="ml-2 text-sm text-gray-700">
                Floater Cover for Stocks (+10%)
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="calculator-actions">
        <button id="resetBtn" className="btn" onClick={handleReset}>
          Reset
        </button>
        <button
          id="calculateBtn"
          className="btn primary"
          onClick={handleCalculate}
        >
          Calculate Annual Premium
        </button>
      </div>
      <ResultsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
};

export default PremiumCalculator;
