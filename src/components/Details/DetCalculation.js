import React from "react";
import "./DetailPages.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const DetCalculation = (props) => {
  const [show, setShow] = useState(false);

  const [node, setNode] = useState();
  const intNode = parseInt(node);

  const [Ms_node, setMsNode] = useState();
  const intMsNode = parseInt(Ms_node);

  const [OnDemand, setOnDemand] = useState(true);
  const [Spot, setSpot] = useState(false);

  const [Upfront1Y, setUpfront1Y] = useState(false);
  const [Partial1Y, setPartial1Y] = useState(false);
  const [NoUpfront1Y, setNoUpfront1Y] = useState(false);
  const [Upfront3Y, setUpfront3Y] = useState(false);
  const [Partial3Y, setPartial3Y] = useState(false);
  const [NoUpfront3Y, setNoUpfront3Y] = useState(false);

  // const totalNoNodes = props.totalNodes;

  // max Pods
  const depolymentPods = props.totalNodes.map((object) => {
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
  const TotalNoNodes = noOfNodesPerDep.reduce(
    (result, number) => result + number
  );
  //end of pods

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
    setNode(TotalNoNodes);
    setMsNode(1);
  }, []);

  const filterInstaceName = data.filter(
    (name) => name.InstanceType === props.instanceName
  );

  const onDemonadValue = data
    .filter((name) => name.InstanceType === props.instanceName)
    .map((c) => {
      return parseFloat(c.OnDemandLinuxpricing_USDperHour);
    });

  const OnDemandClick = () => {
    setOnDemand(true);
    setSpot(false);
    setUpfront1Y(false);
    setPartial1Y(false);
    setNoUpfront1Y(false);
    setUpfront3Y(false);
    setPartial3Y(false);
    setNoUpfront3Y(false);
    setShow(false);
  };
  const OnSpotClick = () => {
    setOnDemand(false);
    setSpot(true);
    setUpfront1Y(false);
    setPartial1Y(false);
    setNoUpfront1Y(false);
    setUpfront3Y(false);
    setPartial3Y(false);
    setNoUpfront3Y(false);
    setShow(false);
  };

  const Upfront1y = () => {
    setOnDemand(false);
    setSpot(false);
    setUpfront1Y(true);
    setPartial1Y(false);
    setNoUpfront1Y(false);
    setUpfront3Y(false);
    setPartial3Y(false);
    setNoUpfront3Y(false);
  };
  const Partial1y = () => {
    setOnDemand(false);
    setSpot(false);
    setUpfront1Y(false);
    setPartial1Y(true);
    setNoUpfront1Y(false);
    setUpfront3Y(false);
    setPartial3Y(false);
    setNoUpfront3Y(false);
  };
  const NoUpfront1y = () => {
    setOnDemand(false);
    setSpot(false);
    setUpfront1Y(false);
    setPartial1Y(false);
    setNoUpfront1Y(true);
    setUpfront3Y(false);
    setPartial3Y(false);
    setNoUpfront3Y(false);
  };
  const Upfront3y = () => {
    setOnDemand(false);
    setSpot(false);
    setUpfront1Y(false);
    setPartial1Y(false);
    setNoUpfront1Y(false);
    setUpfront3Y(true);
    setPartial3Y(false);
    setNoUpfront3Y(false);
  };
  const Partial3y = () => {
    setOnDemand(false);
    setSpot(false);
    setUpfront1Y(false);
    setPartial1Y(false);
    setNoUpfront1Y(false);
    setUpfront3Y(false);
    setPartial3Y(true);
    setNoUpfront3Y(false);
  };
  const NoUpfront3y = () => {
    setOnDemand(false);
    setSpot(false);
    setUpfront1Y(false);
    setPartial1Y(false);
    setNoUpfront1Y(false);
    setUpfront3Y(false);
    setPartial3Y(false);
    setNoUpfront3Y(true);
  };

  // masternode filtering
  const MsNodeFIlter = data.filter((name) => name.InstanceType == props.MsNode);

  const Ms_Cost = data
    .filter((name) => name.InstanceType === props.MsNode)
    .map((c) => {
      return parseFloat(c.OnDemandLinuxpricing_USDperHour);
    });

  const Ms_No_Nodes = () => {
    if (Ms_node % 2 == 0) {
      alert("Number of Master nodes cant be even or blank");
      setMsNode(parseInt(Ms_node) + 1);
    }
  };

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
              min={TotalNoNodes}
              value={node}
              onChange={(e) => setNode(e.target.value)}
              onBlur={(e) => {
                alert(
                  "your pods need at least " + { TotalNoNodes } + " node to run"
                );
              }}
            />
          </div>

          <div className="pricingModel">
            <button
              type="button"
              className="btn-primary"
              onClick={OnDemandClick}
            >
              OnDemand
            </button>{" "}
            <button type="button" className="btn-primary" onClick={OnSpotClick}>
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
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={Upfront1y}
                  >
                    1Year-UpFront
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={Partial1y}
                  >
                    1Year-Partial
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={NoUpfront1y}
                  >
                    1Year-NoUpFront
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={Upfront3y}
                  >
                    3Year-UpFront
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={Partial3y}
                  >
                    3Year-Partial
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={NoUpfront3y}
                  >
                    3Year-NoUpFront
                  </button>
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

              {OnDemand ? (
                <>
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

              {Spot ? (
                <>
                  {filterInstaceName.map((i) => {
                    return (
                      <>
                        <td className="ptd">{i.InstanceType}</td>
                        <td className="ptd">{parseFloat(i.vCPUs)}</td>
                        <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                        <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                        <td className="ptd">{parseFloat(i.spot_USDperHour)}</td>
                      </>
                    );
                  })}
                </>
              ) : null}
              {Upfront1Y ? (
                <>
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

              {Partial1Y ? (
                <>
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

              {NoUpfront1Y ? (
                <>
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

              {Upfront3Y ? (
                <>
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

              {Partial3Y ? (
                <>
                  {filterInstaceName.map((i) => {
                    return (
                      <>
                        <td className="ptd">{i.InstanceType}</td>
                        <td className="ptd">{parseFloat(i.vCPUs)}</td>
                        <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                        <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                        <td className="ptd">
                          {parseFloat(i.reserved3yearPartial_USDperHour)}
                        </td>
                      </>
                    );
                  })}
                </>
              ) : null}

              {NoUpfront3Y ? (
                <>
                  {filterInstaceName.map((i) => {
                    return (
                      <>
                        <td className="ptd">{i.InstanceType}</td>
                        <td className="ptd">{parseFloat(i.vCPUs)}</td>
                        <td className="ptd">{parseFloat(i.MemoryInGiB)}</td>
                        <td className="ptd">{parseFloat(i.StorageInGiB)}</td>
                        <td className="ptd">
                          {parseFloat(i.reserved3yearNoUpfront_USDperHour)}
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

          {/* Master Node Started */}

          <div className="nodeHeading">
            <label>
              <h6>
                <b>No. of Master Nodes/HA</b>
              </h6>
            </label>
          </div>
          <div className="rtop">
            <label> Master Nodes </label>
            <input
              className="nodeText"
              type="number"
              min="1"
              value={Ms_node}
              onChange={(e) => setMsNode(e.target.value)}
              onBlur={Ms_No_Nodes}
            />
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
              <td className="ptd">{props.MsNode}</td>
              {MsNodeFIlter.map((d) => (
                <>
                  <td className="ptd">{d.vCPUs} </td>
                  <td className="ptd">{d.MemoryInGiB}</td>
                  <td className="ptd">{d.StorageInGiB}</td>
                  <td className="ptd">{d.OnDemandLinuxpricing_USDperHour}</td>
                </>
              ))}
            </tr>
          </table>
          <div className="monthlyCost">
            <label>
              <b>MasterNode Cost(Monthly): {(Ms_Cost * 730).toFixed(3)} USD</b>
            </label>
          </div>

          <div className="calculation">
            <label>
              <label>
                {Ms_node} instances x {Ms_Cost} USD x 24 hours in Day ={" "}
                {(Ms_node * Ms_Cost * 24).toFixed(3)}
                USD (Daily OnDemand cost)
              </label>
              <label>
                {Ms_node} instances x {Ms_Cost} USD x 730 hours in month ={" "}
                {(Ms_node * Ms_Cost * 730).toFixed(3)}
                USD (monthly OnDemand cost)
              </label>
            </label>
            <label>
              {Ms_node} instances x {Ms_Cost} USD x 8760 hours in year ={" "}
              {(Ms_node * Ms_Cost * 8760).toFixed(3)}
              USD (Yearly OnDemand cost)
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
              <b>
                Total Cost(Monthly) ={" "}
                {(
                  intNode * onDemonadValue * 730 +
                  Ms_Cost * Ms_node * 730
                ).toFixed(3)}{" "}
                USD
              </b>
            </label>
          </div>
        </div>
      </center>
    </div>
  );
};
