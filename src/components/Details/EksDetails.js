import React from "react";
import "./DetailPage.css";

import { DetailCalculation } from "./DetailCalculation";

export const EksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);
  return (
    <div>
      <div>{props.instanceNameForDetails}</div>
      <DetailCalculation
        modelName="Least Cost"
        cloudName="EKS"
        instanceName={Name}
        // instanceName="t1.micro"
      />
    </div>
  );
};
