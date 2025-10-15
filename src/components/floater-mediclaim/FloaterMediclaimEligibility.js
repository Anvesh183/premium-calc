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
            <strong>Family Definition:</strong> The family consists of the
            insured, spouse, and up to two dependent children.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Salient Features
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>This is a long-term policy, available for 1, 2, or 3 years.</li>
          <li>
            Provides reimbursement of hospitalization expenses for
            illness/diseases or injury sustained.
          </li>
          <li>
            No medical examination is required for persons up to 50 years of age
            without any adverse medical history.
          </li>
          <li>
            Pre-acceptance medical check-up is required for persons over 50
            years or those with adverse medical history. 50% of the check-up
            cost is reimbursed if the proposal is accepted.
          </li>
          <li>
            Family discount of 5% on the total premium if more than one person
            is covered.
          </li>
          <li>
            Long-term policy discounts: 5% for a 2-year policy and 7.5% for a
            3-year policy on the total premium.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FloaterMediclaimEligibility;
