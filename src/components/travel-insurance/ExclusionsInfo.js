import React from "react";

const ExclusionsInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Key Policy Exclusions
      </h2>
      <p className="mb-4 text-gray-600">
        This policy does not cover any loss or expenses resulting from the
        following. This list is indicative, not exhaustive. Please refer to the
        policy document for full details.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <strong>Any Pre-existing Condition (PED)</strong> and its
          complications.
        </li>
        <li>
          Traveling against the advice of a physician or for the purpose of
          receiving medical treatment.
        </li>
        <li>
          Being under the influence of drugs, alcohol, or other intoxicants.
        </li>
        <li>Participation in hazardous activities or sports.</li>
        <li>Pregnancy and any related conditions, including childbirth.</li>
        <li>Congenital anomalies and related complications.</li>
        <li>Serving in any branch of the armed forces.</li>
        <li>
          Treatment that could reasonably be delayed until return to India.
        </li>
        <li>Any form of vaccination or inoculation.</li>
        <li>Treatment received within the Republic of India.</li>
      </ul>
    </div>
  );
};

export default ExclusionsInfo;
