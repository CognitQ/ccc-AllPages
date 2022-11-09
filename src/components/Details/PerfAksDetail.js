import React from "react";
import "./DetailPages.css";

import { AksCalculation } from "./AksCalculation";

export const PerfAksDetail = (props) => {
  const Name = String(props.instanceNameForDetails);
  const MsName = String(props.masterNodeName);

  // const
  return (
    <div>
      <AksCalculation
        modelName="Performance Cost"
        cloudName="AKS"
        instanceName={Name}
        totalNodes={props.detailForPods}
        MsNode={MsName}
      />
    </div>
  );
};