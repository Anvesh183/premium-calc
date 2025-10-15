import React from "react";

const FloaterMediclaimCoverages = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Main Coverages
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            Room, Boarding, and Nursing Expenses up to 1% of the Sum Insured per
            day.
          </li>
          <li>ICU charges up to 2% of the Sum Insured per day.</li>
          <li>
            Surgeon, Anaesthetist, Medical Practitioner, Consultants,
            Specialists Fees.
          </li>
          <li>
            Expenses for Anaesthesia, Blood, Oxygen, Operation Theatre Charges,
            Medicines, etc.
          </li>
          <li>
            Emergency Ambulance charges up to a maximum of ₹2,500 per policy
            period.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Other Key Coverages
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong>Pre-Hospitalisation:</strong> Medical expenses incurred up
            to 30 days before the date of admission.
          </li>
          <li>
            <strong>Post-Hospitalisation:</strong> Medical expenses incurred up
            to 60 days after the date of discharge.
          </li>
          <li>
            <strong>Day Care Procedures:</strong> Covers specified medical
            procedures/surgeries that do not require 24-hour hospitalization.
          </li>
          <li>
            <strong>Cataract Surgery:</strong> Covered up to 10% of the Sum
            Insured, with a maximum limit of ₹1,00,000.
          </li>
          <li>
            <strong>Ayurvedic/Homeopathic/Unani Treatment:</strong> Covered up
            to 25% of the Sum Insured if treated in a government hospital.
          </li>
          <li>
            <strong>New Born Baby Cover:</strong> Covered from birth until
            policy expiry if the mother is insured for 24 continuous months.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FloaterMediclaimCoverages;
