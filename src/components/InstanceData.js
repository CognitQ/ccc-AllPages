import React from "react";
import { useState, useEffect } from "react";
import { Table } from "./Table";
import "./InstanceData.css";
export const InstanceData = (props) => {
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

  const [bestCost, setCost] = useState(true);
  const [balance, setBalance] = useState(false);
  const [bestPeformance, setPeformance] = useState(false);

  const showBestCost = () => {
    setBalance(false);
    setPeformance(false);
    setCost(true);
  };

  const showBalance = () => {
    setBalance(true);
    setPeformance(false);
    setCost(false);
  };

  const showBestPeformance = () => {
    setBalance(false);
    setPeformance(true);
    setCost(false);
  };

  const filterdata = data.filter(
    (Idata) => Idata.vCPUs >= props.vcpu && Idata.MemoryInGiB >= props.ram
  );

  const peformanceFilterdata = data.filter(
    (Idata) =>
      Idata.vCPUs >= props.peformanceVcpu &&
      Idata.MemoryInGiB >= props.peformanceRam
  );

  const balanceFilterdata = data.filter(
    (Idata) =>
      Idata.vCPUs >= props.balanceVcpu && Idata.MemoryInGiB >= props.balanceRam
  );
  const CostOfFilterdata = filterdata.map((c) => {
    return parseFloat(c.OnDemandLinuxpricing_USDperHour);
  });

  const CostOfPerformance = peformanceFilterdata.map((c) => {
    return parseFloat(c.OnDemandLinuxpricing_USDperHour);
  });

  const CostOfBalance = balanceFilterdata.map((c) => {
    return parseFloat(c.OnDemandLinuxpricing_USDperHour);
  });

  const minCost = Math.min(...CostOfFilterdata);
  const performanceCost = Math.min(...CostOfPerformance);
  const balanceCost = Math.min(...CostOfBalance);

  const selectedName = filterdata
    .filter((Instance) => Instance.OnDemandLinuxpricing_USDperHour == minCost)
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  const performanceName = peformanceFilterdata
    .filter(
      (Instance) => Instance.OnDemandLinuxpricing_USDperHour == performanceCost
    )
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  const balanceName = balanceFilterdata
    .filter(
      (Instance) => Instance.OnDemandLinuxpricing_USDperHour == balanceCost
    )
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  props.setData(minCost, performanceCost, balanceCost);
  // const noOfInsancesForCost = () => {
  //   if (props.pods > 110) {
  //     return props.pods / 110;
  //   } else {
  //     return 1;
  //   }
  // };

  // const noOfInstancesPerformance = () => {
  //   if (props.pods > 77) {
  //     return props.pods / 77;
  //   } else {
  //     return 1;
  //   }
  // };

  // const bestCost = minCost * noOfInsancesForCost() * 730;
  // const bestpeformance = minCost * noOfInstancesPerformance() * 730;

  return (
    <div>
      <ul>
        {/* {filterdata
          .filter(
            (Instance) => Instance.OnDemandLinuxpricing_USDperHour === minCost
          )
          .slice(0, 1)
          .map((d) => {
            return (
              <li key={d.id}>
                name = {d.InstanceType}, vcpu = {d.vCPUs}, MemoryInGiB =
                {d.MemoryInGiB} cost ={d.OnDemandLinuxpricing_USDperHour}
              </li>
            );
          })} */}
      </ul>

      <div className="graph">
        <div className="innerGraph">
          <button
            type="button"
            className="btn btn-primary btn-sm btnLeast"
            onClick={showBestCost}
          >
            BestCost
          </button>
        </div>
        <div className="innerGraph">
          <button
            type="button"
            className="btn btn-primary btn-sm btnLeast"
            onClick={showBestPeformance}
          >
            BestPeformance
          </button>
        </div>
        <div className="innerGraph">
          <button
            className="btn btn-primary btn-sm btnLeast"
            onClick={showBalance}
            type="button"
          >
            Balance
          </button>
        </div>
      </div>
      {bestCost ? (
        <div>
          <Table
            eksCost={minCost}
            eksName={selectedName}
            gkeCost={minCost}
            gkeName={selectedName}
            aksCost={minCost}
            aksName={selectedName}
            ram={props.ram}
          />
        </div>
      ) : null}

      {bestPeformance ? (
        <div>
          <Table
            eksCost={performanceCost}
            eksName={performanceName}
            gkeCost={minCost}
            gkeName={selectedName}
            aksCost={minCost}
            aksName={selectedName}
            ram={props.performanceRam}
          />
        </div>
      ) : null}
      {balance ? (
        <div>
          <Table
            eksCost={balanceCost}
            eksName={balanceName}
            gkeCost={minCost}
            gkeName={selectedName}
            aksCost={minCost}
            aksName={selectedName}
            ram={props.balanceRam}
          />
        </div>
      ) : null}
    </div>
  );
};
