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

  //code for fetch gke gkeData
  const [gkeData, fetchGkeData] = useState([]);

  const getGkeData = () => {
    fetch("http://localhost:4000/gcp")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchGkeData(res);
      });
  };

  useEffect(() => {
    getGkeData();
  }, []);
  // Gke fetching ends

  // WorkerNode calculation Starts  here
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

  // Aks Worker Node

  const aksFilterdata = aksData.filter(
    (Idata) => Idata.Cores >= props.vcpu && Idata.RAM >= props.ram
  );

  const aksPeformanceFilterdata = aksData.filter(
    (Idata) =>
      Idata.Cores >= props.peformanceVcpu && Idata.RAM >= props.peformanceRam
  );

  const aksBalanceFilterdata = aksData.filter(
    (Idata) => Idata.Cores >= props.balanceVcpu && Idata.RAM >= props.balanceRam
  );
  const aksCostOfFilterdata = aksFilterdata.map((c) => {
    return parseFloat(c.PayAsYouGo);
  });

  const aksCostOfPerformance = aksPeformanceFilterdata.map((c) => {
    return parseFloat(c.PayAsYouGo);
  });

  const aksCostOfBalance = aksBalanceFilterdata.map((c) => {
    return parseFloat(c.PayAsYouGo);
  });

  const aksMinCost = Math.min(...aksCostOfFilterdata);
  const aksPerformanceCost = Math.min(...aksCostOfPerformance);
  const aksBalanceCost = Math.min(...aksCostOfBalance);

  const aksselectedName = aksFilterdata
    .filter((Instance) => Instance.PayAsYouGo == aksMinCost)
    .slice(0, 1)
    .map((d) => {
      return d.Instance;
    });

  const aksPerformanceName = aksPeformanceFilterdata
    .filter((Instance) => Instance.PayAsYouGo == aksPerformanceCost)
    .slice(0, 1)
    .map((d) => {
      return d.Instance;
    });

  const aksBalanceName = aksBalanceFilterdata
    .filter((Instance) => Instance.PayAsYouGo == aksBalanceCost)
    .slice(0, 1)
    .map((d) => {
      return d.Instance;
    });

  // AKSWorkerNode calculation ends here

  // AksMasterNode calculation Starts here

  const aksMsfilterdata = aksData.filter(
    (Idata) => Idata.Cores >= MsVcpu && Idata.RAM >= MsRam
  );

  const aksMsFilterByCost = aksMsfilterdata.map((c) => {
    return parseFloat(c.PayAsYouGo);
  });

  const aksMsCost = Math.min(...aksMsFilterByCost);

  const aksMsNodeName = aksMsfilterdata
    .filter((Instance) => Instance.PayAsYouGo == aksMsCost)
    .slice(0, 1)
    .map((d) => {
      return d.Instance;
    });

  // AKsMasterNode calculation Ends here

  // gke Worker Node

  const gkeFilterdata = gkeData.filter(
    (Idata) => Idata.vCPUs >= props.vcpu && Idata.Memory >= props.ram
  );

  const gkePeformanceFilterdata = gkeData.filter(
    (Idata) =>
      Idata.vCPUs >= props.peformanceVcpu && Idata.Memory >= props.peformanceRam
  );

  const gkeBalanceFilterdata = gkeData.filter(
    (Idata) =>
      Idata.vCPUs >= props.balanceVcpu && Idata.Memory >= props.balanceRam
  );
  const gkeCostOfFilterdata = gkeFilterdata.map((c) => {
    return parseFloat(c.LinuxOnDemandCost_USDperHour);
  });

  const gkeCostOfPerformance = gkePeformanceFilterdata.map((c) => {
    return parseFloat(c.LinuxOnDemandCost_USDperHour);
  });

  const gkeCostOfBalance = gkeBalanceFilterdata.map((c) => {
    return parseFloat(c.LinuxOnDemandCost_USDperHour);
  });

  const gkeMinCost = Math.min(...gkeCostOfFilterdata);
  const gkePerformanceCost = Math.min(...gkeCostOfPerformance);
  const gkeBalanceCost = Math.min(...gkeCostOfBalance);

  const gkeselectedName = gkeFilterdata
    .filter((Instance) => Instance.LinuxOnDemandCost_USDperHour == gkeMinCost)
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  const gkePerformanceName = gkePeformanceFilterdata
    .filter(
      (Instance) => Instance.LinuxOnDemandCost_USDperHour == gkePerformanceCost
    )
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  const gkeBalanceName = gkeBalanceFilterdata
    .filter(
      (Instance) => Instance.LinuxOnDemandCost_USDperHour == gkeBalanceCost
    )
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  // gkeWorkerNode calculation ends here

  // gkeMasterNode calculation Starts here

  const gkeMsfilterdata = gkeData.filter(
    (Idata) => Idata.vCPUs >= MsVcpu && Idata.Memory >= MsRam
  );

  const gkeMsFilterByCost = gkeMsfilterdata.map((c) => {
    return parseFloat(c.LinuxOnDemandCost_USDperHour);
  });

  const gkeMsCost = Math.min(...gkeMsFilterByCost);

  const gkeMsNodeName = gkeMsfilterdata
    .filter((Instance) => Instance.LinuxOnDemandCost_USDperHour == gkeMsCost)
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  // gkeMasterNode calculation Ends here

  useEffect(() => {
    props.setData(
      minCost,
      performanceCost,
      balanceCost,
      selectedName,
      performanceName,
      balanceName,
      MsCost,
      MsNodeName,
      
      aksMinCost,
      aksPerformanceCost,
      aksBalanceCost,
      aksselectedName,
      aksPerformanceName,
      aksBalanceName,
      aksMsCost,
      aksMsNodeName,

      gkeMinCost,
      gkePerformanceCost,
      gkeBalanceCost,
      gkeselectedName,
      gkePerformanceName,
      gkeBalanceName,
      gkeMsCost,
      gkeMsNodeName
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
            gkeMasterCost={gkeMsCost}
            gkeMasterName={gkeMsNodeName}
            gkeCost={gkeMinCost}
            gkeName={gkeselectedName}
            aksMasterCost={aksMsCost}
            aksMasterName={aksMsNodeName}
            aksCost={aksMinCost}
            aksName={aksselectedName}
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
            eksMasterName={MsNodeName}
            gkeMasterCost={gkeMsCost}
            gkeMasterName={gkeMsNodeName}
            gkeCost={gkePerformanceCost}
            gkeName={gkePerformanceName}
            aksMasterCost={aksMsCost}
            aksMasterName={aksMsNodeName}
            aksCost={aksPerformanceCost}
            aksName={aksPerformanceName}
            ram={props.peformanceRam}
            model="Performance"
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
            gkeMasterCost={gkeMsCost}
            gkeMasterName={gkeMsNodeName}
            gkeCost={gkeBalanceCost}
            gkeName={gkeBalanceName}
            aksMasterCost={aksMsCost}
            aksMasterName={aksMsNodeName}
            aksCost={aksBalanceCost}
            aksName={aksBalanceName}
            ram={props.balanceRam}
            model="Balance"
          />
        </div>
      ) : null}
    </div>
  );
};
