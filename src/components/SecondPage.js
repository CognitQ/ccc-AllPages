import React, { useState } from "react";
import "./SecondPage.css";
import { Link } from "react-router-dom";
import { InstanceData } from "./InstanceData";
import Graph from "./Graph";

const SecondPage = (props) => {
  const [instanceCost, setInstanceCost] = useState();
  const [performanceCost, setPerformanceCost] = useState();
  const [balanceCost, setBalanceCost] = useState();
  const [MsCost, setMsCost] = useState();

  const [cost_MsName, setMsName] = useState();
  const [cost_InstanceName, setInstanceName] = useState();
  const [performance_InstanceName, setPerformanceName] = useState();
  const [balance_InstanceName, setBalanceName] = useState();

  const [aksinstanceCost, setAksInstanceCost] = useState();
  const [aksperformanceCost, setAksPerformanceCost] = useState();
  const [aksbalanceCost, setAksBalanceCost] = useState();
  const [aksMsCost, setAksMsCost] = useState();

  const [akscost_MsName, setAksMsName] = useState();
  const [akscost_InstanceName, setAksInstanceName] = useState();
  const [aksperformance_InstanceName, setAksPerformanceName] = useState();
  const [aksbalance_InstanceName, setAksBalanceName] = useState();

  const getInstanceData = (
    instanceCost,
    PerformanceCost,
    BalanceCost,
    instance_Name,
    Performance_Name,
    Balance_Name,
    MasterCost,
    MasterName,
    aksinstanceCost,
    aksPerformanceCost,
    aksBalanceCost,
    aksinstance_Name,
    aksPerformance_Name,
    aksBalance_Name,
    aksMasterCost,
    aksMasterName
  ) => {
    setInstanceCost(instanceCost);
    setBalanceCost(BalanceCost);
    setPerformanceCost(PerformanceCost);
    setInstanceName(instance_Name);
    setBalanceName(Balance_Name);
    setPerformanceName(Performance_Name);
    setMsCost(MasterCost);
    setMsName(MasterName);
    setAksInstanceCost(aksinstanceCost);
    setAksBalanceCost(aksBalanceCost);
    setAksPerformanceCost(aksPerformanceCost);
    setAksInstanceName(aksinstance_Name);
    setAksBalanceName(aksBalance_Name);
    setAksPerformanceName(aksPerformance_Name);
    setAksMsCost(aksMasterCost);
    setAksMsName(aksMasterName);
  };

  // end Max Pods

  // max Vcpu
  const depolymentVcpu = props.dpData.map((object) => {
    if (object.maxVcpu === "") {
      return parseInt(object.minVcpu);
    } else {
      return parseInt(object.maxVcpu);
    }
  });

  const Vcpuindeployment = Math.max(...depolymentVcpu);
  const maxVcpuindeployment = Vcpuindeployment + (Vcpuindeployment * 10) / 100;
  const VcpuindeploymentforPerformance =
    Vcpuindeployment + (Vcpuindeployment * 90) / 100;
  const VcpuindeploymentforBalance =
    Vcpuindeployment + (Vcpuindeployment * 65) / 100;

  const demonsetVcpu = props.dsData.map((object) => {
    if (object.demonMaxVcpu === "") {
      return parseInt(object.minVcpu);
    } else {
      return parseInt(object.demonMaxVcpu);
    }
  });

  const maxVcpuindemonset = Math.max(...demonsetVcpu);

  // Max Vcpu ends

  // minVcpu
  const depolymentMinVcpu = props.dpData.map((object) => {
    return parseInt(object.minVcpu);
  });

  const minVcpuindeployment = Math.max(...depolymentMinVcpu);

  const demonsetMinVcpu = props.dsData.map((object) => {
    return parseInt(object.demonMinVcpu);
  });

  const minVcpuindemonset = Math.max(...demonsetMinVcpu);

  // MinVcpu ends

  // maxRam
  const depolymentRam = props.dpData.map((object) => {
    if (object.maxRam === "") {
      if (object.minRamUnit === "GiB") {
        return parseInt(object.minRam) * 1024;
      } else {
        return parseInt(object.minRam);
      }
    } else {
      if (object.maxRamUnit === "GiB") {
        return parseInt(object.maxRam) * 1024;
      } else {
        return parseInt(object.maxRam);
      }
    }
  });

  const Ramindeployment = Math.max(...depolymentRam);
  const maxRamindeployment =
    (Ramindeployment + (Ramindeployment * 10) / 100) / 1024;

  const ramindeploymentforPerformance =
    (Ramindeployment + (Ramindeployment * 30) / 100) / 1024;

  const ramindeploymentforBalance =
    (Ramindeployment + (Ramindeployment * 15) / 100) / 1024;

  const demonsetRam = props.dsData.map((object) => {
    if (object.demonMaxRam === "") {
      if (object.demonMinRamUnit === "GiB") {
        return parseInt(object.demonMinRam) * 1024;
      } else {
        return parseInt(object.DemonMinRam);
      }
    } else {
      if (object.demonMaxRamUnit === "GiB") {
        return parseInt(object.demonMaxRam) * 1024;
      } else {
        return parseInt(object.demonMaxRam);
      }
    }
  });

  const maxRamindemonset = Math.max(...demonsetRam) / 1024;

  // Max Ram ends

  // minRam
  const depolymentMinRam = props.dpData.map((object) => {
    if (object.minRamUnit === "GiB") {
      return parseInt(object.minRam) * 1024;
    } else {
      return parseInt(object.minRam);
    }
  });

  const minRamindeployment = Math.max(...depolymentMinRam) / 1024;

  const demonsetMinRam = props.dsData.map((object) => {
    if (object.demonMinRamUnit === "GiB") {
      return parseInt(object.demonMinRam) * 1024;
    } else {
      return parseInt(object.demonMinRam);
    }
  });

  const minRamindemonset = Math.max(...demonsetMinRam) / 1024;

  // MinRam ends

  // Storage Starts
  const depolymentstorage = props.dpData.map((object) => {
    if (object.storage === "") {
      return 0;
    } else {
      if (object.storageUnit === "GiB") {
        return parseInt(object.storage) * 1024;
      } else if (object.storageUnit === "TB") {
        return parseInt(object.storage) * 1024 * 1024;
      } else {
        return parseInt(object.storage);
      }
    }
  });

  const storageindeployment = Math.max(...depolymentstorage) / 1024;

  const demonsetStorage = props.dsData.map((object) => {
    if (object.demonStorage === "") {
      return 0;
    } else {
      if (object.demonStorageUnit === "GiB") {
        return parseInt(object.demonStorage) * 1024;
      } else if (object.demonStorageUnit === "TB") {
        return parseInt(object.demonStorage) * 1024 * 1024;
      } else {
        return parseInt(object.demonStorage);
      }
    }
  });

  const storageindemonset = Math.max(...demonsetStorage) / 1024;

  //  storage ends

  // calculation for nodes
  const depolymentPods = props.dpData.map((object) => {
    if (object.maxPods === "") {
      return parseInt(object.minPods);
    } else {
      return parseInt(object.maxPods);
    }
  });

  const noOfNodesPerDep = depolymentPods.map((i) => {
    if (parseFloat(i / 110) <= 1) {
      return 1;
    } else if (i % 110 === 0) {
      return i / 110;
    } else {
      return Math.floor(i / 110 + 1);
    }
  });

  const totalNoNodes = noOfNodesPerDep.reduce(
    (result, number) => result + number
  );
  // calculation for nodes ends

  // sending data back to app page
  props.setInstanceNameInApp(
    cost_InstanceName,
    balance_InstanceName,
    performance_InstanceName,
    cost_MsName,
    akscost_InstanceName,
    aksbalance_InstanceName,
    aksperformance_InstanceName,
    akscost_MsName
  );

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/summary">SecondPage</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="graph">
        <div className="innerGraph">
          <Graph
            workerCost={instanceCost}
            masterCost={MsCost}
            aksworkerCost={aksinstanceCost}
            aksmasterCost={aksMsCost}
            gkeworkerCost={aksinstanceCost}
            gkemasterCost={aksMsCost}
          />
        </div>
        <div className="innerGraph">
          <Graph
            workerCost={performanceCost}
            masterCost={MsCost}
            aksworkerCost={aksperformanceCost}
            aksmasterCost={aksMsCost}
            gkeworkerCost={aksperformanceCost}
            gkemasterCost={aksMsCost}
          />
        </div>
        <div className="innerGraph">
          <Graph
            workerCost={balanceCost}
            masterCost={MsCost}
            aksworkerCost={aksbalanceCost}
            aksmasterCost={aksMsCost}
            gkeworkerCost={aksbalanceCost}
            gkemasterCost={aksMsCost}
          />
        </div>
      </div>

      <div>
        <InstanceData
          ram={maxRamindeployment}
          vcpu={maxVcpuindeployment}
          setData={getInstanceData}
          peformanceVcpu={VcpuindeploymentforPerformance}
          peformanceRam={ramindeploymentforPerformance}
          balanceVcpu={VcpuindeploymentforBalance}
          balanceRam={ramindeploymentforBalance}
          totalNodes={totalNoNodes}
        />
      </div>
    </div>
  );
};

export default SecondPage;
