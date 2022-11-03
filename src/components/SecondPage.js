import React, { useState } from "react";
import "./SecondPage.css";
import { Link } from "react-router-dom";
import { InstanceData } from "./InstanceData";
import Graph from "./Graph";

const SecondPage = (props) => {
  const [instanceCost, setInstanceCost] = useState();
  const [performanceCost, setPerformanceCost] = useState();
  const [balanceCost, setBalanceCost] = useState();

  const [cost_InstanceName, setInstanceName] = useState();
  const [performance_InstanceName, setPerformanceName] = useState();
  const [balance_InstanceName, setBalanceName] = useState();
  const getInstanceData = (
    instanceCost,
    PerformanceCost,
    BalanceCost,
    instance_Name,
    Performance_Name,
    Balance_Name
  ) => {
    setInstanceCost(instanceCost);
    setBalanceCost(BalanceCost);
    setPerformanceCost(PerformanceCost);
    setInstanceName(instance_Name);
    setBalanceName(Balance_Name);
    setPerformanceName(Performance_Name);
  };

  // max Pods
  const depolymentPods = props.dpData.map((object) => {
    if (object.maxPods === "") {
      return parseInt(object.minPods);
    } else {
      return parseInt(object.maxPods);
    }
  });

  const maxPodsindeployment = Math.max(...depolymentPods);
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
    Vcpuindeployment + (Vcpuindeployment * 30) / 100;
  const VcpuindeploymentforBalance =
    Vcpuindeployment + (Vcpuindeployment * 15) / 100;

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

  const calculateRatio = () => {
    const ratio = maxRamindeployment / maxVcpuindeployment;
    return ratio;
  };

  //
  props.setInstanceNameInApp(
    cost_InstanceName,
    balance_InstanceName,
    performance_InstanceName
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
          <Graph workerCost={instanceCost} />
        </div>
        <div className="innerGraph">
          <Graph workerCost={performanceCost} />
        </div>
        <div className="innerGraph">
          <Graph workerCost={balanceCost} />
        </div>
      </div>

      <div>
        <InstanceData
          pods={maxPodsindeployment}
          ram={maxRamindeployment}
          vcpu={maxVcpuindeployment}
          setData={getInstanceData}
          peformanceVcpu={VcpuindeploymentforPerformance}
          peformanceRam={ramindeploymentforPerformance}
          balanceVcpu={VcpuindeploymentforBalance}
          balanceRam={ramindeploymentforBalance}
        />
      </div>
    </div>
  );
};

export default SecondPage;
