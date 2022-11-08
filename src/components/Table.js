import React from "react";
import "./SecondPage.css";
import { useNavigate } from "react-router-dom";

export const Table = (props) => {
  const navigate = useNavigate();

  const gotoEksDetails = (pricingModel) => {
    if (pricingModel === "Cost") {
      navigate("/summary/Least/EksDetail");
    } else if (pricingModel === "Balance") {
      navigate("/summary/Balance/EksDetail");
    } else {
      navigate("/summary/Performance/EksDetail");
    }
  };

  const gotoAksDetails = (pricingModel) => {
    if (pricingModel === "Cost") {
      navigate("/summary/Least/AksDetail");
    } else if (pricingModel === "Balance") {
      navigate("/summary/Balance/AksDetail");
    } else {
      navigate("/summary/Performance/AksDetail");
    }
  };

  const gotoGkeDetails = (pricingModel) => {
    if (pricingModel === "Cost") {
      navigate("/summary/Least/GkeDetail");
    } else if (pricingModel === "Balance") {
      navigate("/summary/Balance/GkeDetail");
    } else {
      navigate("/summary/Performance/GkeDetail");
    }
  };

  // const total = props.cost + props.master;
  const total = props.eksCost + 2;

  return (
    <div>
      <center>
        <table className="table table-striped table-hover table-bordered table">
          <thead className="tHead">
            <tr>
              <th scope="col" className="tHeading">
                {props.model} {props.ram}
              </th>
              <th scope="col">Worker Node Type</th>
              <th scope="col">Cost Of WorkerNodes Per month($)</th>
              <th scope="col">Master Node Type</th>
              <th scope="col">Cost of MasterNodes Per month($)</th>
              <th scope="col">Grand Total Per month($)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">EKS</th>
              <td>{props.eksName}</td>
              <td>{props.eksCost}</td>
              <td>Master Node Type</td>
              <td>2</td>
              <td>{total}</td>
              <td>
                <button
                  className="btn btn-link tButton"
                  onClick={() => gotoEksDetails(props.model)}
                >
                  show Details{" "}
                </button>
              </td>
            </tr>

            <tr>
              <th scope="row">AKS</th>
              <td>{props.gkeName}</td>
              <td>{props.gkeCost}</td>
              <td>Master Node Type</td>
              <td>2</td>
              <td>{total}</td>
              <td>
                <button
                  className="btn btn-link tButton"
                  onClick={() => gotoAksDetails(props.model)}
                >
                  show Details{" "}
                </button>
              </td>
            </tr>

            <tr>
              <th scope="row">GKE</th>
              <td>{props.aksName}</td>
              <td>{props.aksCost}</td>
              <td>Master Node Type</td>
              <td>2</td>
              <td>{total}</td>
              <td>
                <button
                  className="btn btn-link tButton"
                  onClick={() => gotoGkeDetails(props.model)}
                >
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
