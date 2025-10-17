import React from "react";

const MemberInput = ({
  member,
  index,
  onMemberChange,
  onRemoveMember,
  canRemove,
}) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onMemberChange(member.id, {
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleInputTypeChange = (inputType) => {
    onMemberChange(member.id, { inputType });
  };

  const sumInsured = parseInt(member.sumInsured, 10);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      {/* Top section for member details */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <p className="text-sm font-medium text-gray-700 md:col-span-1">
          Member {index + 1}
        </p>

        {/* Input Type Toggle */}
        <div className="flex items-center justify-center bg-gray-200 rounded-lg p-1 md:col-span-1">
          <button
            type="button"
            onClick={() => handleInputTypeChange("age")}
            className={`px-4 py-1 text-sm rounded-md transition-colors ${
              member.inputType === "age" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            Age
          </button>
          <button
            type="button"
            onClick={() => handleInputTypeChange("dob")}
            className={`px-4 py-1 text-sm rounded-md transition-colors ${
              member.inputType === "dob" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            DOB
          </button>
        </div>

        {/* Conditional Age/DOB Input Field */}
        <div className="md:col-span-1">
          {member.inputType === "age" ? (
            <input
              type="number"
              name="age"
              value={member.age}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter Age"
              min="0"
              max="100"
            />
          ) : (
            <input
              type="date"
              name="dob"
              value={member.dob}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          )}
        </div>

        {/* Sum Insured Dropdown */}
        <div className="md:col-span-1">
          <select
            name="sumInsured"
            value={member.sumInsured}
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            {[
              200000, 300000, 400000, 500000, 600000, 700000, 800000, 1000000,
              1200000, 1500000,
            ].map((si) => (
              <option key={si} value={si}>
                ₹{si.toLocaleString("en-IN")}
              </option>
            ))}
          </select>
        </div>

        {/* Remove Button */}
        <div className="md:col-span-1 text-right">
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemoveMember(member.id)}
              className="text-rose-500 text-sm font-semibold hover:text-rose-700"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Bottom section for optional covers */}
      <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="flex items-start">
          <input
            id={`optionalCover1-${member.id}`}
            name="optionalCover1"
            type="checkbox"
            checked={member.optionalCover1}
            onChange={handleInputChange}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
          />
          <label
            htmlFor={`optionalCover1-${member.id}`}
            className="ml-2 text-xs text-gray-700"
          >
            No Prop. Deduction
          </label>
        </div>
        <div className="flex items-start">
          <input
            id={`optionalCover2-${member.id}`}
            name="optionalCover2"
            type="checkbox"
            checked={member.optionalCover2}
            onChange={handleInputChange}
            disabled={sumInsured < 500000}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded disabled:opacity-50"
          />
          <label
            htmlFor={`optionalCover2-${member.id}`}
            className={`ml-2 text-xs ${
              sumInsured < 500000 ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Maternity Benefit
          </label>
        </div>
        <div className="flex items-start">
          <input
            id={`optionalCover3-${member.id}`}
            name="optionalCover3"
            type="checkbox"
            checked={member.optionalCover3}
            onChange={handleInputChange}
            disabled={sumInsured < 800000}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded disabled:opacity-50"
          />
          <label
            htmlFor={`optionalCover3-${member.id}`}
            className={`ml-2 text-xs ${
              sumInsured < 800000 ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Cataract Limit
          </label>
        </div>
        <div className="flex items-start">
          <input
            id={`optionalCover5-${member.id}`}
            name="optionalCover5"
            type="checkbox"
            checked={member.optionalCover5}
            onChange={handleInputChange}
            disabled={sumInsured < 800000}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded disabled:opacity-50"
          />
          <label
            htmlFor={`optionalCover5-${member.id}`}
            className={`ml-2 text-xs ${
              sumInsured < 800000 ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Consumables Cover
          </label>
        </div>
        <div className="flex items-start">
          <input
            id={`optionalCover4-${member.id}`}
            name="optionalCover4"
            type="checkbox"
            checked={member.optionalCover4}
            onChange={handleInputChange}
            className="h-4 w-4 text-red-600 border-gray-300 rounded"
          />
          <label
            htmlFor={`optionalCover4-${member.id}`}
            className="ml-2 text-xs text-red-700"
          >
            20% Co-pay (15% Disc)
          </label>
        </div>
      </div>
    </div>
  );
};

export default MemberInput;
