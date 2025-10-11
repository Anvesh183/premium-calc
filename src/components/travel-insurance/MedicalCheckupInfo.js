import React from "react";

const MedicalCheckupInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md-p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Pre-Acceptance Medical Checkup Rules
      </h2>
      <p className="mb-4 text-gray-600">
        A medical checkup is required in certain cases before the policy can be
        issued. The cost of the checkup is borne by the insured person.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            When is a medical checkup required?
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              <strong>
                Age &lt;= 60 Years with Pre-Existing Diseases (PED):
              </strong>{" "}
              Required
            </li>
            <li>
              <strong>Age &gt; 60 Years (with or without PED):</strong> Required
            </li>
            <li>
              <strong>Age &lt;= 60 Years without any PED:</strong> Not Required
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            What if the checkup is not done?
          </h3>
          <p className="mb-2 text-gray-600">
            If a required medical checkup is not completed, the maximum Sum
            Insured available will be restricted as follows:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              <strong>Age 61 to 70 Years:</strong> Max Sum Insured of $25,000
            </li>
            <li>
              <strong>Age 71 Years &amp; Above:</strong> The proposal will be
              declined.
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            What tests are required?
          </h3>
          <p className="text-gray-600">
            The required tests include an ECG Report, Chest X-Ray, Complete
            Blood Count (CBC), Fasting Blood Sugar, Routine Urine Analysis
            (RUA), and an Abdominal & Pelvic Ultrasound (USG). Other tests may
            be required by the company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalCheckupInfo;
