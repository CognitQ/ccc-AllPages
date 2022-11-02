import React from "react";
import "./DetailPages.css";

import { DetCalculation } from "./DetCalculation";

export const AksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);
  return (
    <div>
      <DetCalculation
        modelName="Least Cost"
        cloudName="EKS"
        instanceName={Name}
      />
    </div>
  );
};
