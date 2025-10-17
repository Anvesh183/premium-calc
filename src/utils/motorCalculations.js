import { MOTOR_RATES } from "../data/motor-data";

const calculateVehicleAge = (dateString) => {
  if (!dateString || dateString.length !== 10)
    return { years: 0, ageBracket: "0-5" };
  const parts = dateString.split("/");
  if (parts.length !== 3) return { years: 0, ageBracket: "0-5" };
  const [day, month, year] = parts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year) || year.toString().length < 4)
    return { years: 0, ageBracket: "0-5" };
  const purchaseDate = new Date(year, month - 1, day);
  if (
    isNaN(purchaseDate.getTime()) ||
    purchaseDate.getFullYear() !== year ||
    purchaseDate.getMonth() !== month - 1 ||
    purchaseDate.getDate() !== day
  ) {
    return { years: 0, ageBracket: "0-5", isValid: false };
  }
  const today = new Date();
  let age = today.getFullYear() - purchaseDate.getFullYear();
  const m = today.getMonth() - purchaseDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < purchaseDate.getDate())) {
    age--;
  }
  let ageBracket = "0-5";
  if (age >= 10) ageBracket = ">10";
  else if (age >= 5) ageBracket = "5-10";
  return { years: age, ageBracket, isValid: true };
};

const getAgeBracket = (age, brackets) => {
  const year = Math.floor(age);
  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const parts = bracket.split("-");
    if (parts.length === 2) {
      if (year >= parseInt(parts[0]) && year < parseInt(parts[1])) {
        return bracket;
      }
    }
  }
  if (year < 1) return "0-1";
  return brackets[brackets.length - 1];
};

export const calculateOneYearPremium = (inputs) => {
  const { privateCar } = MOTOR_RATES;
  const idv = parseFloat(inputs.idv) || 0;

  if (inputs.policyType !== "liability" && idv <= 0) {
    alert("Please enter a valid Insured Declared Value (IDV).");
    return null;
  }

  const cngTpValue = inputs.cngLpgKitValue > 0 ? 60 : 0;
  let tpRate = 0;
  if (inputs.fuelType === "petrol_diesel") {
    tpRate =
      inputs.policyType !== "od"
        ? privateCar.tpRates[inputs.cc].oneYear + cngTpValue
        : 0;
  } else {
    tpRate =
      inputs.policyType !== "od"
        ? privateCar.electricTpRates[inputs.kw].oneYear
        : 0;
  }

  const paPremium =
    inputs.policyType !== "od" && inputs.paOwnerDriver ? 275 : 0;
  const llPremium =
    inputs.policyType !== "od" && inputs.llToPaidDriver ? 50 : 0;
  const totalLiabilityPremium = tpRate + paPremium + llPremium;

  let totalODPremium = 0,
    basicOD = 0,
    ncbDiscount = 0,
    odPremiumAfterNCB = 0,
    paydDiscount = 0,
    odDiscountAmount = 0;
  let nilDepPremium = 0,
    rtiPremium = 0,
    ncbProtectPremium = 0,
    engineProtectPremium = 0,
    batteryProtectPremium = 0,
    consumablesPremium = 0,
    tyreProtectPremium = 0,
    rsaPremium = 0,
    wallMountedChargerPremium = 0,
    highValuePAPremium = 0,
    hybridProtectPremium = 0;
  let electricalFittingsPremium = 0,
    cngLpgKitPremium = 0,
    keyProtectPremium = 0,
    personalBelongingsPremium = 0,
    lossOfContentsPremium = 0,
    additionalTowingPremium = 0;

  if (inputs.policyType !== "liability") {
    const { years: vehicleAgeYears, ageBracket: vehicleAgeBracket } =
      calculateVehicleAge(inputs.purchaseDate);
    const odRateKey =
      inputs.fuelType === "petrol_diesel"
        ? inputs.cc
        : { upto30: "upto1000", "30-65": "1001-1500", above65: "above1500" }[
            inputs.kw
          ];
    const odRate =
      privateCar.odRates[odRateKey][vehicleAgeBracket][inputs.zone];
    basicOD = (idv * odRate) / 100;

    if (inputs.policyType === "package" && inputs.payd) {
      const discountPercentage =
        { 4000: 0.25, 6000: 0.2, 8000: 0.15, 10000: 0.1 }[inputs.paydOption] ||
        0;
      paydDiscount = basicOD * discountPercentage;
    }

    const odAfterPayd = basicOD - paydDiscount;
    ncbDiscount = (odAfterPayd * parseInt(inputs.ncb)) / 100;
    const odAfterNCB = odAfterPayd - ncbDiscount;

    odDiscountAmount = (odAfterNCB * parseFloat(inputs.odDiscount)) / 100;
    odPremiumAfterNCB = odAfterNCB - odDiscountAmount;

    electricalFittingsPremium =
      (parseFloat(inputs.electricalFittingsValue) || 0) * 0.04;
    cngLpgKitPremium = (parseFloat(inputs.cngLpgKitValue) || 0) * 0.04;
    keyProtectPremium = inputs.keyProtect ? 250 : 0;
    personalBelongingsPremium = inputs.personalBelongings ? 500 : 0;
    lossOfContentsPremium =
      (parseFloat(inputs.lossOfContentsValue) || 0) * 0.007;
    additionalTowingPremium =
      (parseFloat(inputs.additionalTowingValue) || 0) * 0.05;

    highValuePAPremium = (parseFloat(inputs.highValuePA_SI) || 0) * 0.0007;

    if (inputs.hybridProtect !== "none") {
      const ageBracket = getAgeBracket(vehicleAgeYears, [
        "0-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
      ]);
      const rate =
        inputs.hybridProtect === "basic"
          ? privateCar.longTermAddons.hybridProtectBasic
          : privateCar.longTermAddons.hybridProtectComp;
      hybridProtectPremium = (idv * rate) / 100;
    }

    if (inputs.nilDep !== "none") {
      const ageForNilDep = getAgeBracket(vehicleAgeYears, [
        "0-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
        "5-6",
        "6-7",
      ]);
      let premium =
        (idv *
          privateCar.nilDepreciation[inputs.nilDep][ageForNilDep][
            inputs.nilDepClaims
          ]) /
        100;
      nilDepPremium =
        premium - premium * (parseFloat(inputs.nilDepDiscount) / 100);
    }
    if (inputs.rti !== "none") {
      const invoicePrice = parseFloat(inputs.invoicePrice) || 0;
      if (invoicePrice <= 0) {
        alert("Please enter the invoice price for RTI cover.");
        return null;
      }
      const ageForRTI = getAgeBracket(vehicleAgeYears, ["0-1", "1-2", "2-3"]);
      let premium =
        (invoicePrice * privateCar.returnToInvoice[inputs.rti][ageForRTI]) /
        100;
      rtiPremium = premium - premium * (parseFloat(inputs.rtiDiscount) / 100);
    }
    ncbProtectPremium = inputs.ncbProtect
      ? (basicOD * privateCar.ncbProtection[inputs.ncb]) / 100
      : 0;
    if (inputs.engineProtect) {
      const ageForEngineProtect = getAgeBracket(vehicleAgeYears, [
        "0-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
      ]);
      const rate =
        inputs.nilDep !== "none"
          ? privateCar.engineProtect.withZeroDep[ageForEngineProtect]
          : privateCar.engineProtect.withoutZeroDep["0-5"];
      let premium = (idv * rate) / 100;
      engineProtectPremium =
        premium - premium * (parseFloat(inputs.engineProtectDiscount) / 100);
    }
    if (inputs.batteryProtect) {
      const ageForBattery = getAgeBracket(vehicleAgeYears, [
        "0-1",
        "1-2",
        "2-3",
      ]);
      if (ageForBattery)
        batteryProtectPremium =
          (idv * privateCar.batteryProtect[ageForBattery]) / 100;
    }
    if (inputs.wallMountedCharger) {
      wallMountedChargerPremium = basicOD * 0.05;
    }
    if (inputs.consumables) {
      const ageForConsumables = getAgeBracket(vehicleAgeYears, [
        "0-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
      ]);
      if (ageForConsumables) {
        let premium = (idv * privateCar.consumables[ageForConsumables]) / 100;
        consumablesPremium =
          premium - premium * (parseFloat(inputs.consumablesDiscount) / 100);
      }
    }
    if (inputs.tyreProtect) {
      const ageForTyre = getAgeBracket(vehicleAgeYears, ["0-1", "1-2", "2-3"]);
      if (ageForTyre)
        tyreProtectPremium = (idv * privateCar.tyreAndAlloy[ageForTyre]) / 100;
    }
    rsaPremium =
      inputs.roadsideAssist === "basic"
        ? 50
        : inputs.roadsideAssist === "gold"
        ? 60
        : 0;

    totalODPremium = [
      odPremiumAfterNCB,
      nilDepPremium,
      rtiPremium,
      ncbProtectPremium,
      engineProtectPremium,
      batteryProtectPremium,
      consumablesPremium,
      tyreProtectPremium,
      rsaPremium,
      electricalFittingsPremium,
      cngLpgKitPremium,
      keyProtectPremium,
      personalBelongingsPremium,
      lossOfContentsPremium,
      additionalTowingPremium,
      wallMountedChargerPremium,
      highValuePAPremium,
      hybridProtectPremium,
    ].reduce((a, b) => a + b, 0);
  }

  const totalPremium = totalLiabilityPremium + totalODPremium;
  const gst = totalPremium * 0.18;
  const finalPremium = totalPremium + gst;

  return {
    totalLiabilityPremium,
    totalODPremium,
    totalPremium,
    gst,
    finalPremium,
    tpRate,
    paPremium,
    llPremium,
    basicOD,
    ncbDiscount,
    odPremiumAfterNCB,
    paydDiscount,
    odDiscountAmount,
    nilDepPremium,
    rtiPremium,
    ncbProtectPremium,
    engineProtectPremium,
    batteryProtectPremium,
    consumablesPremium,
    tyreProtectPremium,
    rsaPremium,
    wallMountedChargerPremium,
    highValuePAPremium,
    hybridProtectPremium,
    electricalFittingsPremium,
    cngLpgKitPremium,
    keyProtectPremium,
    personalBelongingsPremium,
    lossOfContentsPremium,
    additionalTowingPremium,
  };
};

export const calculateLongTermPremium = (inputs) => {
  const { privateCar } = MOTOR_RATES;
  const idv = parseFloat(inputs.idv) || 0;
  if (idv <= 0) {
    alert("Please enter a valid Insured Declared Value (IDV) for a new car.");
    return null;
  }

  const ccBracket = inputs.cc === "above1500" ? "above1500" : "upto1500";
  const packageRate =
    privateCar.longTermPackages[ccBracket][inputs.longTermPackage];
  const odPremium = (idv * packageRate) / 100;

  let tpPremium;
  if (inputs.fuelType === "petrol_diesel") {
    tpPremium = privateCar.tpRates[inputs.cc].threeYears;
  } else {
    tpPremium = privateCar.electricTpRates[inputs.kw].threeYears;
  }

  const paPremium = 801;
  const llPremium = inputs.llToPaidDriver ? 50 * 3 : 0;
  const totalLiabilityPremium = tpPremium + paPremium + llPremium;

  const totalPremium = odPremium + totalLiabilityPremium;
  const gst = totalPremium * 0.18;
  const finalPremium = totalPremium + gst;

  return {
    totalLiabilityPremium,
    totalODPremium: odPremium,
    totalPremium,
    gst,
    finalPremium,
    tpRate: tpPremium,
    paPremium,
    llPremium,
    basicOD: odPremium,
    ncbDiscount: 0,
    odPremiumAfterNCB: odPremium,
    paydDiscount: 0,
    odDiscountAmount: 0,
    longTermPackage: inputs.longTermPackage,
  };
};
