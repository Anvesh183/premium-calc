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
            Emergency Ambulance charges up to a maximum of 1% of the Sum Insured
            per event.
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
            Insured, with a maximum limit of ₹50,000 per eye.
          </li>
          <li>
            <strong>AYUSH Treatment:</strong> Covered up to 100% of the Sum
            Insured if treated in a government hospital.
          </li>
          <li>
            <strong>New Born Baby Cover:</strong> Covered from birth until
            policy expiry if the mother is insured for 24 continuous months.
          </li>
          <li>
            <strong>Hospital Cash:</strong> 0.1% of Sum Insured per day of
            hospitalization.
          </li>
          <li>
            <strong>Critical Care Benefit:</strong> 10% of the Sum Insured is
            paid as an additional benefit for specified critical illnesses.
          </li>
          <li>
            <strong>Organ Transplant:</strong> Covers the donor's
            hospitalization expenses.
          </li>
          <li>
            <strong>Dental Treatment:</strong> Covers inpatient dental treatment
            required due to an accident or illness.
          </li>
          <li>
            <strong>Modern Treatments:</strong> A range of modern treatments
            like robotic surgeries and immunotherapy are covered up to specified
            sub-limits.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FloaterMediclaimCoverages;
