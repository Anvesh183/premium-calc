import React from "react";

const EligibilityInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Who Can Take This Policy?
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>Citizens of the Republic of India.</li>
        <li>
          Foreign nationals working in India with Indian employers or
          multinational companies, drawing a salary in Indian rupees, can be
          covered for travel to any country other than their country of origin.
        </li>
        <li>The policy is valid only if the journey commences from India.</li>
        <li>The proposer must be between the ages of 6 months and 90 years.</li>
        <li>
          Proposals for individuals aged 81 years and above require referral to
          the Head Office with all relevant medical records.
        </li>
        <li>
          For children below 5 years of age, the policy excludes treatment for
          specific illnesses like mumps, chickenpox, measles, etc.
        </li>
      </ul>
    </div>
  );
};

export default EligibilityInfo;
