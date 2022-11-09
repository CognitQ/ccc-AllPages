import React from "react";
import { useState, useEffect } from "react";
import { Table } from "./Table";
import "./InstanceData.css";

export const InstanceData = (props) => {
  //code for fetch aws data
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
// aws fetching ends

//code for fetch aks aksData
const [aksData, fetchAksData] = useState([]);

const getAksData = () => {
  fetch("http://localhost:4000/aks")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      fetchAksData(res);
    });
};

useEffect(() => {
  getAksData();
}, []);
// aks fetching ends


  // WorkerNode calculation Starts  here
  const [bestCost, setCost] = useState(true);
  const [balance, setBalance] = useState(false);
  const [bestPeformance, setPeformance] = useState(false);

  const showBestCost = () => {
    setBalance(false);
    setPeformance(false);
    setCost(true);
    // alert("clicked");
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

  // WorkerNode calculation ends here

  // MasterNode calculation Starts here

  const nodes = props.totalNodes / 2;
  const MsVcpu = 2 * nodes;
  const MsRam = 5 * nodes;

  const Msfilterdata = data.filter(
    (Idata) =>
      Idata.DedicatedHostSupport === "TRUE" &&
      Idata.vCPUs >= MsVcpu &&
      Idata.MemoryInGiB >= MsRam
  );

  const MsFilterByCost = Msfilterdata.map((c) => {
    return parseFloat(c.OnDemandLinuxpricing_USDperHour);
  });

  const MsCost = Math.min(...MsFilterByCost);

  const MsNodeName = Msfilterdata.filter(
    (Instance) => Instance.OnDemandLinuxpricing_USDperHour == MsCost
  )
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  // MasterNode calculation Ends here
  useEffect(() => {
    props.setData(
      minCost,
      performanceCost,
      balanceCost,
      selectedName,
      performanceName,
      balanceName,
      MsCost,
      MsNodeName
    );
  }, [selectedName, performanceName, balanceName, MsNodeName]);

  return (
    <div>
      {/* <ul>
        {MsFilterByCost
          .filter(
            (Instance) =>
            Instance.DedicatedHostSupport === "TRUE" &&
              Instance.vCPUs >= MsVcpu &&
              Instance.MemoryInGiB >= MsRam
          )
          .slice(0, 1)
          .map((d) => {
            return (
              <li key={d.id}>
              name = {d.InstanceType}, vcpu = {d.vCPUs}, MemoryInGiB =
              {d.MemoryInGiB} cost ={d.OnDemandLinuxpricing_USDperHour}
              </li>
              );
            })}
          </ul> */}
      {/* <h3>node / 2 = {nodes}</h3>
      <h3>Msvcpu = {MsVcpu}</h3>
      <h3>MsRam = {MsRam}</h3>

      <h3>
        cost={MsCost}
      </h3> */}

      <div className="graph">
        <div className="innerGraph">

        <button
          className="btn btn-primary btn-sm btnLeast"
          // onClick={testing}
          onClick={showBestCost}
          type="button"
        >
          BestCost
        </button>
        </div>
        <div className="innerGraph">
          <button
            type="button"
            className="btn btn-primary btn-sm btnLeast"
            onClick={showBestPeformance}

            // onClick={testing}
          >
            BestPeformance
          </button>
        </div>
        <div className="innerGraph">
        <button
          className="btn btn-primary btn-sm btnLeast"
          // onClick={testing}
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
            eksMasterCost={MsCost}
            eksMasterName={MsNodeName}
            gkeCost={minCost}
            gkeName={selectedName}
            gkeMasterName={MsNodeName}
            gkeMasterCost={MsCost}
            aksMasterCost={MsCost}
            aksMasterName={MsNodeName}
            aksCost={minCost}
            aksName={selectedName}
            ram={props.ram}
            model="Cost"
          />
        </div>
      ) : null}
      {bestPeformance ? (
        <div>
          <Table
            eksCost={performanceCost}
            eksName={performanceName}
            eksMasterCost={MsCost}
            gkeCost={minCost}
            gkeName={selectedName}
            gkeMasterName={MsNodeName}
            gkeMasterCost={MsCost}
            aksMasterCost={MsCost}
            aksMasterName={MsNodeName}
            aksCost={minCost}
            aksName={selectedName}
            ram={props.peformanceRam}
            model="Performance"
            eksMasterName={MsNodeName}
          />
        </div>
      ) : null}
      {balance ? (
        <div>
          <Table
            eksCost={balanceCost}
            eksName={balanceName}
            eksMasterCost={MsCost}
            eksMasterName={MsNodeName}
            gkeCost={minCost}
            gkeName={selectedName}
            gkeMasterCost={MsCost}
            aksMasterCost={MsCost}
            aksCost={minCost}
            aksName={selectedName}
            ram={props.balanceRam}
            model="Balance"
          />
        </div>
      ) : null}
    </div>
  );
};
