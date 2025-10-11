import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
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
      </div>

      {/* Calculator Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Fire Insurance Calculator Card */}
          <Link to="/fire-insurance" className="calculator-card-link">
            <div className="calculator-card">
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-800">
                  Fire Insurance
                </h2>
                <p className="mt-2 text-gray-600">
                  Calculate premiums for Fire & Special Perils policies,
                  including STFI, EQ, and Terrorism coverages.
                </p>
              </div>
              <div className="card-footer">
                <span>Go to Calculator &rarr;</span>
              </div>
            </div>
          </Link>

          {/* GIPSA GMC Calculator Card */}
          <Link to="/gipsa-gmc" className="calculator-card-link">
            <div className="calculator-card">
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-800">
                  GIPSA Staff GMC
                </h2>
                <p className="mt-2 text-gray-600">
                  Calculate medical premiums for GIPSA staff, including
                  subsidized and self-paid members.
                </p>
              </div>
              <div className="card-footer">
                <span>Go to Calculator &rarr;</span>
              </div>
            </div>
          </Link>
          {/* Travel Insurance Calculator Card */}
          <Link to="/travel-insurance" className="calculator-card-link">
            <div className="calculator-card">
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-800">
                  Travel Insurance
                </h2>
                <p className="mt-2 text-gray-600">
                  Calculate premiums for the Overseas Travel Ease Policy for
                  business and holiday trips.
                </p>
              </div>
              <div className="card-footer">
                <span>Go to Calculator &rarr;</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
