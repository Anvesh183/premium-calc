import React from "react";

const FloaterMediclaimResults = ({ results }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Premium Calculation Results
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <p>Base Premium (Adults):</p>
          <p>{formatCurrency(results.basePremium)}</p>
        </div>
        {results.childPremium > 0 && (
          <div className="flex justify-between">
            <p>Child Premium:</p>
            <p>{formatCurrency(results.childPremium)}</p>
          </div>
        )}
        {results.optionalCover1Premium > 0 && (
          <div className="flex justify-between">
            <p>Optional Cover I:</p>
            <p>{formatCurrency(results.optionalCover1Premium)}</p>
          </div>
        )}
        {results.optionalCover2Premium > 0 && (
          <div className="flex justify-between">
            <p>Optional Cover II (Maternity):</p>
            <p>{formatCurrency(results.optionalCover2Premium)}</p>
          </div>
        )}
        {results.optionalCover3Premium > 0 && (
          <div className="flex justify-between">
            <p>Optional Cover III (Cataract):</p>
            <p>{formatCurrency(results.optionalCover3Premium)}</p>
          </div>
        )}
        {results.optionalCover4Premium > 0 && (
          <div className="flex justify-between">
            <p>Optional Cover IV (Consumables):</p>
            <p>{formatCurrency(results.optionalCover4Premium)}</p>
          </div>
        )}

        <div className="border-t pt-3 mt-3">
          {results.girlChildDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <p>Girl Child Discount (5%):</p>
              <p>- {formatCurrency(results.girlChildDiscount)}</p>
            </div>
          )}

          {results.medicalLoading > 0 && (
            <div className="flex justify-between text-red-600">
              <p>Medical Loading ({results.medicalLoading}%):</p>
              <p>+ {formatCurrency(results.medicalLoading)}</p>
            </div>
          )}

          {results.memberDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <p>
                Member Discount ({results.memberDiscountRate}% for{" "}
                {results.totalMembers} members):
              </p>
              <p>- {formatCurrency(results.memberDiscount)}</p>
            </div>
          )}
          {results.onlineDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <p>Online Purchase Discount (10%):</p>
              <p>- {formatCurrency(results.onlineDiscount)}</p>
            </div>
          )}
          {results.existingCustomerDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <p>Existing Customer Discount (5%):</p>
              <p>- {formatCurrency(results.existingCustomerDiscount)}</p>
            </div>
          )}
          {results.termDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <p>
                Long Term Discount ({results.policyTerm === "2" ? "5%" : "7%"}{" "}
                for {results.policyTerm} years):
              </p>
              <p>- {formatCurrency(results.termDiscount)}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between font-bold border-t pt-3 mt-3">
          <p>Premium before GST:</p>
          <p className="text-xl">{formatCurrency(results.premiumBeforeGst)}</p>
        </div>
        <div className="flex justify-between">
          <p>GST (0%):</p>
          <p className="font-semibold">{formatCurrency(results.gstAmount)}</p>
        </div>
        <div className="flex justify-between items-center border-t pt-3 mt-3">
          <p className="text-gray-800 font-bold text-xl">
            Final Total Premium:
          </p>
          <p className="font-bold text-2xl text-teal-600">
            {formatCurrency(results.finalPremium)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloaterMediclaimResults;
