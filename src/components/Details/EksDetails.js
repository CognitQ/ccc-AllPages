import React from "react";
import "./DetailPages.css";

import { DetCalculation } from "./DetCalculation";

export const EksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);
  // const 

  return (
    <div>
      <DetCalculation
        modelName="Least Cost"
        cloudName="GKE"
        instanceName={Name}
        totalNodes={props.detailForPods}
      />
    </div>
  );
};
