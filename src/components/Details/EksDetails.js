import React from "react";
import "./DetailPages.css";

import { DetCalculation } from "./DetCalculation";

export const EksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);

  const pods = props.detailForPods;

  return (
    <div>
      <DetCalculation
        modelName="Least Cost"
        cloudName="GKE"
        instanceName={Name}
        detailForNodes={pods}
      />
      <h2>pods ={pods}</h2>
    </div>
  );
};
