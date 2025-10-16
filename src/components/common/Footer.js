import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p className="text-sm font-semibold">
          Quote Assist &copy; {currentYear}
        </p>
        <p className="text-xs mt-2">
          Created by Bachu Anvesh (SR NO. 42244) — NIACL
        </p>
        <p className="text-xs mt-4 italic max-w-2xl mx-auto">
          This is for providing quick quotes to the customer. This may contain
          margin of error.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
