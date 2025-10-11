import React from "react";

const KeyConditions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Key Policy Conditions
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Proposal Form Disclosure
          </h3>
          <p className="text-gray-600">
            All questions in the proposal form must be answered truthfully. Any
            misrepresentation or non-disclosure of facts, such as adverse
            medical history, can render the entire policy null and void.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Premium Loading for Senior Citizens
          </h3>
          <p className="text-gray-600">
            For senior citizens, a loading on the base premium is applied:
          </p>
          <ul className="list-disc list-inside text-gray-600 pl-4">
            <li>
              <strong>71-75 Years:</strong> 50% loading on premium.
            </li>
            <li>
              <strong>76 Years & above:</strong> 100% loading on premium.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Pre-Existing Disease (PED) Claim Co-payment
          </h3>
          <p className="text-gray-600">
            While PED-related claims are excluded, if an admissible claim also
            includes expenses for a PED, the following co-payment will apply to
            the total claim amount if the costs cannot be separated:
          </p>
          <ul className="list-disc list-inside text-gray-600 pl-4">
            <li>
              <strong>Up to 60 years:</strong> 5% co-payment.
            </li>
            <li>
              <strong>61 years & above:</strong> 10% co-payment.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Sum Insured Limits for Senior Citizens
          </h3>
          <ul className="list-disc list-inside text-gray-600 pl-4">
            <li>
              <strong>Age 71 to 80 years:</strong> Maximum Sum Insured of
              $250,000, with a limit of $50,000 for any single incident.
            </li>
            <li>
              <strong>Age 81 years & above:</strong> Maximum Sum Insured of
              $50,000, with a limit of $20,000 for any single incident.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KeyConditions;
