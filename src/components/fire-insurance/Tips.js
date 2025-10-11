import React from "react";

const Tips = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">💡 Tips</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>
          The <strong>Earthquake Zone</strong> is automatically suggested based
          on your selected State/UT and District.
        </li>
        <li>
          The <strong>Short Period Rate Calculator</strong> is useful for
          policies with a term of less than a year.
        </li>
      </ul>
    </div>
  );
};

export default Tips;
