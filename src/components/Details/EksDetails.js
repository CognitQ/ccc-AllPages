import React from "react";
import "./DetailPages.css";

import { DetCalculation } from "./DetCalculation";

export const EksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);
  return (
    <div>
      <DetCalculation
        modelName="Least Cost"
        cloudName="GKE"
        instanceName={Name}
      />
    </div>
  );
};
