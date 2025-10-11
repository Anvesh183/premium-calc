import React from "react";
import MemberCard from "./MemberCard";

const GipsaInputs = ({
  members,
  payBand,
  gstPct,
  onMemberChange,
  onPayBandChange,
  onGstChange,
  onCalculate,
  onReset,
  premiums,
}) => {
  const entitlement = Number(payBand);

  const calculatePremiums = () => {
    let monthlySubsidized = 0;
    let monthlyGrand = 0;
    const resultRows = [];

    const inr = (n) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(n);

    const addPersonRow = (label, memberKey, category, isSubsidized) => {
      const member = members[memberKey];
      if (!member.on) return;

      const chosenSI = Number(member.si);
      const ageBand = member.age;
      const basePremium = premiums[category]?.[ageBand]?.[chosenSI];

      if (basePremium == null) {
        resultRows.push({ label: `Missing rate for ${label}`, isError: true });
        return;
      }

      let employerShare = 0,
        employeeShare = 0;

      if (isSubsidized) {
        const eligiblePremium = premiums[category]?.[ageBand]?.[entitlement];
        if (chosenSI <= entitlement) {
          employerShare = 0.75 * basePremium;
          employeeShare = 0.25 * basePremium;
        } else {
          employerShare = 0.75 * eligiblePremium;
          employeeShare =
            0.25 * eligiblePremium + (basePremium - eligiblePremium);
        }
      } else {
        employeeShare = basePremium;
      }

      const gst = employeeShare * (gstPct / 100);
      const total = employeeShare + gst;

      if (isSubsidized) {
        monthlySubsidized += total / 12;
      }
      monthlyGrand += total / 12;

      resultRows.push({
        label,
        base: inr(basePremium),
        employerShare: inr(employerShare),
        employeeShare: inr(employeeShare),
        gst: inr(gst),
        total: inr(total),
      });
    };

    addPersonRow("Employee", "emp", "employee", true);
    addPersonRow("Spouse", "spouse", "spouse", true);
    addPersonRow("Dependent Child 1", "child1", "family", true);
    addPersonRow("Dependent Child 2", "child2", "family", true);
    addPersonRow("Parent 1", "parent1", "parents", false);
    addPersonRow("Parent 2", "parent2", "parents", false);
    addPersonRow("Parent-in-law 1", "parentInLaw1", "parents", false);
    addPersonRow("Parent-in-law 2", "parentInLaw2", "parents", false);
    addPersonRow("Independent Child 1", "indChild1", "indChildren", false);
    addPersonRow("Independent Child 2", "indChild2", "indChildren", false);

    onCalculate({ rows: resultRows, monthlySubsidized, monthlyGrand });
  };

  return (
    <section className="card inputs" aria-label="Inputs">
      <h2>Inputs</h2>
      <div className="form-group">
        <div className="field">
          <label htmlFor="payBand">Basic Pay Band</label>
          <select
            id="payBand"
            value={payBand}
            onChange={(e) => onPayBandChange(e.target.value)}
          >
            <option value="8">&lt; ₹67,265 (Entitlement: ₹8L)</option>
            <option value="10">₹67,265 – ₹85,925 (Entitlement: ₹10L)</option>
            <option value="15">&gt; ₹85,925 (Entitlement: ₹15L)</option>
          </select>
        </div>
        <div id="entitlementBox" className="pill">
          Entitlement: ₹{entitlement}L
        </div>
      </div>

      <div className="divider"></div>
      <h3>Employer‑Subsidized Members</h3>
      <div className="member-grid">
        <MemberCard
          label="Employee"
          memberKey="emp"
          data={members.emp}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.employee)}
        />
        <MemberCard
          label="Spouse"
          memberKey="spouse"
          data={members.spouse}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.spouse)}
        />
        <MemberCard
          label="Dependent Child 1"
          memberKey="child1"
          data={members.child1}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.family)}
        />
        <MemberCard
          label="Dependent Child 2"
          memberKey="child2"
          data={members.child2}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.family)}
        />
      </div>

      <div className="divider"></div>
      <h3>Self‑Paid Members</h3>
      <div className="member-grid">
        <MemberCard
          label="Parent 1"
          memberKey="parent1"
          data={members.parent1}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.parents)}
        />
        <MemberCard
          label="Parent 2"
          memberKey="parent2"
          data={members.parent2}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.parents)}
        />
        <MemberCard
          label="Parent-in-law 1"
          memberKey="parentInLaw1"
          data={members.parentInLaw1}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.parents)}
        />
        <MemberCard
          label="Parent-in-law 2"
          memberKey="parentInLaw2"
          data={members.parentInLaw2}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.parents)}
        />
        <MemberCard
          label="Independent Child 1"
          memberKey="indChild1"
          data={members.indChild1}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.indChildren)}
        />
        <MemberCard
          label="Independent Child 2"
          memberKey="indChild2"
          data={members.indChild2}
          onChange={onMemberChange}
          ageBands={Object.keys(premiums.indChildren)}
        />
      </div>

      <div className="form-actions">
        <div className="field">
          <label htmlFor="gstPct">GST %</label>
          <input
            id="gstPct"
            type="number"
            value={gstPct}
            onChange={(e) => onGstChange(e.target.value)}
            min="0"
            step="1"
          />
        </div>
        <div className="button-group">
          <button className="btn primary" onClick={calculatePremiums}>
            Calculate
          </button>
          <button className="btn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default GipsaInputs;
