import React from "react";

const FloaterMediclaimExclusions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Major Exclusions
      </h2>
      <p className="mb-4 text-gray-600">
        The company shall not be liable for the following. This list is
        indicative, not exhaustive.
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-700">
        <li>
          <strong>First 30 Days:</strong> Any disease contracted by the insured
          person during the first 30 days from the policy commencement date (not
          applicable on renewal or for accidents).
        </li>
        <li>
          <strong>Specific Diseases (24 Months):</strong> Expenses for specific
          illnesses like Cataract, Benign Prostatic Hypertrophy, Hysterectomy,
          Hernia, Piles, etc., are not covered for the first 24 months of
          continuous operation.
        </li>
        <li>
          <strong>Pre-Existing Diseases:</strong> Any pre-existing condition is
          not covered for the first 36 months (3 years) of continuous insurance.
        </li>
        <li>
          <strong>General Exclusions:</strong> Injury or disease directly or
          indirectly caused by or arising from war, invasion, or nuclear
          weapons.
        </li>
        <li>
          <strong>Circumcision, cosmetic or aesthetic treatments,</strong>{" "}
          plastic surgery unless required for reconstruction following an
          accident.
        </li>
        <li>
          <strong>Cost of spectacles, contact lenses, and hearing aids.</strong>
        </li>
        <li>
          <strong>Dental treatment or surgery</strong> of any kind, unless
          requiring hospitalization due to an accident.
        </li>
        <li>
          <strong>
            Convalescence, general debility, 'Run-down' condition,
          </strong>{" "}
          rest cure, and expenses related to obesity treatment.
        </li>
        <li>
          <strong>Naturopathy treatment.</strong>
        </li>
      </ul>
    </div>
  );
};

export default FloaterMediclaimExclusions;
