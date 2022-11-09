import React from "react";
import "./DetailPages.css";

import { AksCalculation } from "./AksCalculation";

export const BalAksDetail = (props) => {
  const Name = String(props.instanceNameForDetails);
  const MsName = String(props.masterNodeName);

  return (
    <div>
      <AksCalculation
        modelName="Balance Cost"
        cloudName="AKS"
        instanceName={Name}
        totalNodes={props.detailForPods}
        MsNode={MsName}
      />
    </div>
  );
};
