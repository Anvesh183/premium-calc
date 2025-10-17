import { useState } from "react";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const initialInputs = {
  policyDuration: "1",
  longTermPackage: "basic",
  fuelType: "petrol_diesel",
  policyType: "package",
  payd: false,
  paydOption: "none",
  purchaseDate: "",
  renewalDate: formatDate(new Date()),
  vehicleAge: "0-5",
  cc: "upto1000",
  kw: "upto30",
  idv: "",
  invoicePrice: "",
  zone: "A",
  ncb: "0",
  // Discounts
  odDiscount: "0",
  nilDepDiscount: "0",
  engineProtectDiscount: "0",
  consumablesDiscount: "0",
  rtiDiscount: "0",
  // Values
  electricalFittingsValue: "",
  cngLpgKitValue: "",
  lossOfContentsValue: "",
  additionalTowingValue: "",
  highValuePA_SI: "",
  // Checkboxes & Selects
  hybridProtect: "none",
  keyProtect: false,
  personalBelongings: false,
  engineProtect: false,
  batteryProtect: false,
  ncbProtect: false,
  consumables: false,
  tyreProtect: false,
  nilDep: "none",
  nilDepClaims: "2",
  rti: "none",
  roadsideAssist: "none",
  paOwnerDriver: true,
  llToPaidDriver: true,
};

export const useMotorInputs = () => {
  const [inputs, setInputs] = useState(initialInputs);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setPolicyType = (type) => {
    setInputs((p) => ({ ...p, policyType: type }));
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  return { inputs, setInputs, handleInputChange, setPolicyType, handleReset };
};
