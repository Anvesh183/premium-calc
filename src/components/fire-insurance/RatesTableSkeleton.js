import React from "react";
import Skeleton from "../common/Skeleton";

const RatesTableSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        <Skeleton className="h-8 w-3/4" />
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-1/4 mb-1" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="flex-1 relative">
          <Skeleton className="h-6 w-1/2 mb-1" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <div className="table-responsive-container">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} scope="col" className="px-2 py-3">
                  <Skeleton className="h-4 w-full" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(10)].map((_, i) => (
              <tr
                key={i}
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                {[...Array(5)].map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <Skeleton className="h-4 w-full" />
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

export default RatesTableSkeleton;
