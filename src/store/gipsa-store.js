import { create } from "zustand";

const initialMemberState = {
  emp: { on: true, age: "Upto 35", si: 10 },
  spouse: { on: false, age: "Upto 35", si: 10 },
  child1: { on: false, age: "Upto 35", si: 10 },
  child2: { on: false, age: "Upto 35", si: 10 },
  parent1: { on: false, age: "Upto 55", si: 10 },
  parent2: { on: false, age: "Upto 55", si: 10 },
  parentInLaw1: { on: false, age: "Upto 55", si: 10 },
  parentInLaw2: { on: false, age: "Upto 55", si: 10 },
  indChild1: { on: false, age: "Upto 35", si: 10 },
  indChild2: { on: false, age: "Upto 35", si: 10 },
};

export const useGipsaStore = create((set) => ({
  // --- STATE ---
  members: initialMemberState,
  payBand: 8,
  gstPct: 0, // Default GST is now 0
  results: { rows: [], monthlySubsidized: 0, monthlyGrand: 0 },
  showResults: false,

  // --- ACTIONS ---
  setMembers: (member, field, value) =>
    set((state) => ({
      members: {
        ...state.members,
        [member]: { ...state.members[member], [field]: value },
      },
    })),
  setPayBand: (payBand) => set({ payBand }),
  setGstPct: (gstPct) => set({ gstPct }),
  setResults: (results) => set({ results, showResults: true }),
  reset: () =>
    set({
      members: initialMemberState,
      payBand: 8,
      gstPct: 0, // Reset GST to 0
      results: { rows: [], monthlySubsidized: 0, monthlyGrand: 0 },
      showResults: false,
    }),
}));
