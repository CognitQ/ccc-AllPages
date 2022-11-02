import React from "react";
import "./DetailPage.css";

import { DetailCalculation } from "./DetailCalculation";

export const EksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);
  return (
    <div>
      <DetailCalculation
        modelName="Least Cost"
        cloudName="EKS"
        instanceName={Name}
      />
    </div>
  );
};
