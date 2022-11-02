import React from "react";
import "./DetailPage.css";

import { DetailCalculation } from "./DetailCalculation";

export const EksDetails = () => {
  return (
    <div>
      <DetailCalculation
        modelName="Least Cost"
        cloudName="EKS"
        instanceName="t1.micro"
      />
    </div>
  );
};
