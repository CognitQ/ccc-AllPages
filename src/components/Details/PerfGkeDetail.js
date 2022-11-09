import React from "react";
import "./DetailPages.css";

import { GkeCalculation } from "./GkeCalculation";

export const PerfGkeDetail = (props) => {
  const MsName = String(props.masterNodeName);
  const Name = String(props.instanceNameForDetails);

  // const
  return (
    <div>
      <GkeCalculation
        modelName="Performance Cost"
        cloudName="Gke"
        instanceName={Name}
        totalNodes={props.detailForPods}
        MsNode={MsName}
      />
    </div>
  );
};
