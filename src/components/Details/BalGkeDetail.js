import React from "react";
import "./DetailPages.css";

import { GkeCalculation } from "./GkeCalculation";

export const BalGkeDetail = (props) => {
  const MsName = String(props.masterNodeName);
  const Name = String(props.instanceNameForDetails);

  return (
    <div>
      <GkeCalculation
        modelName="Balance Cost"
        cloudName="Gke"
        instanceName={Name}
        totalNodes={props.detailForPods}
        MsNode={MsName}
      />
    </div>
  );
};
