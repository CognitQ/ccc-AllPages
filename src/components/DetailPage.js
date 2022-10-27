import React from "react";
import "./DetailPage.css";
import {Link} from "react-router-dom";

export const DetailPage = () => {
  return (
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


      <center>
        <div className="box">
          <div className="ltop">
            <label>
              <h5>
                <b>Pricing Model</b>
              </h5>
            </label>
          </div>
          <div className="rtop">
            <label> Total Nodes </label>
            <input type="number"/>

            {/* <select id="unit">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select> */}
          </div>
          <div className="option">
            <button>OnDemand</button> <button>Spot</button>{" "}
            <button>
              Reserved
              {/* <BsCaretDown /> */}
              <select id="unit">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
              </select>
            </button>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">AKS</th>
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
                <td>e2-standard-4</td>
                <td>4</td>
                <td>16</td>
                <td></td>
                <td>1.06</td>
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
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">AKS</th>
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
