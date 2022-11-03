import React from "react";
import "./DetailPages.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const DetCalculation = (props) => {
  const [show, setShow] = useState(false);
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

  const onDemonadValue = data
    .filter((name) => name.InstanceType === props.instanceName)
    .map((c) => {
      return parseFloat(c.OnDemandLinuxpricing_USDperHour);
    });

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
          <div className="heading">
            <label>
              <h6>
                <b>Pricing Model {props.modelName}</b>
              </h6>
            </label>
          </div>
          <div className="rtop">
            <label> Total Nodes </label>
            <input className="nodeText" type="number" />
          </div>

          <div className="pricingModel">
            <button type="button" className="btn-primary">
              OnDemand
            </button>
            <button type="button" className="btn-primary">
              Spot
            </button>{" "}
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShow(!show)}
            >
              {" "}
              Reserved{" "}
            </button>
            <div>
              {show ? (
                <div className="Table">
                  <table>
                    <thead>
                      <tr>
                        <th className="rth">Option</th>
                        <th className="rth">1 Year</th>
                        <th className="rth">2 Year</th>
                        <th className="rth">3 Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="rtd">Upfront</td>
                        <td className="rtd">$</td>
                        <td className="rtd">$</td>
                        <td className="rtd">$</td>
                      </tr>
                      <tr className="rtd">
                        <td>Partial</td>
                        <td className="rtd">$</td>
                        <td className="rtd">$</td>
                        <td className="rtd">$</td>
                      </tr>
                      <tr className="rtd">
                        <td>Nonupfront</td>
                        <td className="rtd">$</td>
                        <td className="rtd">$</td>
                        <td className="rtd">$</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
          <table className="priceTable">
            <tr>
              <th className="pth">{props.cloudName}</th>
              <th className="pth">Instance Name</th>
              <th className="pth">vCPU</th>
              <th className="pth">RAM GiB</th>
              <th className="pth">Storage GiB</th>
              <th className="pth">Cost Per Hour(USD)</th>
            </tr>

            <tr>
              <th className="pth">NODE</th>
              {filterInstaceName.map((i) => {
                return (
                  <>
                    <td className="ptd">{i.InstanceType}</td>
                    <td className="ptd">{parseFloat(i.vCPUs)}</td>
                    <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                    <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                    <td className="ptd">
                      {parseFloat(i.OnDemandLinuxpricing_USDperHour)}
                    </td>
                  </>
                );
              })}
            </tr>
          </table>
          <div className="monthlyCost">
            <label>
              <b>OnDemand Cost(Monthly): {onDemonadValue * 730} USD</b>
            </label>
          </div>

          <div className="calculation">
            <label>
              {/* <b>OnDemand Cost(Monthly): 773.8 USD</b> */}
              <label>
                10 instances * 1.06 USD * 24 hours in Day = 25.44 USD (Daily
                OnDemand cost)
              </label>
              <label>
                10 instances * 1.06 USD * 730 hours in month = 773.8 USD
                (monthly OnDemand cost)
              </label>
            </label>
            <label>
              10 instances * 1.06 USD * 8760 hours in year = 9285.6 USD (Yearly
              OnDemand cost)
            </label>
          </div>
          <hr
            style={{
              color: "black",
              height: "1.5px",
            }}
          />

          <div className="nodeHeading">
            <label>
              <h6>
                <b>No. of Master Nodes/HA</b>
              </h6>
            </label>
          </div>
          <div className="rtop">
            <label> Master Nodes </label>
            <input className="nodeText" type="number" />
          </div>

          <table className="priceTable">
            <tr>
              <th className="pth">EKS</th>
              <th className="pth">Instance Name</th>
              <th className="pth">vCPU</th>
              <th className="pth">RAM GiB</th>
              <th className="pth">Storage GiB</th>
              <th className="pth">Cost Per Hour(USD)</th>
            </tr>

            <tr>
              <th className="pth">NODE</th>
              <td className="ptd">e2-standard-4</td>
              <td className="ptd">4</td>
              <td className="ptd">16</td>
              <td className="ptd"></td>
              <td className="ptd">1.06</td>
            </tr>
          </table>
          <div className="monthlyCost">
            <label>
              <b>MasterNode Cost(Monthly): 773.8 USD</b>
            </label>
          </div>

          <div className="calculation">
            <label>
              <label>
                10 instances x 1.06 USD x 24 hours in Day = 25.44 USD (Daily
                OnDemand cost)
              </label>
              <label>
                10 instances x 1.06 USD x 730 hours in month = 773.8 USD
                (monthly OnDemand cost)
              </label>
            </label>
            <label>
              10 instances x 1.06 USD x 8760 hours in year = 9285.6 USD (Yearly
              OnDemand cost)
            </label>
          </div>
          <div>
            <hr
              style={{
                color: "black",
                height: "1.5px",
              }}
            />
          </div>
          <div className="finalCost">
            <label>
              <b>Total Cost(Monthly) = 6497.00 USD</b>
            </label>
          </div>
        </div>
      </center>
    </div>
  );
};
