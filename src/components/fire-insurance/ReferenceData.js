import React from "react";

const ReferenceData = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        4. Reference Data
      </h2>
      {/* The grid-cols-1 and md:grid-cols-2 classes create the responsive 2-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Earthquake Loading */}
        <div>
          <p className="font-medium text-gray-700 mb-2">
            Earthquake Loading [Table-A]
          </p>
          <div className="overflow-x-auto rounded-md border responsive-table">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left">Zone</th>
                  <th className="px-2 py-2 text-left">Risk</th>
                  <th className="px-2 py-2 text-right">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-1" data-label="Zone">
                    I
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Non-Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.250
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Zone">
                    II
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Non-Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.150
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Zone">
                    III
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Non-Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.100
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Zone">
                    IV
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Non-Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.050
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-2 py-1" data-label="Zone">
                    I
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.500
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-2 py-1" data-label="Zone">
                    II
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.250
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-2 py-1" data-label="Zone">
                    III
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.100
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-2 py-1" data-label="Zone">
                    IV
                  </td>
                  <td className="px-2 py-1" data-label="Risk">
                    Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.050
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* STFI Loading */}
        <div>
          <p className="font-medium text-gray-700 mb-2">
            STFI Loading [Table-B]
          </p>
          <div className="overflow-x-auto rounded-md border responsive-table">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left">Risk</th>
                  <th className="px-2 py-2 text-right">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Non-Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.220
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.370
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Storage warehouses (closed)
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.520
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Storage warehouses (open)
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    2.250
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Roads, Bridges, Tunnels, Pipelines
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.520
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Railway / Metro Tracks
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.520
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    T&D / Cellular Network Lines
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.520
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Terrorism Loading */}
        <div>
          <p className="font-medium text-gray-700 mb-2">
            Terrorism Loading [Table-C]
          </p>
          <div className="overflow-x-auto rounded-md border responsive-table">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left">Risk</th>
                  <th className="px-2 py-2 text-right">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Residential
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.07
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Non-Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.13
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1" data-label="Risk">
                    Industrial
                  </td>
                  <td className="px-2 py-1 text-right" data-label="Rate">
                    0.21
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Note: Rates may differ if TSI &gt; 500 Crores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferenceData;
