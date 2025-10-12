import React from "react";
import CalculatorCard from "../components/common/CalculatorCard"; // Make sure to create this component

const LandingPage = () => {
  const calculators = [
    {
      to: "/fire-insurance",
      title: "Fire Insurance",
      description:
        "Calculate premiums for Fire & Special Perils policies, including STFI, EQ, and Terrorism coverages.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
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
      ),
    },
    {
      to: "/gipsa-gmc",
      title: "GIPSA Staff GMC",
      description:
        "Calculate medical premiums for GIPSA staff, including subsidized and self-paid members.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
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
      ),
    },
    {
      to: "/travel-insurance",
      title: "Travel Insurance",
      description:
        "Calculate premiums for the Overseas Travel Ease Policy for business and holiday trips.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
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
      ),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24 bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Insurance Premium Calculators
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Created by <b>Bachu Anvesh</b> (SR NO. 42244) — <b>NIACL</b>
        </p>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Quickly and accurately calculate insurance premiums for various
          policies. Select a calculator below to get started.
        </p>
        <div className="mt-8">
          <a
            href="#calculators"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            View Calculators
          </a>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Select a Calculator</h3>
            <p className="text-gray-600">
              Choose the type of insurance you need to calculate from the
              options below.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Your Details</h3>
            <p className="text-gray-600">
              Fill in the required information, such as sum insured, age, and
              other relevant details.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Your Quote</h3>
            <p className="text-gray-600">
              Instantly receive a detailed premium breakdown, including GST and
              other charges.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Cards Section */}
      <div
        id="calculators"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => (
            <CalculatorCard
              key={calc.to}
              to={calc.to}
              title={calc.title}
              description={calc.description}
              icon={calc.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
