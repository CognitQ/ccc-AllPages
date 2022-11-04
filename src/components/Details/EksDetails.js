import React from "react";
import "./DetailPages.css";

import { DetCalculation } from "./DetCalculation";

export const EksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);

  // const
  // max Pods
  const depolymentPods = props.detailForPods.map((object) => {
    if (object.maxPods === "") {
      return parseInt(object.minPods);
    } else {
      return parseInt(object.maxPods);
    }
  });

  const noOfNodesPerDep = depolymentPods.map((i) => {
    if (i % 1 === 0) {
      return Math.parseInt(i / 110);
    } else if (parseFloat(i / 110) <= 1) {
      return 1;
    } else {
      return Math.floor(i / 110 + 1);
    }
  });

  const totalNoNodes = noOfNodesPerDep.reduce(
    (result, number) => result + number
  );

  //end of pods

  return (
    <div>
      <DetCalculation
        modelName="Least Cost"
        cloudName="GKE"
        instanceName={Name}
        totalNodes={totalNoNodes}
      />
    </div>
  );
};
