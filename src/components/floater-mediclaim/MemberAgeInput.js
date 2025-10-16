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
  sumInsured,
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

  const si = parseInt(sumInsured);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
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
      <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-start">
          <input
            id={`optionalCover1-${member.id}`}
            type="checkbox"
            checked={member.optionalCover1}
            onChange={(e) =>
              onMemberChange(member.id, "optionalCover1", e.target.checked)
            }
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
            type="checkbox"
            checked={member.optionalCover2}
            onChange={(e) =>
              onMemberChange(member.id, "optionalCover2", e.target.checked)
            }
            disabled={si < 500000}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
          />
          <label
            htmlFor={`optionalCover2-${member.id}`}
            className="ml-2 text-xs text-gray-700"
          >
            Maternity Cover
          </label>
        </div>
        <div className="flex items-start">
          <input
            id={`optionalCover3-${member.id}`}
            type="checkbox"
            checked={member.optionalCover3}
            onChange={(e) =>
              onMemberChange(member.id, "optionalCover3", e.target.checked)
            }
            disabled={si < 800000}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
          />
          <label
            htmlFor={`optionalCover3-${member.id}`}
            className="ml-2 text-xs text-gray-700"
          >
            Cataract Limit
          </label>
        </div>
        <div className="flex items-start">
          <input
            id={`optionalCover4-${member.id}`}
            type="checkbox"
            checked={member.optionalCover4}
            onChange={(e) =>
              onMemberChange(member.id, "optionalCover4", e.target.checked)
            }
            disabled={si < 800000}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
          />
          <label
            htmlFor={`optionalCover4-${member.id}`}
            className="ml-2 text-xs text-gray-700"
          >
            Non-Medical Items
          </label>
        </div>
      </div>
    </div>
  );
};

export default MemberAgeInput;
