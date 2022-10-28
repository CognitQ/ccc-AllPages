import React from "react";
import "./SecondPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SecondPage = (props) => {
  const navigate = useNavigate();

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

  const maxRamindeployment = Math.max(...depolymentRam);

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

  const maxRamindemonset = Math.max(...demonsetRam);

  // Max Ram ends

  // minRam
  const depolymentMinRam = props.dpData.map((object) => {
    if (object.minRamUnit === "GiB") {
      return parseInt(object.minRam) * 1024;
    } else {
      return parseInt(object.minRam);
    }
  });

  const minRamindeployment = Math.max(...depolymentMinRam);

  const demonsetMinRam = props.dsData.map((object) => {
    if (object.demonMinRamUnit === "GiB") {
      return parseInt(object.demonMinRam) * 1024;
    } else {
      return parseInt(object.demonMinRam);
    }
  });

  const minRamindemonset = Math.max(...demonsetMinRam);

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

  const storageindeployment = Math.max(...depolymentstorage);

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

  const storageindemonset = Math.max(...demonsetStorage);

  //  storage ends

  // function for best performance
  // ram = 500 vcpu 16
  const bestPerforamnce = () => {
    const requiredRam = (50 / 100) * maxRamindeployment + maxRamindeployment;
    const requiredVcpu = (50 / 100) * maxVcpuindeployment + maxVcpuindeployment;
    const ratio = requiredRam / requiredVcpu;
    return ratio;
  };
  // function for best performance ends

  // function for best cost
  const bestcost = () => {
    const requiredRam = (15 / 100) * maxRamindeployment + maxRamindeployment;
    const requiredVcpu = (15 / 100) * maxVcpuindeployment + maxVcpuindeployment;
    const ratio = requiredRam / requiredVcpu;
    return ratio;
  };
  // function for best cost ends

  // function for Balance
  const balance = () => {
    const requiredRam = (30 / 100) * maxRamindeployment + maxRamindeployment;
    const requiredVcpu = (30 / 100) * maxVcpuindeployment + maxVcpuindeployment;
    const ratio = requiredRam / requiredVcpu;
    return ratio;
  };
  // function for Balance ends

  const gotoDetail = () => {
    navigate("/detail");
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

      {/* <div>Deployment Maxram = {maxRamindeployment}</div>
      <div>Demonset Maxram = {maxRamindemonset}</div> */}
      <div>Best performance = {bestPerforamnce()}</div>
      <div>Best cost = {bestcost()}</div>
      <div>Balanced = {balance()}</div>

      <center>
        <table className="table table-striped table-hover table-bordered table">
          <thead className="tHead">
            <tr>
              <th scope="col" className="tHeading">
                Least Price
              </th>
              <th scope="col">Cost Of Worker Nodes Per month($)</th>
              <th scope="col">Cost of Master Node Per month($)</th>
              <th scope="col">Grand Total Per month($)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">EKS</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <button
                  className="btn btn-link tButton"
                  onClick={() => gotoDetail()}
                >
                  show Details{" "}
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">AKS</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>
                <button className="btn btn-link" onClick={() => gotoDetail()}>
                  show Details{" "}
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">GKE</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>
                <button className="btn btn-link" onClick={() => gotoDetail()}>
                  show Details{" "}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default SecondPage;
