import React from "react";

const MemberCard = ({
  label,
  memberKey,
  data,
  onChange,
  ageBands,
  entitlement,
  isSubsidized,
}) => {
  const SI_SLABS = [8, 10, 12, 15, 20, 25, 30, 35, 40, 50];

  return (
    <div className="member-card">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={data.on}
          onChange={(e) => onChange(memberKey, "on", e.target.checked)}
        />{" "}
        {label}
      </label>
      <div className="select-group">
        <div className="field">
          <label>Age Band</label>
          <select
            value={data.age}
            onChange={(e) => onChange(memberKey, "age", e.target.value)}
            disabled={!data.on}
            className={!data.on ? "bg-gray-100" : ""}
          >
            {ageBands.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Sum Insured</label>
          <select
            value={data.si}
            onChange={(e) => onChange(memberKey, "si", e.target.value)}
            disabled={!data.on}
            className={!data.on ? "bg-gray-100" : ""}
          >
            {SI_SLABS.map((si) => (
              <option
                key={si}
                value={si}
                style={{
                  backgroundColor:
                    isSubsidized && si <= entitlement
                      ? "#e0f2fe"
                      : "transparent",
                  fontWeight:
                    isSubsidized && si <= entitlement ? "bold" : "normal",
                }}
              >
                {si} L {isSubsidized && si <= entitlement ? "(Entitled)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
