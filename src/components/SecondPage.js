import React from "react";
import "./SecondPage.css";
import { Link } from "react-router-dom";
import { InstanceData } from "./InstanceData";
import { Table } from "./Table";

const SecondPage = (props) => {
  // max Vcpu
  const depolymentVcpu = props.dpData.map((object) => {
    if (object.maxVcpu === "undefined") {
      return parseInt(object.minVcpu);
    } else {
      return parseInt(object.maxVcpu);
    }
  });

  const maxVcpuindeployment = Math.max(...depolymentVcpu);

  const demonsetVcpu = props.dsData.map((object) => {
    if (object.demonMaxVcpu === "undefined") {
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
    if (object.maxRam === "undefined") {
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

  const maxRamindeployment = Math.max(...depolymentRam) / 1024;

  const demonsetRam = props.dsData.map((object) => {
    if (object.demonMaxRam === "undefined") {
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
    if (object.storage === "undefined") {
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
    if (object.demonStorage === "undefined") {
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

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/second">SecondPage</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>Deployment Maxram = {maxRamindeployment}</div>
      <div>Deployment MaxVcpu = {maxVcpuindeployment}</div>

      {/* <div>Demonset Maxram = {maxRamindemonset}</div> */}
      {/* <div>Best performance = {bestPerforamnce()}</div>
      <div>Best cost = {bestcost()}</div>
      <div>Balanced = {balance()}</div>

      <div>calculateRatio = {calculateRatio()}</div> */}

      <InstanceData ram={maxRamindeployment} vcpu={maxVcpuindeployment} />

    </div>
  );
};

export default SecondPage;
