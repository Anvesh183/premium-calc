import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // Make sure this path is correct
import { FLOATER_MEDICLAIM_PREMIUMS as optionalCoverData } from "../../data/floater-mediclaim-data";
import FloaterMediclaimResults from "./FloaterMediclaimResults";
import MemberAgeInput from "./MemberAgeInput";

const initialInputs = {
  sumInsured: "500000",
  zone: "Zone I",
  members: [
    {
      id: 1,
      age: "30",
      dob: "",
      inputType: "age",
      optionalCover1: false,
      optionalCover2: false,
      optionalCover3: false,
      optionalCover4: false,
    },
    {
      id: 2,
      age: "28",
      dob: "",
      inputType: "age",
      optionalCover1: false,
      optionalCover2: false,
      optionalCover3: false,
      optionalCover4: false,
    },
  ],
  policyTerm: "1",
  onlineDiscount: false,
  medicalLoading: "0",
};

const FloaterMediclaimInputs = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [premiumData, setPremiumData] = useState(null);
  const resultsRef = useRef(null);

  // Fetch all premium data from Supabase on component mount
  useEffect(() => {
    const fetchPremiums = async () => {
      setLoading(true);
      // Query the table directly from the public schema
      const { data, error } = await supabase
        .from("floater_mediclaim_premiums")
        .select("age, sum_insured, zone, premium");

      if (error) {
        console.error("Error fetching premiums:", error);
        setError("Could not load premium data from the database.");
      } else {
        setPremiumData(data);
      }
      setLoading(false);
    };
    fetchPremiums();
  }, []);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

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
        {
          id: newId,
          age: "25",
          dob: "",
          inputType: "age",
          optionalCover1: false,
          optionalCover2: false,
          optionalCover3: false,
          optionalCover4: false,
        },
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

  const handleReset = () => {
    setInputs(initialInputs);
    setResults(null);
    setError("");
  };

  const getAgeBandForOptionalCover1 = (age) => {
    if (age <= 35) return "Upto 35";
    if (age <= 45) return "36-45";
    if (age <= 50) return "46-50";
    if (age <= 55) return "51-55";
    if (age <= 60) return "56-60";
    if (age <= 65) return "61-65";
    return ">65";
  };

  const handleCalculate = () => {
    if (loading || !premiumData) {
      setError("Premium data is still loading. Please wait.");
      return;
    }

    const {
      sumInsured,
      zone,
      members,
      policyTerm,
      onlineDiscount,
      medicalLoading,
    } = inputs;
    const si = parseInt(sumInsured);
    const totalMembers = members.length;

    if (totalMembers < 2) {
      setError("This is a floater policy and requires a minimum of 2 members.");
      return;
    }
    if (totalMembers > 6) {
      setError("A maximum of 6 members can be covered in a single policy.");
      return;
    }
    setError("");

    let totalBasePremium = 0;
    const zoneForLookup = zone === "Zone I" ? "Zone 1" : "Zone 2";
    const memberWisePremiums = [];

    for (const member of members) {
      const age = parseInt(member.age, 10);
      if (isNaN(age) || age < 0 || age > 100) {
        setError(
          `Invalid age: ${member.age}. Please enter a valid age for all members.`
        );
        return;
      }
      const rate = premiumData.find(
        (p) =>
          p.age === age &&
          p.sum_insured === si &&
          p.zone.trim() === zoneForLookup
      );
      if (!rate) {
        setError(
          `A premium could not be found for a member with age ${age} in ${zone} for the selected Sum Insured.`
        );
        return;
      }
      const basePremiumForMember = rate.premium;
      totalBasePremium += basePremiumForMember;

      let optionalCover1ForMember = 0;
      if (member.optionalCover1) {
        const ageBand = getAgeBandForOptionalCover1(age);
        optionalCover1ForMember =
          optionalCoverData.optionalCover1[ageBand]?.[si] || 0;
      }

      const optionalCover2ForMember =
        member.optionalCover2 && si >= 500000
          ? optionalCoverData.optionalCover2[si] || 0
          : 0;
      const optionalCover3ForMember =
        member.optionalCover3 && si >= 800000
          ? optionalCoverData.optionalCover3[si] || 0
          : 0;
      const optionalCover4ForMember =
        member.optionalCover4 && si >= 800000
          ? optionalCoverData.optionalCover4.premium
          : 0;

      memberWisePremiums.push({
        ...member,
        basePremium: basePremiumForMember,
        optionalCover1Premium: optionalCover1ForMember,
        optionalCover2Premium: optionalCover2ForMember,
        optionalCover3Premium: optionalCover3ForMember,
        optionalCover4Premium: optionalCover4ForMember,
        totalPremium:
          basePremiumForMember +
          optionalCover1ForMember +
          optionalCover2ForMember +
          optionalCover3ForMember +
          optionalCover4ForMember,
      });
    }

    let totalPremium = memberWisePremiums.reduce(
      (acc, member) => acc + member.totalPremium,
      0
    );

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
    totalPremium -= onlineDiscountAmount;

    const termDiscountRate =
      policyTerm === "2" ? 0.05 : policyTerm === "3" ? 0.07 : 0;
    const totalMultiYearPremium = totalPremium * parseInt(policyTerm);
    const termDiscount = totalMultiYearPremium * termDiscountRate;
    totalPremium = totalMultiYearPremium - termDiscount;

    const gstAmount = 0;
    const finalPremium = totalPremium + gstAmount;

    setResults({
      ...inputs,
      totalMembers,
      basePremium: totalBasePremium,
      memberWisePremiums,
      memberDiscountRate: memberDiscountRate * 100,
      memberDiscount,
      onlineDiscount: onlineDiscountAmount,
      termDiscount,
      medicalLoading: medicalLoadingAmount,
      premiumBeforeGst: totalPremium,
      gstAmount,
      finalPremium,
    });
  };

  if (loading) {
    return (
      <div className="card text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Premium Data...
        </h2>
        <p className="text-gray-500">
          Connecting to the database, please wait.
        </p>
      </div>
    );
  }

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
            {inputs.zone === "Zone II" && (
              <p className="text-xs text-amber-700 mt-2 p-2 bg-amber-100 rounded-md">
                <strong>Note:</strong> A 20% co-payment will apply to claims for
                treatment taken in Zone I cities (Maharashtra & Gujarat).
              </p>
            )}
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
                sumInsured={inputs.sumInsured}
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
