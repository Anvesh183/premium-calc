import React from "react";

const Header = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Fire Insurance Premium Calculator
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        These fire rates are w.e.f 01-01-2025.
      </p>
    </header>
  );
};

export default Header;
