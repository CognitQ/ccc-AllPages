import React from "react";
import "./DetailPages.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const AksCalculation = (props) => {
  const [show, setShow] = useState(false);

  const [node, setNode] = useState();
  const intNode = parseInt(node);

  const [OnDemand, setOnDemand] = useState(true);
const [Spot, setSpot] = useState(false);

const [Monthly1Y, setMonthly1Y] = useState(false);
const [Upfront1Y, setUpfront1Y] = useState(false);
const [Monthly3Y, setMonthly3Y] = useState(false);
const [Upfront3Y, setUpfront3Y] = useState(false);

  const totalNoNodes = props.totalNodes;

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
    setNode(totalNoNodes);
  }, []);

  const filterInstaceName = data.filter(
    (name) => name.InstanceType === props.instanceName
  );

  const onDemonadValue = data
    .filter((name) => name.InstanceType === props.instanceName)
    .map((c) => {
      return parseFloat(c.OnDemandLinuxpricing_USDperHour),
      parseFloat(c.spot_USDperHour),
      parseFloat(c.reserved1yearUpfront_USDperHour),
      parseFloat(c.reserved1yearPartial_USDperHour),
      parseFloat(c.reserved1yearNoUpfront_USDperHour),
      parseFloat(c.reserved3yearUpfront_USDperHour),
      parseFloat(c.reserved3yearPartial_USDperHour),
      parseFloat(c.reserved3yearNoUpfront_USDperHour);
    });



    const OnDemandClick = () => {
      setOnDemand(true);
      setSpot(false);
      setMonthly1Y(false);
      setUpfront1Y(false);
      setMonthly3Y(false);
      setUpfront3Y(false);
      setShow(false);
    }
    const OnSpotClick = () => {
      setOnDemand(false);
      setSpot(true);
      setMonthly1Y(false);
      setUpfront1Y(false);
      setMonthly3Y(false);
      setUpfront3Y(false);
      setShow(false);
    }
    
    const Monthly1yClick=()=>{
      setOnDemand(false);
      setSpot(false);
      setMonthly1Y(true);
      setUpfront1Y(false);
      setMonthly3Y(false);
      setUpfront3Y(false);
    }
    
    const Upfront1yClick = () => {
      setOnDemand(false);
      setSpot(false);
      setMonthly1Y(false);
      setUpfront1Y(true);
      setMonthly3Y(false);
      setUpfront3Y(false);
    }
    const Monthly3yClick = () => {
      setOnDemand(false);
      setSpot(false);
      setMonthly1Y(false);
      setUpfront1Y(false);
      setMonthly3Y(true);
      setUpfront3Y(false);
    }
    const Upfront3yClick = () => {
      setOnDemand(false);
      setSpot(false);
      setMonthly1Y(false);
      setUpfront1Y(false);
      setMonthly3Y(false);
      setUpfront3Y(true);
    }
        

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
            <input
              className="nodeText"
              type="number"
              min={totalNoNodes}
              value={node}
              onChange={(e) => setNode(e.target.value)}
              onBlur={(e) => {
                "filed is required";
              }}
            />
          </div>


          <div className="pricingModel">
            <button type="button" className="btn-primary" onClick={OnDemandClick}>
              OnDemand
            </button>{" "}
            <button type="button" className="btn-primary" onClick={OnSpotClick} >
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
                <div className="reserveButton">
                  <button type="button" class="btn btn-secondary btn-sm" onClick={Monthly1yClick}>1Year-UpFront</button>
                  <button type="button" class="btn btn-secondary btn-sm" onClick={Upfront1yClick}>1Year-Partial</button>
                  <button type="button" class="btn btn-secondary btn-sm" onClick={Monthly3yClick}>1Year-NoUpFront</button>
                  <button type="button" class="btn btn-secondary btn-sm" onClick={Upfront3yClick}>3Year-UpFront</button>
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
              
                {OnDemand ? 
                (<>
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
              </>

              ) : null}

                {Spot ? (<>
              {filterInstaceName.map((i) => {
                return (
                  <>
                    <td className="ptd">{i.InstanceType}</td>
                    <td className="ptd">{parseFloat(i.vCPUs)}</td>
                    <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                    <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                    <td className="ptd">
                      {parseFloat(i.spot_USDperHour)}
                    </td> 
                  </>
                );
              })}
              </>

                ) : null}
                {Monthly1Y ? (<>
              {filterInstaceName.map((i) => {
                return (
                  <>
                    <td className="ptd">{i.InstanceType}</td>
                    <td className="ptd">{parseFloat(i.vCPUs)}</td>
                    <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                    <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                    <td className="ptd">
                      {parseFloat(i.reserved1yearUpfront_USDperHour)}
                    </td> 
                  </>
                );
              })}
              </>

                ) : null}

                {Upfront1Y ? (<>
              {filterInstaceName.map((i) => {
                return (
                  <>
                    <td className="ptd">{i.InstanceType}</td>
                    <td className="ptd">{parseFloat(i.vCPUs)}</td>
                    <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                    <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                    <td className="ptd">
                      {parseFloat(i.reserved1yearPartial_USDperHour)}
                    </td> 
                  </>
                );
              })}
              </>
                ) : null}
                
                {Monthly3Y ? (<>
              {filterInstaceName.map((i) => {
                return (
                  <>
                    <td className="ptd">{i.InstanceType}</td>
                    <td className="ptd">{parseFloat(i.vCPUs)}</td>
                    <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                    <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                    <td className="ptd">
                      {parseFloat(i.reserved1yearNoUpfront_USDperHour)}
                    </td> 
                  </>
                );
              })}
              </>
                ) : null}

                {Upfront3Y ? (<>
              {filterInstaceName.map((i) => {
                return (
                  <>
                    <td className="ptd">{i.InstanceType}</td>
                    <td className="ptd">{parseFloat(i.vCPUs)}</td>
                    <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                    <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                    <td className="ptd">
                      {parseFloat(i.reserved3yearUpfront_USDperHour)}
                    </td> 
                  </>
                );
              })}
              </>
                ) : null}
                
            
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
                {intNode} instances * {onDemonadValue} USD * 24 hours in Day ={" "}
                {(intNode * onDemonadValue * 24).toFixed(3)} USD (Daily OnDemand
                cost)
              </label>
              <label>
                {intNode} instances * {onDemonadValue} USD * 730 hours in month
                = {(intNode * onDemonadValue * 730).toFixed(3)} USD (monthly
                OnDemand cost)
              </label>
            </label>
            <label>
              {intNode} instances * {onDemonadValue} USD * 8760 hours in year =
              {(intNode * onDemonadValue * 8760).toFixed(3)} USD (Yearly
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










