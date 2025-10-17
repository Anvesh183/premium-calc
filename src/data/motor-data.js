export const MOTOR_RATES = {
  privateCar: {
    tpRates: {
      upto1000: { oneYear: 2094, threeYears: 6521 },
      "1001-1500": { oneYear: 3416, threeYears: 10640 },
      above1500: { oneYear: 7897, threeYears: 24596 },
    },
    electricTpRates: {
      upto30: { oneYear: 1780, threeYears: 5543 },
      "30-65": { oneYear: 2904, threeYears: 9044 },
      above65: { oneYear: 6712, threeYears: 20907 },
    },
    odRates: {
      upto1000: {
        "0-5": { A: 3.127, B: 3.039 },
        "5-10": { A: 3.283, B: 3.191 },
        ">10": { A: 3.362, B: 3.267 },
      },
      "1001-1500": {
        "0-5": { A: 3.283, B: 3.191 },
        "5-10": { A: 3.447, B: 3.351 },
        ">10": { A: 3.529, B: 3.43 },
      },
      above1500: {
        "0-5": { A: 3.44, B: 3.343 },
        "5-10": { A: 3.612, B: 3.51 },
        ">10": { A: 3.698, B: 3.594 },
      },
    },
    longTermOD: {
      upto1500: 4.97,
      above1500: 3.44,
    },
    longTermPackages: {
      upto1500: { basic: 7.88, pro: 8.67, elite: 9.54 },
      above1500: { basic: 5.47, pro: 6.01, elite: 7.25 },
    },
    longTermAddons: {
      rti: 1.2,
      consumables: 0.43,
      tyreAndAlloy: 0.68,
      batteryProtect: 0.79,
      rtiGold: 1.6,
      personalBelongings: 1500,
      rsaBasic: 150,
      rsaGold: 180,
      keyProtect: 750,
      highValuePA: 0.21, // % on SI
      additionalTowing: 0.15, // % on opted value
      roadTax: 5.01, // % on amount
      lossOfContents: 2.1, // % on SI
      hybridProtectBasic: 0.68,
      hybridProtectComp: 1.36,
    },
    nilDepreciation: {
      upto1500: {
        "0-1": { 2: 0.38, 4: 0.58, unlimited: 0.86 },
        "1-2": { 2: 0.48, 4: 0.72, unlimited: 1.08 },
        "2-3": { 2: 0.62, 4: 0.94, unlimited: 1.4 },
        "3-4": { 2: 0.81, 4: 1.22, unlimited: 1.84 },
        "4-5": { 2: 1.0, 4: 1.51, unlimited: 2.27 },
        "5-6": { 2: 1.19, 4: 1.8, unlimited: 2.7 },
        "6-7": { 2: 1.38, 4: 2.09, unlimited: 3.13 },
      },
      above1500: {
        "0-1": { 2: 0.43, 4: 0.65, unlimited: 0.97 },
        "1-2": { 2: 0.52, 4: 0.79, unlimited: 1.19 },
        "2-3": { 2: 0.67, 4: 1.0, unlimited: 1.51 },
        "3-4": { 2: 0.86, 4: 1.29, unlimited: 1.94 },
        "4-5": { 2: 1.05, 4: 1.58, unlimited: 2.37 },
        "5-6": { 2: 1.24, 4: 1.86, unlimited: 2.8 },
        "6-7": { 2: 1.43, 4: 2.15, unlimited: 3.23 },
      },
    },
    returnToInvoice: {
      standard: { "0-1": 0.21, "1-2": 0.44, "2-3": 0.71 },
      gold: { "0-1": 0.24, "1-2": 0.57, "2-3": 1.01 },
    },
    ncbProtection: {
      0: 14.88,
      20: 8.5,
      25: 10.63,
      35: 19.13,
      45: 21.25,
      50: 21.25,
    },
    engineProtect: {
      withZeroDep: {
        "0-1": 0.26,
        "1-2": 0.28,
        "2-3": 0.3,
        "3-4": 0.35,
        "4-5": 0.4,
      },
      withoutZeroDep: { "0-5": 0.25 },
    },
    batteryProtect: { "0-1": 0.27, "1-2": 0.29, "2-3": 0.31 },
    consumables: {
      "0-1": 0.14,
      "1-2": 0.16,
      "2-3": 0.18,
      "3-4": 0.21,
      "4-5": 0.25,
    },
    tyreAndAlloy: { "0-1": 0.2, "1-2": 0.25, "2-3": 0.3 },
  },
};
