import React from "react";

export const Testing = (props) => {
  const deploymentData = props.data.map((i) => (
    <li>
      {"id = " +
        i.id +
        "Deployment = " +
        i.deployment +
        "minPods = " +
        i.minPods +
        "maxPods = " +
        i.maxPods +
        "minRam = " +
        i.minRam +
        "minRamUnit = " +
        i.minRamUnit +
        "maxRam = " +
        i.maxRam +
        "maxRamUnit = " +
        i.maxRamUnit +
        "minvCPU = " +
        i.minVcpu +
        "minvCPUunit = " +
        i.minVcpuUnit +
        "maxvCPU = " +
        i.maxVcpu +
        "maxvCPUunit = " +
        i.maxVcpuUnit +
        "Storage = " +
        i.storage +
        "StorageUnit = " +
        i.storageUnit}
    </li>
  ));
  return (
    <div>
      <ul>{deploymentData}</ul>
    </div>
  );
};
