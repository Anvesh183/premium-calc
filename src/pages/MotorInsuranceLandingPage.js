import React from "react";
import { motion } from "framer-motion";
import IconCalculatorCard from "../components/common/IconCalculatorCard";
import {
  FaCarSide,
  FaMotorcycle,
  FaTruck,
  FaBus,
  FaTractor,
} from "react-icons/fa";

const motorCalculators = [
  {
    to: "/motor/private-car",
    title: "Private Car",
    icon: <FaCarSide className="h-8 w-8 text-teal-600" />,
    isUnderConstruction: false,
  },
  {
    to: "/motor/two-wheeler",
    title: "Two Wheeler",
    icon: <FaMotorcycle className="h-8 w-8 text-teal-600" />,
    isUnderConstruction: true,
  },
  {
    to: "/motor/goods-carrying",
    title: "Goods Vehicle",
    icon: <FaTruck className="h-8 w-8 text-teal-600" />,
    isUnderConstruction: true,
  },
  {
    to: "/motor/passenger-carrying",
    title: "Passenger Vehicle",
    icon: <FaBus className="h-8 w-8 text-teal-600" />,
    isUnderConstruction: true,
  },
  {
    to: "/motor/misc-vehicles",
    title: "Misc. Vehicles",
    icon: <FaTractor className="h-8 w-8 text-teal-600" />,
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

const MotorInsuranceLandingPage = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
            Motor Insurance <span className="text-teal-500">Calculators</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Select a vehicle type below to get a quick quote.
          </p>
        </header>

        <div className="flex justify-center">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {motorCalculators.map((calc) => (
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

export default MotorInsuranceLandingPage;
