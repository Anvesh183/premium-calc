import React from "react";
import AddonSection from "./AddonSection";

const AddonSections = ({ inputs, handleInputChange }) => {
  const calculateVehicleAge = (dateString) => {
    if (!dateString || dateString.length !== 10) return { years: 0 };
    const parts = dateString.split("/");
    if (parts.length !== 3) return { years: 0 };
    const [day, month, year] = parts.map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year) || year.toString().length < 4)
      return { years: 0 };
    const purchaseDate = new Date(year, month - 1, day);
    if (isNaN(purchaseDate.getTime())) return { years: 0 };
    const today = new Date();
    let age = today.getFullYear() - purchaseDate.getFullYear();
    const m = today.getMonth() - purchaseDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < purchaseDate.getDate())) {
      age--;
    }
    return { years: age };
  };

  const vehicleAgeYears = calculateVehicleAge(inputs.purchaseDate).years;

  const isLongTerm = inputs.policyDuration === "3";
  const { longTermPackage } = inputs;

  const isNilDepDisabled =
    isLongTerm &&
    (longTermPackage === "basic" ||
      longTermPackage === "pro" ||
      longTermPackage === "elite");
  const isEngineProtectDisabled =
    isLongTerm && (longTermPackage === "pro" || longTermPackage === "elite");
  const isRtiDisabled = isLongTerm && longTermPackage === "elite";

  const getDisabledClass = (isDisabled) =>
    isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">
        Add-on Covers
      </h2>

      <AddonSection title="Major Add-ons">
        <div
          className={getDisabledClass(vehicleAgeYears >= 7 || isNilDepDisabled)}
        >
          <label className="block text-sm font-medium text-gray-700">
            Nil Depreciation
          </label>
          <select
            name="nilDep"
            value={inputs.nilDep}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 7 || isNilDepDisabled}
          >
            <option value="none">Not Required</option>
            <option value="upto1500">Upto 1500cc</option>
            <option value="above1500">Above 1500cc</option>
          </select>
        </div>
        <div
          className={getDisabledClass(vehicleAgeYears >= 7 || isNilDepDisabled)}
        >
          <label className="block text-sm font-medium text-gray-700">
            Allowed Claims (Nil Dep)
          </label>
          <select
            name="nilDepClaims"
            value={inputs.nilDepClaims}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 7 || isNilDepDisabled}
          >
            <option value="2">2 Claims</option>
            <option value="4">4 Claims</option>
            <option value="unlimited">Unlimited Claims</option>
          </select>
        </div>
        <div
          className={getDisabledClass(vehicleAgeYears >= 3 || isRtiDisabled)}
        >
          <label className="block text-sm font-medium text-gray-700">
            Return to Invoice
          </label>
          <select
            name="rti"
            value={inputs.rti}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 3 || isRtiDisabled}
          >
            <option value="none">Not Required</option>
            <option value="standard">RTI Standard</option>
            <option value="gold">RTI Gold</option>
          </select>
        </div>
        {inputs.rti !== "none" && (
          <div
            className={getDisabledClass(vehicleAgeYears >= 3 || isRtiDisabled)}
          >
            <label className="block text-sm font-medium text-gray-700">
              Invoice Price
            </label>
            <input
              type="number"
              name="invoicePrice"
              value={inputs.invoicePrice}
              onChange={handleInputChange}
              placeholder="e.g., 600000"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              disabled={vehicleAgeYears >= 3 || isRtiDisabled}
            />
          </div>
        )}
        <div
          className={`flex items-center ${getDisabledClass(
            vehicleAgeYears >= 5 && !isLongTerm
          )}`}
        >
          <input
            id="ncbProtect"
            name="ncbProtect"
            type="checkbox"
            checked={inputs.ncbProtect}
            onChange={handleInputChange}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
            disabled={vehicleAgeYears >= 5 && !isLongTerm}
          />
          <label htmlFor="ncbProtect" className="ml-2 text-sm text-gray-700">
            NCB Protection
          </label>
        </div>
        {inputs.fuelType === "petrol_diesel" && (
          <div
            className={`flex items-center ${getDisabledClass(
              (vehicleAgeYears >= 5 && !isLongTerm) || isEngineProtectDisabled
            )}`}
          >
            <input
              id="engineProtect"
              name="engineProtect"
              type="checkbox"
              checked={inputs.engineProtect}
              onChange={handleInputChange}
              className="h-4 w-4 text-teal-600 border-gray-300 rounded"
              disabled={
                (vehicleAgeYears >= 5 && !isLongTerm) || isEngineProtectDisabled
              }
            />
            <label
              htmlFor="engineProtect"
              className="ml-2 text-sm text-gray-700"
            >
              Engine Protection
            </label>
          </div>
        )}
        {inputs.fuelType === "electric" && (
          <div
            className={`flex items-center ${getDisabledClass(
              vehicleAgeYears >= 3
            )}`}
          >
            <input
              id="batteryProtect"
              name="batteryProtect"
              type="checkbox"
              checked={inputs.batteryProtect}
              onChange={handleInputChange}
              className="h-4 w-4 text-teal-600 border-gray-300 rounded"
              disabled={vehicleAgeYears >= 3}
            />
            <label
              htmlFor="batteryProtect"
              className="ml-2 text-sm text-gray-700"
            >
              Battery Protection
            </label>
          </div>
        )}
      </AddonSection>

      <AddonSection title="Other Protection Covers">
        <div
          className={`flex items-center ${getDisabledClass(
            vehicleAgeYears >= 5
          )}`}
        >
          <input
            id="consumables"
            name="consumables"
            type="checkbox"
            checked={inputs.consumables}
            onChange={handleInputChange}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
            disabled={vehicleAgeYears >= 5}
          />
          <label htmlFor="consumables" className="ml-2 text-sm text-gray-700">
            Consumables
          </label>
        </div>
        <div
          className={`flex items-center ${getDisabledClass(
            vehicleAgeYears >= 3
          )}`}
        >
          <input
            id="tyreProtect"
            name="tyreProtect"
            type="checkbox"
            checked={inputs.tyreProtect}
            onChange={handleInputChange}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
            disabled={vehicleAgeYears >= 3}
          />
          <label htmlFor="tyreProtect" className="ml-2 text-sm text-gray-700">
            Tyre & Alloy Protect
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Roadside Assistance (RSA)
          </label>
          <select
            name="roadsideAssist"
            value={inputs.roadsideAssist}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="none">Not Required</option>
            <option value="basic">RSA Basic</option>
            <option value="gold">RSA Gold</option>
          </select>
        </div>
        <div
          className={`flex items-center ${getDisabledClass(
            vehicleAgeYears >= 7
          )}`}
        >
          <input
            id="keyProtect"
            name="keyProtect"
            type="checkbox"
            checked={inputs.keyProtect}
            onChange={handleInputChange}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
            disabled={vehicleAgeYears >= 7}
          />
          <label htmlFor="keyProtect" className="ml-2 text-sm text-gray-700">
            Key Protection
          </label>
        </div>
        <div
          className={`flex items-center ${getDisabledClass(
            vehicleAgeYears >= 7
          )}`}
        >
          <input
            id="personalBelongings"
            name="personalBelongings"
            type="checkbox"
            checked={inputs.personalBelongings}
            onChange={handleInputChange}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
            disabled={vehicleAgeYears >= 7}
          />
          <label
            htmlFor="personalBelongings"
            className="ml-2 text-sm text-gray-700"
          >
            Personal Belongings
          </label>
        </div>
      </AddonSection>

      <AddonSection title="Equipment & Other Covers">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Electrical Fittings Value
          </label>
          <input
            type="number"
            name="electricalFittingsValue"
            value={inputs.electricalFittingsValue}
            onChange={handleInputChange}
            placeholder="e.g., 10000"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {inputs.fuelType === "petrol_diesel" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CNG/LPG Kit Value
            </label>
            <input
              type="number"
              name="cngLpgKitValue"
              value={inputs.cngLpgKitValue}
              onChange={handleInputChange}
              placeholder="e.g., 50000"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        )}
        {inputs.fuelType === "electric" && (
          <div className="flex items-center">
            <input
              id="wallMountedCharger"
              name="wallMountedCharger"
              type="checkbox"
              checked={inputs.wallMountedCharger}
              onChange={handleInputChange}
              className="h-4 w-4 text-teal-600 border-gray-300 rounded"
            />
            <label
              htmlFor="wallMountedCharger"
              className="ml-2 text-sm text-gray-700"
            >
              Wall Mounted Charger
            </label>
          </div>
        )}
        <div className={getDisabledClass(vehicleAgeYears >= 7)}>
          <label className="block text-sm font-medium text-gray-700">
            Loss of Contents Value
          </label>
          <input
            type="number"
            name="lossOfContentsValue"
            value={inputs.lossOfContentsValue}
            onChange={handleInputChange}
            placeholder="Max 20000"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 7}
          />
        </div>
        <div className={getDisabledClass(vehicleAgeYears >= 7)}>
          <label className="block text-sm font-medium text-gray-700">
            Additional Towing Charges
          </label>
          <input
            type="number"
            name="additionalTowingValue"
            value={inputs.additionalTowingValue}
            onChange={handleInputChange}
            placeholder="Max 10000"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 7}
          />
        </div>
        <div className={getDisabledClass(vehicleAgeYears >= 7)}>
          <label className="block text-sm font-medium text-gray-700">
            High Value PA Sum Insured
          </label>
          <input
            type="number"
            name="highValuePA_SI"
            value={inputs.highValuePA_SI}
            onChange={handleInputChange}
            placeholder="e.g., 1000000"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 7}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hybrid Protect Cover
          </label>
          <select
            name="hybridProtect"
            value={inputs.hybridProtect}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="none">Not Required</option>
            <option value="basic">Basic</option>
            <option value="comp">Comprehensive</option>
          </select>
        </div>
      </AddonSection>

      <AddonSection title="Discounts">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            On Own Damage (%)
          </label>
          <input
            type="number"
            name="odDiscount"
            value={inputs.odDiscount}
            onChange={handleInputChange}
            placeholder="e.g., 10"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className={getDisabledClass(vehicleAgeYears >= 7)}>
          <label className="block text-sm font-medium text-gray-700">
            On Nil Depreciation (%)
          </label>
          <input
            type="number"
            name="nilDepDiscount"
            value={inputs.nilDepDiscount}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 7}
          />
        </div>
        <div className={getDisabledClass(vehicleAgeYears >= 5)}>
          <label className="block text-sm font-medium text-gray-700">
            On Engine Protection (%)
          </label>
          <input
            type="number"
            name="engineProtectDiscount"
            value={inputs.engineProtectDiscount}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 5}
          />
        </div>
        <div className={getDisabledClass(vehicleAgeYears >= 5)}>
          <label className="block text-sm font-medium text-gray-700">
            On Consumables (%)
          </label>
          <input
            type="number"
            name="consumablesDiscount"
            value={inputs.consumablesDiscount}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 5}
          />
        </div>
        <div className={getDisabledClass(vehicleAgeYears >= 3)}>
          <label className="block text-sm font-medium text-gray-700">
            On Return to Invoice (%)
          </label>
          <input
            type="number"
            name="rtiDiscount"
            value={inputs.rtiDiscount}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            disabled={vehicleAgeYears >= 3}
          />
        </div>
      </AddonSection>
    </>
  );
};

export default AddonSections;
