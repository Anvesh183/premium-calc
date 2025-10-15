import React from "react";

// Helper function to calculate age from DOB
const calculateAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : 0;
};

const MemberAgeInput = ({
  member,
  index,
  onMemberChange,
  onRemoveMember,
  canRemove,
}) => {
  const handleToggle = () => {
    const newInputType = member.inputType === "age" ? "dob" : "age";
    // Corrected function call below
    onMemberChange(member.id, "inputType", newInputType);
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    const age = calculateAge(dob);
    onMemberChange(member.id, "dob", dob);
    onMemberChange(member.id, "age", age.toString()); // Update age automatically
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <p className="text-sm font-medium text-gray-700 md:col-span-1">
          Member {index + 1}
        </p>

        {/* Input Type Toggle */}
        <div className="flex items-center justify-center bg-gray-200 rounded-lg p-1 md:col-span-1">
          <button
            type="button"
            onClick={handleToggle}
            className={`px-4 py-1 text-sm rounded-md transition-colors ${
              member.inputType === "age" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            Age
          </button>
          <button
            type="button"
            onClick={handleToggle}
            className={`px-4 py-1 text-sm rounded-md transition-colors ${
              member.inputType === "dob" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            DOB
          </button>
        </div>

        {/* Conditional Input Field */}
        <div className="md:col-span-1">
          {member.inputType === "age" ? (
            <input
              type="number"
              value={member.age}
              onChange={(e) => onMemberChange(member.id, "age", e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter Age"
            />
          ) : (
            <input
              type="date"
              value={member.dob}
              onChange={handleDobChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          )}
        </div>

        {/* Is Girl Child Checkbox */}
        <div className="flex items-center md:col-span-1">
          <input
            id={`isGirl-${member.id}`}
            type="checkbox"
            checked={member.isGirl}
            onChange={(e) =>
              onMemberChange(member.id, "isGirl", e.target.checked)
            }
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
          />
          <label
            htmlFor={`isGirl-${member.id}`}
            className="ml-2 text-sm text-gray-700"
          >
            Girl Child?
          </label>
        </div>

        {/* Remove Button */}
        <div className="md:col-span-1">
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
    </div>
  );
};

export default MemberAgeInput;
