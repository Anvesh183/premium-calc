export const MEDICLAIM_OPTIONAL_COVERS = {
  optionalCover1: {
    // No Proportionate Deduction
    "Upto 35": {
      // Mapping for prospectus age band <35
      200000: 1418,
      300000: 980,
      400000: 875,
      500000: 770,
      600000: 729,
      700000: 687,
      800000: 646,
      1000000: 662,
      1200000: 644,
      1500000: 458,
    },
    "36-45": {
      // Mapping for prospectus age band 36-45
      200000: 1506,
      300000: 1040,
      400000: 929,
      500000: 817,
      600000: 774,
      700000: 730,
      800000: 686,
      1000000: 703,
      1200000: 684,
      1500000: 487,
    },
    "46-50": {
      // Mapping for prospectus age band 46-50
      200000: 2483,
      300000: 1715,
      400000: 1531,
      500000: 1348,
      600000: 1276,
      700000: 1203,
      800000: 1131,
      1000000: 1159,
      1200000: 1127,
      1500000: 802,
    },
    "51-55": {
      // Mapping for prospectus age band 51-55
      200000: 3741,
      300000: 2584,
      400000: 2307,
      500000: 2031,
      600000: 1922,
      700000: 1813,
      800000: 1704,
      1000000: 1747,
      1200000: 1699,
      1500000: 1209,
    },
    "56-60": {
      // Mapping for prospectus age band 56-60
      200000: 4852,
      300000: 3351,
      400000: 2993,
      500000: 2634,
      600000: 2493,
      700000: 2351,
      800000: 2210,
      1000000: 2265,
      1200000: 2203,
      1500000: 1568,
    },
    "61-65": {
      // Mapping for prospectus age band 61-65
      200000: 6419,
      300000: 4434,
      400000: 3960,
      500000: 3485,
      600000: 3298,
      700000: 3111,
      800000: 2924,
      1000000: 2997,
      1200000: 2915,
      1500000: 2075,
    },
    ">65": {
      // Mapping for prospectus age band >65
      200000: 9201,
      300000: 6355,
      400000: 5675,
      500000: 4995,
      600000: 4727,
      700000: 4459,
      800000: 4191,
      1000000: 4296,
      1200000: 4178,
      1500000: 2974,
    },
  },
  optionalCover2: {
    // Maternity Expenses Benefit
    500000: 5000,
    600000: 6000,
    700000: 7000,
    800000: 8000,
    1000000: 10000,
    1200000: 12000,
    1500000: 15000,
  },
  optionalCover3: {
    // Revision in Limit of Cataract - Additional Premium
    "<50": { 800000: 444, 1000000: 555, 1200000: 666, 1500000: 832 },
    "51-55": { 800000: 1049, 1000000: 1311, 1200000: 1573, 1500000: 1967 },
    "56-60": { 800000: 2269, 1000000: 2836, 1200000: 3404, 1500000: 4255 },
    "61-65": { 800000: 3645, 1000000: 4556, 1200000: 5467, 1500000: 6834 },
    ">65": { 800000: 3893, 1000000: 4866, 1200000: 5839, 1500000: 7299 },
  },
  optionalCover4: {
    // Voluntary Co-Pay
    description:
      "Insured person opts for voluntary co-pay of 20%, receiving a discount of 15% on the premium payable for the Insured Person.",
    discount: "15%",
    coPay: "20%",
  },
  optionalCover5: {
    // Non-Medical Items (Consumables)
    description:
      "Covers medical consumables (non-payable items) up to a maximum of Rs. 15,000 per policy period. Applicable for Sum Insured of 8 L & above.",
    premium: 1500, // Per member
    benefitLimit: 15000, // Max benefit limit
  },
};
