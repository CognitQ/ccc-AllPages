import React from "react";
import "./DetailPages.css";

import { GkeCalculation } from "./GkeCalculation";

export const PerfGkeDetail = (props) => {
  const Name = String(props.instanceNameForDetails);
  return (
    <div>
      <GkeCalculation
        modelName="Least Cost"
        cloudName="GKE"
        instanceName={Name}
      />
    </div>
  );
};
