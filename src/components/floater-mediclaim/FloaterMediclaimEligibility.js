import React from "react";

const FloaterMediclaimEligibility = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Eligibility
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong>Entry Age:</strong> Available to persons from 18 to 65
            years.
          </li>
          <li>
            <strong>Children:</strong> Covered from 3 months up to 25 years if
            financially dependent on parents, provided at least one parent is
            covered simultaneously.
          </li>
          <li>
            <strong>Dependents:</strong> The upper age limit does not apply to
            unmarried daughters or mentally challenged children.
          </li>
          <li>
            <strong>Continuity:</strong> Persons beyond 65 years can continue
            the policy if it is renewed without any break.
          </li>
          <li>
            <strong>Family Definition:</strong> You can cover yourself, your
            spouse, dependent children, dependent parents, dependent siblings,
            and wards under a single policy. A minimum of two members is
            required.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Salient Features & Discounts
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong>Long-Term Policy:</strong> Available for 1, 2, or 3-year
            terms with attractive discounts.
          </li>
          <li>
            <strong>Cumulative Bonus:</strong> Get a 25% increase in Sum Insured
            for each claim-free year, up to a maximum of 50%.
          </li>
          <li>
            <strong>Family Discount:</strong> 5% for 2 members, 10% for 3
            members, and 15% for 4 or more members.
          </li>
          <li>
            <strong>Long-Term Discounts:</strong> 5% for a 2-year policy and 7%
            for a 3-year policy.
          </li>
          <li>
            <strong>Digital Discount:</strong> A 10% discount is available for
            policies purchased online.
          </li>
          <li>
            <strong>Mid-term Additions:</strong> Flexibility to add a newly
            married spouse or a newborn baby (after 3 months) during the policy
            term on a pro-rata premium basis.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Pre-acceptance Medical Check-up
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            Required for all members aged 51 and above who are taking the policy
            for the first time.
          </li>
          <li>
            Required for individuals with an adverse medical history,
            irrespective of age.
          </li>
          <li>
            If the proposal is accepted, 50% of the check-up cost will be
            reimbursed.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FloaterMediclaimEligibility;
