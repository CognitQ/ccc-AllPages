import React from "react";
import "./DetailPages.css";

import { GkeCalculation } from "./GkeCalculation";

export const GkeDetails = (props) => {
  const MsName = String(props.masterNodeName);
  const Name = String(props.instanceNameForDetails);

  // const
  return (
    <div>
      <GkeCalculation
        modelName="Least Cost"
        cloudName="Gke"
        instanceName={Name}
        totalNodes={props.detailForPods}
        MsNode={MsName}
      />
    </div>
  );
};
