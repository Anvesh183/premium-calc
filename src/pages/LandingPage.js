import React from "react";
import { motion } from "framer-motion";
import CalculatorCard from "../components/common/CalculatorCard";

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
      ),
    },
    {
      to: "/floater-mediclaim",
      title: "Floater Mediclaim",
      description:
        "Calculate premiums for the New India Floater Mediclaim Policy with long-term options.",
      icon: (
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
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

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
          Quickly and accurately calculate insurance premiums for various
          policies. Select a calculator below to get started.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#calculators"
            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
          >
            View Calculators
          </a>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Why Choose This Calculator?
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="bg-green-100 text-green-600 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Calculations</h3>
            <p className="text-gray-600">
              Get accurate premium breakdowns in seconds without waiting.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="bg-teal-100 text-teal-600 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Up-to-Date Rates</h3>
            <p className="text-gray-600">
              All calculations are based on the latest official tariffs and
              rates.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="bg-pink-100 text-pink-600 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Modern & Easy to Use</h3>
            <p className="text-gray-600">
              A clean, intuitive interface that works beautifully on any device.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Calculator Cards Section */}
      <div
        id="calculators"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {calculators.map((calc) => (
            <motion.div key={calc.to} variants={itemVariants}>
              <CalculatorCard
                to={calc.to}
                title={calc.title}
                description={calc.description}
                icon={calc.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
