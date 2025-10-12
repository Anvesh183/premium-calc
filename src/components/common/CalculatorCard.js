import React from "react";
import { Link } from "react-router-dom";

const CalculatorCard = ({ to, title, description, icon }) => {
  return (
    <Link to={to} className="calculator-card-link group">
      <div className="calculator-card">
        <div className="p-6 flex-grow">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
              {icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        <div className="card-footer">
          <span>Go to Calculator &rarr;</span>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorCard;
