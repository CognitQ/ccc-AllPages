import React from "react";
import "./DetailPages.css";

import { AksCalculation } from "./AksCalculation";

export const BalAksDetail = (props) => {
  const Name = String(props.instanceNameForDetails);
  return (
    <div>
      <AksCalculation
        modelName="Least Cost"
        cloudName="AKS"
        instanceName={Name}
      />
    </div>
  );
};
