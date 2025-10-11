import React from "react";

const OtherInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Other Important Information
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Change of Travel Itinerary
          </h3>
          <p className="text-gray-600">
            If you initially chose a "Worldwide Excluding USA & CANADA" plan,
            you can request to change it to "Including USA & CANADA." This is
            subject to advance payment of the premium difference and a
            declaration of any claims during the initial period.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Refund for Early Trip Completion
          </h3>
          <p className="text-gray-600">
            The brochure mentions a feature for "Refund for early trip
            completion," suggesting you may be eligible for a partial refund if
            you return from your trip earlier than planned. Please refer to the
            policy document for specific terms.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Policy Cancellation
          </h3>
          <p className="text-gray-600">
            The policy can be cancelled only if the journey is not undertaken.
            Proof, in the form of the insured person's passport, is required. A
            cancellation charge of Rs. 251 will be deducted.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Policy Extension
          </h3>
          <p className="text-gray-600">
            The policy period can be extended at the company's discretion for a
            maximum of 180 days. No extension will be considered if a claim has
            been reported during the initial policy period.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Medical Report Validity
          </h3>
          <p className="text-gray-600">
            Medical reports submitted for pre-acceptance checkups are valid for
            60 days prior to the commencement of the journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
