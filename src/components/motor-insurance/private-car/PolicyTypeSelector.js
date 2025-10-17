import React from "react";

const PolicyTypeSelector = ({ policyType, setPolicyType }) => {
  return (
    <div className="mb-8">
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        Select Policy Type
      </label>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setPolicyType("package")}
          className={`btn ${policyType === "package" ? "primary" : ""}`}
        >
          Package Policy
        </button>
        <button
          onClick={() => setPolicyType("liability")}
          className={`btn ${policyType === "liability" ? "primary" : ""}`}
        >
          Liability Only
        </button>
        <button
          onClick={() => setPolicyType("od")}
          className={`btn ${policyType === "od" ? "primary" : ""}`}
        >
          Own Damage Only
        </button>
      </div>
      {policyType === "od" && (
        <p className="text-xs text-amber-700 mt-2 p-2 bg-amber-100 rounded-md">
          <strong>Note:</strong> A Standalone Own Damage policy requires an
          existing and valid Third Party Liability policy.
        </p>
      )}
    </div>
  );
};

export default PolicyTypeSelector;
