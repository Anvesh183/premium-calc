import React from "react";

const Skeleton = ({ className }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

export default Skeleton;
