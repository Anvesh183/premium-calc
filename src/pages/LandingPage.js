import React from "react";
import { motion } from "framer-motion";
import IconCalculatorCard from "../components/common/IconCalculatorCard";
import {
  FaHeartbeat,
  FaCar,
  FaFire,
  FaPlaneDeparture,
  FaUsers,
} from "react-icons/fa";

const mainCalculators = [
  {
    to: "/health",
    title: "Health",
    icon: <FaHeartbeat className="h-8 w-8 text-teal-600" />,
  },
  {
    to: "/motor",
    title: "Motor",
    icon: <FaCar className="h-8 w-8 text-teal-600" />,
  },
  {
    to: "/fire-insurance",
    title: "Fire",
    icon: <FaFire className="h-8 w-8 text-teal-600" />,
  },
  {
    to: "/travel-insurance",
    title: "Travel",
    icon: <FaPlaneDeparture className="h-8 w-8 text-teal-600" />,
  },
  {
    to: "/gipsa-gmc",
    title: "GIPSA GMC",
    icon: <FaUsers className="h-8 w-8 text-teal-600" />,
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

const LandingPage = () => {
  return (
    <div>
      <div className="text-center py-16 md:py-20 bg-gray-50">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-slate-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Quote<span className="text-teal-500">Assist</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Quickly and accurately calculate insurance premiums. Select a category
          to get started.
        </motion.p>
      </div>

      <div
        id="calculators"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center"
      >
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mainCalculators.map((calc) => (
            <IconCalculatorCard
              key={calc.to}
              to={calc.to}
              title={calc.title}
              icon={calc.icon}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
