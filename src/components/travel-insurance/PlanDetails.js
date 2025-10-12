import React from "react";
import { PLAN_BENEFITS, PLAN_ORDER } from "../../data/travel-plan-benefits";

const benefitRows = [
  { key: "Medical Expenses", label: "Medical Expenses" },
  { key: "Hospital Cash", label: "Hospital Cash (max 5 days)" },
  { key: "Emergency Dental Care", label: "Emergency Dental Care" },
  { key: "Personal Accident", label: "Personal Accident" },
  { key: "Loss of Checked-in Baggage", label: "Loss of Checked-in Baggage" },
  { key: "Trip Cancellation", label: "Trip Cancellation" },
];

const PlanDetails = () => {
  const formatBenefit = (value) => {
    if (typeof value === "number") {
      return `$${value.toLocaleString()}`;
    }
    return value;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Plan Options and Table of Benefits (in USD)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Coverage
              </th>
              {PLAN_ORDER.map((sumInsured) => (
                <th
                  key={sumInsured}
                  scope="col"
                  className="px-6 py-3 text-center"
                >
                  {PLAN_BENEFITS[sumInsured].name} ($
                  {parseInt(sumInsured).toLocaleString()})
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {benefitRows.map((row, index) => (
              <tr
                key={row.key}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4">{row.label}</td>
                {PLAN_ORDER.map((sumInsured) => (
                  <td key={sumInsured} className="px-6 py-4 text-center">
                    {formatBenefit(PLAN_BENEFITS[sumInsured].benefits[row.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanDetails;
