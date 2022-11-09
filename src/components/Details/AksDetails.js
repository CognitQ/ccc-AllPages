import React from "react";
import "./DetailPages.css";

import { AksCalculation } from "./AksCalculation";

export const AksDetails = (props) => {
  const Name = String(props.instanceNameForDetails);
  const MsName = String(props.masterNodeName);

  // const
  return (
    <div>
      <AksCalculation
        modelName="Least Cost"
        cloudName="EKS"
        instanceName={Name}
        totalNodes={props.detailForPods}
        MsNode={MsName}
      />
    </div>
  );
};





// import React from "react";
// import "./DetailPages.css";

// import { AksCalculation } from "./AksCalculation";

// export const AksDetails = (props) => {
//   const Name = String(props.instanceNameForDetails);

//   // const
//   // max Pods
//   const depolymentPods = props.detailForPods.map((object) => {
//     if (object.maxPods === "") {
//       return parseInt(object.minPods);
//     } else {
//       return parseInt(object.maxPods);
//     }
//   });

//   const noOfNodesPerDep = depolymentPods.map((i) => {
//     if (parseFloat(i / 110) <= 1) {
//       return 1;
//     } else {
//       return Math.floor(i / 110 + 1);
//     }
//   });

//   const totalNoNodes = noOfNodesPerDep.reduce(
//     (result, number) => result + number
//   );

//   //end of pods

//   return (
//     <div>
//       <AksCalculation
//         modelName="Least Cost"
//         cloudName="AKS"
//         instanceName={Name}
//         totalNodes={totalNoNodes}
//       />
//     </div>
//   );
// };
