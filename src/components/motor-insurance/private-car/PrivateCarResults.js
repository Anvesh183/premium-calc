import React from "react";

const PrivateCarResults = ({ results, policyType, duration }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="card mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Premium Breakup ({duration}-Year Policy)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Liability Section */}
        {policyType !== "od" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-2">
              Liability Premium
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Basic Third Party:</p>{" "}
                <p>{formatCurrency(results.tpRate)}</p>
              </div>
              <div className="flex justify-between">
                <p>PA for Owner-Driver:</p>{" "}
                <p>{formatCurrency(results.paPremium)}</p>
              </div>
              <div className="flex justify-between">
                <p>LL to Paid Driver:</p>{" "}
                <p>{formatCurrency(results.llPremium)}</p>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <p>Total Liability (A):</p>{" "}
                <p>{formatCurrency(results.totalLiabilityPremium)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Own Damage Section */}
        {policyType !== "liability" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-2">
              Own Damage Premium
            </h3>
            <div className="space-y-2">
              {duration === "3" ? (
                <>
                  <div className="flex justify-between font-semibold">
                    <p>Long Term Package Premium:</p>{" "}
                    <p>{formatCurrency(results.basicOD)}</p>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Package includes: Base OD + Nil Dep{" "}
                    {results.longTermPackage !== "basic" && "+ Engine Protect"}{" "}
                    {results.longTermPackage === "elite" && "+ RTI"}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <p>Basic OD Premium:</p>{" "}
                    <p>{formatCurrency(results.basicOD)}</p>
                  </div>
                  {results.paydDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Pay As You Drive Discount:</p>{" "}
                      <p>- {formatCurrency(results.paydDiscount)}</p>
                    </div>
                  )}
                  <div className="flex justify-between text-green-600">
                    <p>NCB Discount:</p>{" "}
                    <p>- {formatCurrency(results.ncbDiscount)}</p>
                  </div>
                  {results.odDiscountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Special Discount on OD:</p>{" "}
                      <p>- {formatCurrency(results.odDiscountAmount)}</p>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold">
                    <p>OD after Discounts:</p>{" "}
                    <p>{formatCurrency(results.odPremiumAfterNCB)}</p>
                  </div>
                </>
              )}

              {results.electricalFittingsPremium > 0 && (
                <div className="flex justify-between">
                  <p>Electrical Fittings:</p>{" "}
                  <p>+ {formatCurrency(results.electricalFittingsPremium)}</p>
                </div>
              )}
              {results.cngLpgKitPremium > 0 && (
                <div className="flex justify-between">
                  <p>CNG/LPG Kit:</p>{" "}
                  <p>+ {formatCurrency(results.cngLpgKitPremium)}</p>
                </div>
              )}
              {results.keyProtectPremium > 0 && (
                <div className="flex justify-between">
                  <p>Key Protection:</p>{" "}
                  <p>+ {formatCurrency(results.keyProtectPremium)}</p>
                </div>
              )}
              {results.personalBelongingsPremium > 0 && (
                <div className="flex justify-between">
                  <p>Personal Belongings:</p>{" "}
                  <p>+ {formatCurrency(results.personalBelongingsPremium)}</p>
                </div>
              )}
              {results.lossOfContentsPremium > 0 && (
                <div className="flex justify-between">
                  <p>Loss of Contents:</p>{" "}
                  <p>+ {formatCurrency(results.lossOfContentsPremium)}</p>
                </div>
              )}
              {results.additionalTowingPremium > 0 && (
                <div className="flex justify-between">
                  <p>Additional Towing:</p>{" "}
                  <p>+ {formatCurrency(results.additionalTowingPremium)}</p>
                </div>
              )}
              {results.nilDepPremium > 0 && (
                <div className="flex justify-between">
                  <p>Nil Depreciation:</p>{" "}
                  <p>+ {formatCurrency(results.nilDepPremium)}</p>
                </div>
              )}
              {results.rtiPremium > 0 && (
                <div className="flex justify-between">
                  <p>Return to Invoice:</p>{" "}
                  <p>+ {formatCurrency(results.rtiPremium)}</p>
                </div>
              )}
              {results.ncbProtectPremium > 0 && (
                <div className="flex justify-between">
                  <p>NCB Protection:</p>{" "}
                  <p>+ {formatCurrency(results.ncbProtectPremium)}</p>
                </div>
              )}
              {results.engineProtectPremium > 0 && (
                <div className="flex justify-between">
                  <p>Engine Protection:</p>{" "}
                  <p>+ {formatCurrency(results.engineProtectPremium)}</p>
                </div>
              )}
              {results.batteryProtectPremium > 0 && (
                <div className="flex justify-between">
                  <p>Battery Protection:</p>{" "}
                  <p>+ {formatCurrency(results.batteryProtectPremium)}</p>
                </div>
              )}
              {results.consumablesPremium > 0 && (
                <div className="flex justify-between">
                  <p>Consumables:</p>{" "}
                  <p>+ {formatCurrency(results.consumablesPremium)}</p>
                </div>
              )}
              {results.tyreProtectPremium > 0 && (
                <div className="flex justify-between">
                  <p>Tyre & Alloy Protect:</p>{" "}
                  <p>+ {formatCurrency(results.tyreProtectPremium)}</p>
                </div>
              )}
              {results.rsaPremium > 0 && (
                <div className="flex justify-between">
                  <p>Roadside Assistance:</p>{" "}
                  <p>+ {formatCurrency(results.rsaPremium)}</p>
                </div>
              )}

              <div className="flex justify-between font-bold border-t pt-2">
                <p>Total Own Damage (B):</p>{" "}
                <p>{formatCurrency(results.totalODPremium)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final Calculation */}
      <div className="mt-8 border-t pt-4 space-y-3">
        <div className="flex justify-between text-xl font-semibold">
          <p>Total Premium (A + B):</p>
          <p>{formatCurrency(results.totalPremium)}</p>
        </div>
        <div className="flex justify-between text-xl font-semibold">
          <p>GST (18%):</p>
          <p>{formatCurrency(results.gst)}</p>
        </div>
        <div className="flex justify-between text-2xl font-bold text-teal-600 mt-2 border-t pt-2">
          <p>Final Payable Premium:</p>
          <p>{formatCurrency(results.finalPremium)}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivateCarResults;
