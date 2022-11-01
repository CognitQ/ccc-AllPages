import React from "react";
import "./SecondPage.css";
import { useNavigate } from "react-router-dom";

export const Table = (props) => {
  const navigate = useNavigate();

  const gotoDetail = () => {
    navigate("/detail");
  };

  // const total = props.cost + props.master;
  const total = props.cost + 2;

  return (
    <div>
      <center>
        <table className="table table-striped table-hover table-bordered table">
          <thead className="tHead">
            <tr>
              <th scope="col" className="tHeading">
                Least Price
              </th>
              <th scope="col">Instance Type</th>
              <th scope="col">Cost Of Worker Nodes Per month($)</th>
              <th scope="col">Cost of Master Node Per month($)</th>
              <th scope="col">Grand Total Per month($)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Eks</th>
              <td>{props.eksName}</td>
              <td>{props.eksCost}</td>
              <td>2</td>
              <td>{total}</td>
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
              <th scope="row">GKE</th>
              <td>{props.gkeName}</td>
              <td>{props.gkeCost}</td>
              <td>2</td>
              <td>{total}</td>
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
              <th scope="row">Aks</th>
              <td>{props.aksName}</td>
              <td>{props.aksCost}</td>
              <td>2</td>
              <td>{total}</td>
              <td>
                <button
                  className="btn btn-link tButton"
                  onClick={() => gotoDetail()}
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
