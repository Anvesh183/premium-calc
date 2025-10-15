import React, { useState, useRef, useEffect } from "react";
import { FLOATER_MEDICLAIM_PREMIUMS } from "../../data/floater-mediclaim-data";
import FloaterMediclaimResults from "./FloaterMediclaimResults";
import MemberAgeInput from "./MemberAgeInput"; // Import the new component

const initialInputs = {
  sumInsured: "800000",
  zone: "Zone I",
  members: [
    { id: 1, age: "30", dob: "", inputType: "age", isGirl: false },
    { id: 2, age: "28", dob: "", inputType: "age", isGirl: false },
  ],
  policyTerm: "1",
  optionalCover1: false,
  optionalCover2: false,
  optionalCover3: false,
  optionalCover4: false,
  onlineDiscount: false,
  existingCustomerDiscount: false,
  medicalLoading: "0",
};

const FloaterMediclaimInputs = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const resultsRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setResults(null);
  };

  const handleMemberChange = (id, field, value) => {
    const newMembers = inputs.members.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    );
    setInputs((prev) => ({ ...prev, members: newMembers }));
    setResults(null);
  };

  const addMember = () => {
    if (inputs.members.length >= 6) {
      setError("Maximum of 6 members can be added.");
      return;
    }
    const newId =
      inputs.members.length > 0
        ? Math.max(...inputs.members.map((m) => m.id)) + 1
        : 1;
    setInputs((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { id: newId, age: "25", dob: "", inputType: "age", isGirl: false },
      ],
    }));
  };

  const removeMember = (id) => {
    if (inputs.members.length <= 2) {
      setError("Minimum of 2 members are required.");
      return;
    }
    setInputs((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }));
  };

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  const handleCalculate = () => {
    const {
      sumInsured,
      zone,
      adults,
      adult1Age,
      adult2Age,
      children,
      child1Age,
      child2Age,
      isGirlChild1,
      isGirlChild2,
      policyTerm,
      optionalCover1,
      optionalCover2,
      optionalCover3,
      optionalCover4,
      onlineDiscount,
      existingCustomerDiscount,
      medicalLoading,
    } = inputs;
    const si = parseInt(sumInsured);
    const numAdults = parseInt(adults);
    const numChildren = parseInt(children);
    const totalMembers = numAdults + numChildren;

    if (totalMembers < 2) {
      setError("This is a floater policy and requires a minimum of 2 members.");
      return;
    }
    if (totalMembers > 6) {
      setError("A maximum of 6 members can be covered in a single policy.");
      return;
    }
    setError("");

    const premiumDataByZone = FLOATER_MEDICLAIM_PREMIUMS[zone];
    if (!premiumDataByZone) {
      setError("Premium data not found for the selected zone.");
      return;
    }

    // Determine eldest member's age for base premium
    const ageList = [];
    if (numAdults >= 1) ageList.push(adult1Age);
    if (numAdults >= 2) ageList.push(adult2Age);
    const ageSlabs = Object.keys(FLOATER_MEDICLAIM_PREMIUMS["Zone I"]["1A"]);
    const eldestAge = ageList.sort(
      (a, b) => ageSlabs.indexOf(b) - ageSlabs.indexOf(a)
    )[0];

    let basePremium = 0;
    let childPremium = 0;
    let girlChildDiscount = 0;

    // Adult Premium based on eldest age
    if (numAdults > 0) {
      const adultPremiumKey = `${numAdults}A`;
      basePremium = premiumDataByZone[adultPremiumKey]?.[eldestAge]?.[si] || 0;
    }

    // Child Premium
    if (numChildren > 0) {
      childPremium =
        FLOATER_MEDICLAIM_PREMIUMS.children[numChildren]?.[si] || 0;
      const singleChildPremium =
        FLOATER_MEDICLAIM_PREMIUMS.children["1"]?.[si] || 0;
      if (isGirlChild1) girlChildDiscount += singleChildPremium * 0.05;
      if (isGirlChild2 && numChildren > 1)
        girlChildDiscount += singleChildPremium * 0.05;
    }

    let totalPremium = basePremium + childPremium;

    // Optional Covers
    let optionalCover1Premium = 0;
    if (optionalCover1) {
      const getOpt1Premium = (age) =>
        FLOATER_MEDICLAIM_PREMIUMS.optionalCover1[age]?.[si] || 0;
      if (numAdults >= 1) optionalCover1Premium += getOpt1Premium(adult1Age);
      if (numAdults >= 2) optionalCover1Premium += getOpt1Premium(adult2Age);
      if (numChildren >= 1) optionalCover1Premium += getOpt1Premium(child1Age);
      if (numChildren >= 2) optionalCover1Premium += getOpt1Premium(child2Age);
    }
    let optionalCover2Premium =
      optionalCover2 && si >= 500000
        ? FLOATER_MEDICLAIM_PREMIUMS.optionalCover2[si] || 0
        : 0;
    let optionalCover3Premium =
      optionalCover3 && si >= 800000
        ? FLOATER_MEDICLAIM_PREMIUMS.optionalCover3[si] || 0
        : 0;
    let optionalCover4Premium =
      optionalCover4 && si >= 800000
        ? FLOATER_MEDICLAIM_PREMIUMS.optionalCover4.premium * totalMembers
        : 0;

    totalPremium +=
      optionalCover1Premium +
      optionalCover2Premium +
      optionalCover3Premium +
      optionalCover4Premium;

    totalPremium -= girlChildDiscount;

    const loadingPercentage = parseFloat(medicalLoading) || 0;
    const medicalLoadingAmount = totalPremium * (loadingPercentage / 100);
    totalPremium += medicalLoadingAmount;

    let memberDiscountRate = 0;
    if (totalMembers === 2) memberDiscountRate = 0.05;
    else if (totalMembers === 3) memberDiscountRate = 0.1;
    else if (totalMembers >= 4) memberDiscountRate = 0.15;
    const memberDiscount = totalPremium * memberDiscountRate;
    totalPremium -= memberDiscount;

    const onlineDiscountAmount = onlineDiscount ? totalPremium * 0.1 : 0;
    const existingCustomerDiscountAmount = existingCustomerDiscount
      ? totalPremium * 0.05
      : 0;

    totalPremium -= onlineDiscountAmount + existingCustomerDiscountAmount;

    const termDiscountRate =
      policyTerm === "2" ? 0.05 : policyTerm === "3" ? 0.07 : 0;
    const singleYearPremium = totalPremium;
    const totalMultiYearPremium = singleYearPremium * parseInt(policyTerm);
    const termDiscount = totalMultiYearPremium * termDiscountRate;

    totalPremium = totalMultiYearPremium - termDiscount;

    const gstAmount = 0;
    const finalPremium = totalPremium + gstAmount;

    setResults({
      /* ... results object remains the same */
    });
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setResults(null);
    setError("");
  };

  return (
    <>
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Policy Details
        </h2>
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </p>
        )}

        {/* Policy Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zone
            </label>
            <select
              name="zone"
              value={inputs.zone}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Zone I">Zone I (Maharashtra & Gujarat)</option>
              <option value="Zone II">Zone II (Rest of India)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sum Insured (₹)
            </label>
            <select
              name="sumInsured"
              value={inputs.sumInsured}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              {[200000, 300000, 500000, 800000, 1000000, 1200000, 1500000].map(
                (si) => (
                  <option key={si} value={si}>
                    {si.toLocaleString("en-IN")}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Policy Term (Years)
            </label>
            <select
              name="policyTerm"
              value={inputs.policyTerm}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="1">1 Year</option>
              <option value="2">2 Years (5% Discount)</option>
              <option value="3">3 Years (7% Discount)</option>
            </select>
          </div>
        </div>

        {/* Member Details Section */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Member Details
          </h3>
          <div className="space-y-4">
            {inputs.members.map((member, index) => (
              <MemberAgeInput
                key={member.id}
                member={member}
                index={index}
                onMemberChange={handleMemberChange}
                onRemoveMember={removeMember}
                canRemove={inputs.members.length > 2}
              />
            ))}
          </div>
          {inputs.members.length < 6 && (
            <button
              onClick={addMember}
              className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              + Add Member
            </button>
          )}
        </div>

        {/* Optional Covers & Discounts */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Optional Covers, Loadings & Discounts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="optionalCover1"
                  name="optionalCover1"
                  type="checkbox"
                  checked={inputs.optionalCover1}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="optionalCover1"
                  className="ml-3 text-sm text-gray-700"
                >
                  No Proportionate Deduction
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="optionalCover2"
                  name="optionalCover2"
                  type="checkbox"
                  checked={inputs.optionalCover2}
                  onChange={handleInputChange}
                  disabled={parseInt(inputs.sumInsured) < 500000}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="optionalCover2"
                  className="ml-3 text-sm text-gray-700"
                >
                  Maternity Expenses Benefit{" "}
                  <span className="text-xs text-gray-500">(SI ≥ 5 Lakhs)</span>
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="optionalCover3"
                  name="optionalCover3"
                  type="checkbox"
                  checked={inputs.optionalCover3}
                  onChange={handleInputChange}
                  disabled={parseInt(inputs.sumInsured) < 800000}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="optionalCover3"
                  className="ml-3 text-sm text-gray-700"
                >
                  Revision in Cataract Limit{" "}
                  <span className="text-xs text-gray-500">(SI ≥ 8 Lakhs)</span>
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="optionalCover4"
                  name="optionalCover4"
                  type="checkbox"
                  checked={inputs.optionalCover4}
                  onChange={handleInputChange}
                  disabled={parseInt(inputs.sumInsured) < 800000}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="optionalCover4"
                  className="ml-3 text-sm text-gray-700"
                >
                  Non-Medical Items{" "}
                  <span className="text-xs text-gray-500">(SI ≥ 8 Lakhs)</span>
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="onlineDiscount"
                  name="onlineDiscount"
                  type="checkbox"
                  checked={inputs.onlineDiscount}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="onlineDiscount"
                  className="ml-3 text-sm text-gray-700"
                >
                  Online Purchase Discount (10%)
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="existingCustomerDiscount"
                  name="existingCustomerDiscount"
                  type="checkbox"
                  checked={inputs.existingCustomerDiscount}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="existingCustomerDiscount"
                  className="ml-3 text-sm text-gray-700"
                >
                  Existing NIACL Customer (5%)
                </label>
              </div>
            </div>
            {/* Medical Loading Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medical Loading (%)
              </label>
              <input
                name="medicalLoading"
                value={inputs.medicalLoading}
                onChange={handleInputChange}
                type="number"
                placeholder="e.g., 25"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Apply for adverse medical history.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Reset
          </button>
          <button onClick={handleCalculate} className="btn primary">
            Calculate Premium
          </button>
        </div>
      </div>

      <div ref={resultsRef}>
        {results && <FloaterMediclaimResults results={results} />}
      </div>
    </>
  );
};

export default FloaterMediclaimInputs;
