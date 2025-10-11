import React from "react";

const PlanDetails = () => {
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
              <th scope="col" className="px-6 py-3 text-center">
                Basic ($25k)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Economy ($50k)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Advanced ($100k)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Elite ($250k)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Supreme ($500k)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-white font-semibold text-gray-800">
              <td className="px-6 py-4">Medical Expenses</td>
              <td className="px-6 py-4 text-center">$25,000</td>
              <td className="px-6 py-4 text-center">$50,000</td>
              <td className="px-6 py-4 text-center">$100,000</td>
              <td className="px-6 py-4 text-center">$250,000</td>
              <td className="px-6 py-4 text-center">$500,000</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Deductible (Medical)</td>
              <td className="px-6 py-4 text-center" colSpan="5">
                $100
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">Hospital Cash (max 5 days)</td>
              <td className="px-6 py-4 text-center">N/A</td>
              <td className="px-6 py-4 text-center">N/A</td>
              <td className="px-6 py-4 text-center">$25/day</td>
              <td className="px-6 py-4 text-center">$50/day</td>
              <td className="px-6 py-4 text-center">$75/day</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Emergency Dental Care</td>
              <td className="px-6 py-4 text-center">$100</td>
              <td className="px-6 py-4 text-center">$200</td>
              <td className="px-6 py-4 text-center">$300</td>
              <td className="px-6 py-4 text-center">$400</td>
              <td className="px-6 py-4 text-center">$500</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">Personal Accident</td>
              <td className="px-6 py-4 text-center">$2,500</td>
              <td className="px-6 py-4 text-center">$5,000</td>
              <td className="px-6 py-4 text-center">$10,000</td>
              <td className="px-6 py-4 text-center">$25,000</td>
              <td className="px-6 py-4 text-center">$50,000</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Repatriation of Mortal Remains</td>
              <td className="px-6 py-4 text-center">$1,250</td>
              <td className="px-6 py-4 text-center">$2,500</td>
              <td className="px-6 py-4 text-center">$5,000</td>
              <td className="px-6 py-4 text-center">$12,500</td>
              <td className="px-6 py-4 text-center">$25,000</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">Loss of Checked-in Baggage</td>
              <td className="px-6 py-4 text-center">$300</td>
              <td className="px-6 py-4 text-center">$400</td>
              <td className="px-6 py-4 text-center">$600</td>
              <td className="px-6 py-4 text-center">$800</td>
              <td className="px-6 py-4 text-center">$1,000</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Delay in Baggage ({">"}12 hrs)</td>
              <td className="px-6 py-4 text-center">$25</td>
              <td className="px-6 py-4 text-center">$50</td>
              <td className="px-6 py-4 text-center">$100</td>
              <td className="px-6 py-4 text-center">$150</td>
              <td className="px-6 py-4 text-center">$200</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">Loss of Passport</td>
              <td className="px-6 py-4 text-center">$200</td>
              <td className="px-6 py-4 text-center">$200</td>
              <td className="px-6 py-4 text-center">$250</td>
              <td className="px-6 py-4 text-center">$300</td>
              <td className="px-6 py-4 text-center">$300</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Personal Liability</td>
              <td className="px-6 py-4 text-center">$12,500</td>
              <td className="px-6 py-4 text-center">$25,000</td>
              <td className="px-6 py-4 text-center">$50,000</td>
              <td className="px-6 py-4 text-center">$125,000</td>
              <td className="px-6 py-4 text-center">$250,000</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">Emergency Financial Assistance</td>
              <td className="px-6 py-4 text-center">$50</td>
              <td className="px-6 py-4 text-center">$100</td>
              <td className="px-6 py-4 text-center">$150</td>
              <td className="px-6 py-4 text-center">$200</td>
              <td className="px-6 py-4 text-center">$300</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Hijack Allowance ({">"}12 hrs)</td>
              <td className="px-6 py-4 text-center" colSpan="5">
                $100 per day (max 7 days)
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">Trip Cancellation</td>
              <td className="px-6 py-4 text-center">$200</td>
              <td className="px-6 py-4 text-center">$300</td>
              <td className="px-6 py-4 text-center">$400</td>
              <td className="px-6 py-4 text-center">$500</td>
              <td className="px-6 py-4 text-center">$750</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Missed Connection</td>
              <td className="px-6 py-4 text-center">$200</td>
              <td className="px-6 py-4 text-center">$300</td>
              <td className="px-6 py-4 text-center">$400</td>
              <td className="px-6 py-4 text-center">$500</td>
              <td className="px-6 py-4 text-center">$750</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanDetails;
