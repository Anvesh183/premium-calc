import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const IconCalculatorCard = ({ to, title, icon, isUnderConstruction }) => {
  const cardContent = (
    <div className="flex flex-col items-center text-center">
      <div className="bg-teal-50 p-4 rounded-full mb-3 group-hover:bg-teal-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-teal-600">
        {title}
      </h3>
    </div>
  );

  return (
    <motion.div variants={itemVariants} className="relative">
      {isUnderConstruction && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-md">
          SOON
        </div>
      )}
      <div className={isUnderConstruction ? "grayscale opacity-60" : ""}>
        <Link
          to={to}
          className={`group block p-4 bg-white rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 ease-in-out ${
            isUnderConstruction
              ? "pointer-events-none"
              : "hover:border-teal-500 hover:shadow-lg transform hover:-translate-y-1"
          }`}
        >
          {cardContent}
        </Link>
      </div>
    </motion.div>
  );
};

export default IconCalculatorCard;
