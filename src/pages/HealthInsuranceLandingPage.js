import React from "react";
import { motion } from "framer-motion";
import IconCalculatorCard from "../components/common/IconCalculatorCard";
import { FaUsers, FaUserMd, FaChild } from "react-icons/fa";

const healthCalculators = [
  {
    to: "/floater-mediclaim",
    title: "Floater Mediclaim",
    icon: <FaUsers className="h-8 w-8 text-teal-600" />,
    isUnderConstruction: false,
  },
  {
    to: "/new-india-mediclaim",
    title: "New India Mediclaim",
    icon: <FaUserMd className="h-8 w-8 text-teal-600" />,
    isUnderConstruction: false,
  },
  {
    to: "/yuva-bharat",
    title: "Yuva Bharat Policy",
    icon: <FaChild className="h-8 w-8 text-teal-600" />,
    isUnderConstruction: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const HealthInsuranceLandingPage = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
            Health Insurance <span className="text-teal-500">Calculators</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Select a policy type below to get a quick quote.
          </p>
        </header>

        <div className="flex justify-center">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {healthCalculators.map((calc) => (
              <IconCalculatorCard
                key={calc.to}
                to={calc.to}
                title={calc.title}
                icon={calc.icon}
                isUnderConstruction={calc.isUnderConstruction}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HealthInsuranceLandingPage;
