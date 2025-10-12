import React from "react";
import { PulseLoader } from "react-spinners";

const Spinner = () => (
  <div className="flex justify-center items-center h-full py-16">
    <PulseLoader color={"#3b82f6"} loading={true} size={15} />
  </div>
);

export default Spinner;
