import React from "react";

// Helper function to calculate age from a dd/mm/yyyy string
const calculateAge = (dobString) => {
  if (!dobString) return "";
  const parts = dobString.split("/");
  if (parts.length !== 3) return "";

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
  const year = parseInt(parts[2], 10);

  // Basic validation for parts
  if (isNaN(day) || isNaN(month) || isNaN(year) || year.toString().length < 4) {
    return "";
  }

  const birthDate = new Date(year, month, day);
  // Check if the created date is valid and matches the input
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month ||
    birthDate.getDate() !== day
  ) {
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age.toString() : "";
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
    onMemberChange(member.id, { inputType: newInputType });
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    const age = calculateAge(dob);
    onMemberChange(member.id, { dob, age });
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
              value={member.age || ""}
              onChange={(e) =>
                onMemberChange(member.id, { age: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter Age"
            />
          ) : (
            <div>
              <input
                type="text"
                value={member.dob || ""}
                onChange={handleDobChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="dd/mm/yyyy"
              />
              {member.age && (
                <p className="text-xs text-gray-600 mt-1 pl-1">
                  Calculated Age:{" "}
                  <span className="font-bold text-teal-600">
                    {member.age} years
                  </span>
                </p>
              )}
            </div>
          )}
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
      <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-start">
          <input
            id={`optionalCover1-${member.id}`}
            type="checkbox"
            checked={member.optionalCover1}
            onChange={(e) =>
              onMemberChange(member.id, { optionalCover1: e.target.checked })
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
              onMemberChange(member.id, { optionalCover2: e.target.checked })
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
              onMemberChange(member.id, { optionalCover3: e.target.checked })
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
              onMemberChange(member.id, { optionalCover4: e.target.checked })
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
