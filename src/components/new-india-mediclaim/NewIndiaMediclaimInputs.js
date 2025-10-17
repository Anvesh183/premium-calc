import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { MEDICLAIM_OPTIONAL_COVERS as optionalCoverData } from "../../data/new-india-mediclaim-data";
import NewIndiaMediclaimResults from "./NewIndiaMediclaimResults";
import MemberInput from "./MemberInput";

// --- initialInputs and insuranceFacts constants remain the same ---

const initialInputs = {
  zone: "Zone I",
  members: [
    {
      id: 1,
      age: "30",
      dob: "",
      inputType: "age",
      sumInsured: "800000",
      optionalCover1: false,
      optionalCover2: false,
      optionalCover3: false,
      optionalCover4: false, // Co-pay
      optionalCover5: false,
    },
  ],
  policyTerm: "1",
};

const insuranceFacts = [
  "The earliest form of insurance is thought to have originated in ancient China, where merchants would distribute their goods across several boats to limit loss.",
  "The first life insurance policy was issued in London in 1583.",
  "In the 17th century, Lloyd's of London started as a coffee house where sailors, merchants, and shipowners gathered to discuss insurance deals.",
  "An 'insurable interest' means you can only insure something if its loss or damage would cause you a financial or other kind of loss.",
  "The most expensive single item ever insured is the Hubble Space Telescope.",
];

const NewIndiaMediclaimInputs = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [premiumData, setPremiumData] = useState(null);
  const [fact, setFact] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    setFact(insuranceFacts[Math.floor(Math.random() * insuranceFacts.length)]);

    const fetchPremiums = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("mediclaim_premiums")
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

  const handleMemberChange = (id, updates) => {
    let newMembers = inputs.members.map((m) =>
      m.id === id ? { ...m, ...updates } : m
    );

    if (updates.dob) {
      const dob = new Date(updates.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      newMembers = newMembers.map((m) =>
        m.id === id ? { ...m, age: age.toString() } : m
      );
    }

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
          sumInsured: "500000",
          optionalCover1: false,
          optionalCover2: false,
          optionalCover3: false,
          optionalCover4: false,
          optionalCover5: false,
        },
      ],
    }));
  };

  const removeMember = (id) => {
    if (inputs.members.length <= 1) {
      setError("Minimum of 1 member is required.");
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

  const getAgeBand = (age) => {
    if (age <= 35) return "Upto 35";
    if (age <= 45) return "36-45";
    if (age <= 50) return "46-50";
    if (age <= 55) return "51-55";
    if (age <= 60) return "56-60";
    if (age <= 65) return "61-65";
    return ">65";
  };

  const getAgeBandForOptionalCover3 = (age) => {
    if (age < 50) return "<50";
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

    const { zone, members, policyTerm } = inputs;

    if (members.length > 6) {
      setError("A maximum of 6 members can be covered in a single policy.");
      return;
    }
    setError("");

    const memberWisePremiums = [];
    let totalGrossPremium = 0;

    for (const member of members) {
      const age = parseInt(member.age, 10);
      const si = parseInt(member.sumInsured, 10);

      if (isNaN(age) || age < 0 || age > 100) {
        setError(
          `Invalid age: ${member.age}. Please enter a valid age for all members.`
        );
        return;
      }

      const zoneForLookup = zone === "Zone I" ? "Zone 1" : "Zone 2";
      const rate = premiumData.find(
        (p) =>
          p.age === age &&
          p.sum_insured === si &&
          p.zone.trim() === zoneForLookup
      );

      if (!rate) {
        setError(
          `A premium could not be found for a member with age ${age}, SI ₹${si.toLocaleString(
            "en-IN"
          )} in ${zone}.`
        );
        return;
      }

      const basePremium = rate.premium;

      const optionalCover1Premium = member.optionalCover1
        ? optionalCoverData.optionalCover1[getAgeBand(age)]?.[si] || 0
        : 0;

      const optionalCover2Premium =
        member.optionalCover2 && si >= 500000
          ? optionalCoverData.optionalCover2[si] || 0
          : 0;

      const optionalCover3Premium =
        member.optionalCover3 && si >= 800000
          ? optionalCoverData.optionalCover3[
              getAgeBandForOptionalCover3(age)
            ]?.[si] || 0
          : 0;

      const optionalCover5Premium =
        member.optionalCover5 && si >= 800000
          ? optionalCoverData.optionalCover5.premium
          : 0;

      const totalOptionalPremiums =
        optionalCover1Premium +
        optionalCover2Premium +
        optionalCover3Premium +
        optionalCover5Premium;
      let memberTotalPremium = basePremium + totalOptionalPremiums;

      const coPayDiscount = member.optionalCover4
        ? memberTotalPremium * 0.15
        : 0;
      memberTotalPremium -= coPayDiscount;

      memberWisePremiums.push({
        ...member,
        basePremium,
        optionalCover1Premium,
        optionalCover2Premium,
        optionalCover3Premium,
        optionalCover5Premium,
        coPayDiscount,
        totalPremium: memberTotalPremium,
      });

      totalGrossPremium += memberTotalPremium;
    }

    const premiumForOneYear = totalGrossPremium;

    const totalMultiYearPremium = premiumForOneYear * parseInt(policyTerm, 10);

    let termDiscountRate = 0;
    if (policyTerm === "2") termDiscountRate = 0.04;
    if (policyTerm === "3") termDiscountRate = 0.075;
    const termDiscount = totalMultiYearPremium * termDiscountRate;

    const finalPremium = totalMultiYearPremium - termDiscount;

    setResults({
      ...inputs,
      totalGrossPremium,
      familyDiscount: 0,
      onlineDiscount: 0,
      termDiscount,
      finalPremium,
      memberWisePremiums,
    });
  };

  if (loading) {
    return (
      <div className="card text-center p-8">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Connecting to the database...
        </h2>
        <p className="text-sm text-gray-500 italic">
          <strong>Did you know?</strong> {fact}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
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
              Policy Term (Years)
            </label>
            <select
              name="policyTerm"
              value={inputs.policyTerm}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="1">1 Year</option>
              <option value="2">2 Years (4% Discount)</option>
              <option value="3">3 Years (7.5% Discount)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Member Details
          </h3>
          <div className="space-y-4">
            {inputs.members.map((member, index) => (
              <MemberInput
                key={member.id}
                member={member}
                index={index}
                onMemberChange={handleMemberChange}
                onRemoveMember={removeMember}
                canRemove={inputs.members.length > 1}
              />
            ))}
          </div>
        </div>
        {inputs.members.length < 6 && (
          <button
            onClick={addMember}
            className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-700"
          >
            + Add Member
          </button>
        )}

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
        {results && <NewIndiaMediclaimResults results={results} />}
      </div>
    </>
  );
};

export default NewIndiaMediclaimInputs;
