import React from "react";
import "./DetailPages.css";

import { DetCalculation } from "./DetCalculation";

export const BalEksDetail = (props) => {
  const Name = String(props.instanceNameForDetails);
  const MsName = String(props.masterNodeName);

  return (
    <div>
      <DetCalculation
        modelName="Balance Cost"
        cloudName="EKS"
        instanceName={Name}
        totalNodes={props.detailForPods}
        MsNode={MsName}
      />
    </div>
  );
};
