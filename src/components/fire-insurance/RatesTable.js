import React, { useState, useEffect } from "react";

const RatesTable = ({ allRates, filteredRates, setFilteredRates }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  useEffect(() => {
    let rates = allRates;
    if (sectionFilter) {
      rates = rates.filter((rate) => rate.section === sectionFilter);
    }
    if (searchQuery) {
      rates = rates.filter(
        (rate) =>
          rate.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rate.code.includes(searchQuery)
      );
    }
    setFilteredRates(rates);
  }, [searchQuery, sectionFilter, allRates, setFilteredRates]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        1. Find Your Risk in the Master Rates Table
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="sectionFilter"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Filter by Section
          </label>
          <select
            id="sectionFilter"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700 shadow-sm"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          >
            <option value="">All Sections</option>
            <option value="III">III - Dwellings, Offices, etc.</option>
            <option value="IV">IV - Manufacturing Risks</option>
            <option value="V">V - Utilities</option>
            <option value="VI">VI - Storage Risks</option>
            <option value="VII">VII - Tank & Gas Holder Risks</option>
          </select>
        </div>
        <div className="flex-1 relative">
          <label
            htmlFor="searchInput"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Search by Description or Code
          </label>
          <input
            type="text"
            id="searchInput"
            placeholder="e.g., 'Hospital' or '2014'..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 top-6 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="table-responsive-container">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            <tr>
              <th scope="col" className="px-2 py-3">
                Section
              </th>
              <th scope="col" className="px-2 py-3">
                Code
              </th>
              <th scope="col" className="px-2 py-3">
                Occupancy Description
              </th>
              <th scope="col" className="px-2 py-3 text-center">
                US-Sookshma
                <br />
                (&lt;5 Cr)
              </th>
              <th scope="col" className="px-2 py-3 text-center">
                LU-Laghu (5-50 Cr) & SF-Std Fire(&gt;50 Cr)
              </th>
            </tr>
          </thead>
          <tbody id="ratesTableBody" className="divide-y divide-gray-200">
            {filteredRates.map((rate, index) => (
              <tr
                key={index}
                data-rate={JSON.stringify(rate)}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150`}
              >
                <td
                  data-label="Section"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {rate.section}
                </td>
                <td
                  data-label="Code"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {rate.code}
                </td>
                <td data-label="Description" className="px-6 py-4">
                  {rate.description}
                </td>
                <td data-label="US-Sookshma" className="px-6 py-4 text-center">
                  {rate.us_sookshma}
                </td>
                <td data-label="SF-Std Fire" className="px-6 py-4 text-center">
                  {rate.sf_std}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatesTable;
