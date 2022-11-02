import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const DetailCalculation = (props) => {
  //code for fetch data
  const [data, fetchData] = useState([]);

  const getData = () => {
    fetch("http://localhost:4000/aws")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const filterInstaceName = data.filter(
    (name) => name.InstanceType === props.instanceName
  );

  return (
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
      <center>
        <div className="mainbox">
          <div className="ltop">
            <label>
              <h5>
                <b>Pricing Model {props.modelName}</b>
              </h5>
            </label>
          </div>
          <div className="rtop">
            <label> Total Nodes </label>
            <input type="number" />
          </div>
          <div className="option">
            <button>OnDemand</button> <button>Spot</button>{" "}
            <button>
              Reserved
              <select id="unit">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
              </select>
            </button>
          </div>
          <table class="table table-bordered table1">
            <thead>
              <tr>
                <th scope="col">{props.cloudName}</th>
                <th scope="col">Instance Name</th>
                <th scope="col">vCPU</th>
                <th scope="col">RAM GiB</th>
                <th scope="col">Storage GiB</th>
                <th scope="col">Cost Per Hour(USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">NODE</th>
                {filterInstaceName.map((i) => {
                  return (
                    <>
                      <td>{i.InstanceType}</td>
                      <td>{parseFloat(i.vCPUs)}</td>
                      <td>{parseFloat(i.MemoryInGiB)}</td>
                      <td>{parseFloat(i.StorageInGiB)}</td>
                      <td>{parseFloat(i.OnDemandLinuxpricing_USDperHour)}</td>
                    </>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className="calculations">
            <div className="lcalculations">
              <div class="dropdown">
                <button
                  class="btn btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Show calculations
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      OnDemand Instance : 10*41.06*730 hours in a month = 730
                      USD
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rcalculations">
              <label>
                <b>OnDemand Cost(Monthly): 773.8 USD</b>
              </label>
            </div>
          </div>
          <hr
            style={{
              color: "black",
              height: "3px",
            }}
          />
          <div className="ltop">
            <label>
              <h5>
                <b>No. Of master Nodes/ HA</b>
              </h5>
            </label>
          </div>
          <div className="rtop">
            <label> Master Nodes </label>

            <select id="unit">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <table class="table table-bordered table1">
            <thead>
              <tr>
                <th scope="col">EKS</th>
                <th scope="col">Instance Name</th>
                <th scope="col">vCPU</th>
                <th scope="col">RAM GiB</th>
                <th scope="col">Storage GiB</th>
                <th scope="col">Cost Per Hour(USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">NODE</th>
                <td>c6a-2xlarge</td>
                <td>4</td>
                <td>16</td>
                <td></td>
                <td>0.10</td>
              </tr>
            </tbody>
          </table>
          <div className="calculations">
            <div className="lcalculations">
              <div class="dropdown">
                <button
                  class="btn btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Show calculations
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Node 3: 3 Node* 0.10$* 730 hours in a month = 219 USD
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rcalculations">
              <label>
                <b>Node Cost(Monthly): 219.00 USD</b>
              </label>
            </div>
            <hr
              style={{
                color: "black",
                height: "3px",
              }}
            />
          </div>
          <div className="total">
            <label>
              <b>Total Cost(Monthly) = 6497.00 USD</b>
            </label>
          </div>
        </div>
      </center>
    </div>
  );
};
