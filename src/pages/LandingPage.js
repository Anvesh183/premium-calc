import React from "react";
import { motion } from "framer-motion";
import CalculatorCard from "../components/common/CalculatorCard";

const LandingPage = () => {
  const healthIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-teal-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );

  const fireIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-teal-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0118.657 17.657c-1.577 1.577-5.032 3.13-7.487 1.15A8.008 8.008 0 016.343 7.343"
      />
    </svg>
  );

  const gipsaIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-teal-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const travelIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-teal-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const healthCalculators = [
    {
      to: "/floater-mediclaim",
      title: "Floater Mediclaim",
      description:
        "Calculate premiums for the family floater policy with long-term options.",
    },
    {
      to: "/new-india-mediclaim",
      title: "New India Mediclaim",
      description:
        "Calculate premiums for the classic individual and family mediclaim policy.",
    },
    {
      to: "/yuva-bharat",
      title: "Yuva Bharat Policy",
      description:
        "Calculate premiums for the modern health policy designed for young individuals and families.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-500 to-slate-800 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Quote Assist
        </motion.h1>
        <motion.p
          className="mt-4 text-sm text-slate-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Created by <b>Bachu Anvesh</b> (SR NO. 42244) — <b>NIACL</b>
        </motion.p>
        <motion.p
          className="mt-2 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Quickly calculate insurance premiums for various policies. Select a
          calculator below to get started.
        </motion.p>
      </div>

      {/* Calculator Cards Section */}
      <div
        id="calculators"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Health Insurance Section */}
        <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4">
          Health Insurance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {healthCalculators.map((calc) => (
            <motion.div key={calc.to}>
              <CalculatorCard
                to={calc.to}
                title={calc.title}
                description={calc.description}
                icon={healthIcon}
              />
            </motion.div>
          ))}
        </div>

        {/* Other Insurance Section */}
        <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4">
          Other Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div>
            <CalculatorCard
              to="/fire-insurance"
              title="Fire Insurance"
              description="Calculate premiums for Fire & Special Perils policies."
              icon={fireIcon}
            />
          </motion.div>
          <motion.div>
            <CalculatorCard
              to="/gipsa-gmc"
              title="GIPSA Staff GMC"
              description="Calculate medical premiums for GIPSA staff members."
              icon={gipsaIcon}
            />
          </motion.div>
          <motion.div>
            <CalculatorCard
              to="/travel-insurance"
              title="Travel Insurance"
              description="Premiums for the Overseas Travel Ease Policy."
              icon={travelIcon}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
