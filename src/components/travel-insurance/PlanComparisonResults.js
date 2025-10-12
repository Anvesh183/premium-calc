import React from "react";
import { PLAN_BENEFITS, PLAN_ORDER } from "../../data/travel-plan-benefits";
import { TRAVEL_PREMIUMS } from "../../data/travel-data";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const formatBenefitValue = (value) => {
  if (typeof value === "number") {
    return `$${value.toLocaleString()}`;
  }
  return value;
};

// This helper function will calculate the premium for a given set of inputs
const calculatePremiumForPlan = (
  sumInsured,
  travellers,
  duration,
  destination,
  discount
) => {
  let totalBasePremium = 0;
  const durationNum = parseInt(duration, 10);

  for (const traveller of travellers) {
    let premiumAgeBand = traveller.age;
    if (["71-75", "76-90"].includes(traveller.age)) {
      premiumAgeBand = "61-70";
    }

    const premiumData = TRAVEL_PREMIUMS[destination]?.[sumInsured]?.[
      premiumAgeBand
    ]?.find((p) => p.days >= durationNum);
    if (!premiumData) return null; // Premium not available for this combination

    let basePremium = premiumData.premium;
    let ageLoading = 0;
    if (traveller.age === "71-75") ageLoading = basePremium * 0.5;
    if (traveller.age === "76-90") ageLoading = basePremium * 1.0;

    totalBasePremium += basePremium + ageLoading;
  }

  const discountAmount = totalBasePremium * (parseFloat(discount) / 100);
  const premiumAfterDiscount = totalBasePremium - discountAmount;
  const gstAmount = premiumAfterDiscount * 0.18;
  return premiumAfterDiscount + gstAmount;
};

const PlanComparisonResults = ({ results, travellers, inputs }) => {
  const currentSumInsured = travellers[0].sumInsured; // Assuming all travellers have the same SI
  const currentIndex = PLAN_ORDER.indexOf(currentSumInsured);

  const lowerPlanKey = currentIndex > 0 ? PLAN_ORDER[currentIndex - 1] : null;
  const higherPlanKey =
    currentIndex < PLAN_ORDER.length - 1 ? PLAN_ORDER[currentIndex + 1] : null;

  const lowerPlanPremium = lowerPlanKey
    ? calculatePremiumForPlan(
        lowerPlanKey,
        travellers,
        inputs.duration,
        inputs.destination,
        inputs.discount
      )
    : null;
  const higherPlanPremium = higherPlanKey
    ? calculatePremiumForPlan(
        higherPlanKey,
        travellers,
        inputs.duration,
        inputs.destination,
        inputs.discount
      )
    : null;

  const currentPlan = PLAN_BENEFITS[currentSumInsured];

  const getBenefitChanges = (otherPlanSumInsured) => {
    if (!otherPlanSumInsured) return [];
    const otherPlan = PLAN_BENEFITS[otherPlanSumInsured];
    const changes = [];

    for (const key in currentPlan.benefits) {
      const currentValue = currentPlan.benefits[key];
      const otherValue = otherPlan.benefits[key];

      if (currentValue !== otherValue) {
        changes.push({
          benefit: key,
          from: formatBenefitValue(currentValue),
          to: formatBenefitValue(otherValue),
        });
      }
    }
    return changes;
  };

  const upgradeChanges = getBenefitChanges(higherPlanKey);
  const downgradeChanges = getBenefitChanges(lowerPlanKey);

  return (
    <div className="mt-8 bg-gray-50 rounded-2xl shadow-lg p-6 md:p-8 border">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Compare Your Plan
      </h3>
      <div className="space-y-4">
        {/* Current Plan */}
        <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-sm">
          <p className="font-bold text-center text-blue-800">
            Your Current Plan: {currentPlan.name} (
            {formatCurrency(results.finalPremium)})
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Downgrade Option */}
          {lowerPlanKey && lowerPlanPremium && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="font-semibold text-orange-800">
                Downgrade to {PLAN_BENEFITS[lowerPlanKey].name} for{" "}
                <span className="font-bold text-orange-600">
                  {formatCurrency(lowerPlanPremium - results.finalPremium)}
                </span>
              </p>
              <p className="text-xs text-orange-600 mt-2">
                You will lose coverage on:
              </p>
              <ul className="text-xs text-orange-700 mt-1 space-y-1">
                {downgradeChanges.map((change) => (
                  <li key={change.benefit}>
                    <strong>{change.benefit}:</strong>{" "}
                    <span className="line-through">{change.from}</span> →{" "}
                    {change.to}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upgrade Option */}
          {higherPlanKey && higherPlanPremium && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-800">
                Upgrade to {PLAN_BENEFITS[higherPlanKey].name} for{" "}
                <span className="font-bold text-green-600">
                  +{formatCurrency(higherPlanPremium - results.finalPremium)}
                </span>
              </p>
              <p className="text-xs text-green-600 mt-2">
                You will gain coverage on:
              </p>
              <ul className="text-xs text-green-700 mt-1 space-y-1">
                {upgradeChanges.map((change) => (
                  <li key={change.benefit}>
                    <strong>{change.benefit}:</strong> {change.from} →{" "}
                    {change.to}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanComparisonResults;
