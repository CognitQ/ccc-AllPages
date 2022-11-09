import React, { useState } from "react";
import { Nav } from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SecondPage from "./components/SecondPage";
import { EksDetails } from "./components/Details/EksDetails";
import { AksDetails } from "./components/Details/AksDetails";
import { GkeDetails } from "./components/Details/GkeDetails";

import { PerfEksDetail } from "./components/Details/PerfEksDetail";
import { PerfAksDetail } from "./components/Details/PerfAksDetail";
import { PerfGkeDetail } from "./components/Details/PerfGkeDetail";

import { BalEksDetail } from "./components/Details/BalEksDetail";
import { BalAksDetail } from "./components/Details/BalAksDetail";
import { BalGkeDetail } from "./components/Details/BalGkeDetail";
// import Graph from "./components/Graph";

const App = () => {
  const [deploymentData, setDeployementData] = useState([]);
  const [demonsetData, setDemonsetData] = useState([]);

  const [cost_IName, setCostIName] = useState();
  const [balance_IName, setBalanceIName] = useState();
  const [peformance_IName, setPeformanceIName] = useState();
  const [master_IName, setMasterIName] = useState();

  const [akscost_IName, setaksCostIName] = useState();
  const [aksbalance_IName, setaksBalanceIName] = useState();
  const [akspeformance_IName, setaksPeformanceIName] = useState();
  const [aksmaster_IName, setaksMasterIName] = useState();

  const [gkecost_IName, setGkeCostIName] = useState();
  const [gkebalance_IName, setGkeBalanceIName] = useState();
  const [gkepeformance_IName, setGkePeformanceIName] = useState();
  const [gkemaster_IName, setGkeMasterIName] = useState();

  const getDataFromNav = (deploymentData, demonsetData) => {
    setDeployementData(deploymentData);
    setDemonsetData(demonsetData);
  };

  const getDataFromID = (
    cost_Name,
    balance_Name,
    performance_Name,
    master_Name,

    akscost_Name,
    aksbalance_Name,
    aksperformance_Name,
    aksmaster_Name,

    gkecost_Name,
    gkebalance_Name,
    gkeperformance_Name,
    gkemaster_Name
  ) => {
    setBalanceIName(balance_Name);
    setCostIName(cost_Name);
    setPeformanceIName(performance_Name);
    setMasterIName(master_Name);

    setaksBalanceIName(aksbalance_Name);
    setaksCostIName(akscost_Name);
    setaksPeformanceIName(aksperformance_Name);
    setaksMasterIName(aksmaster_Name);

    setGkeBalanceIName(gkebalance_Name);
    setGkeCostIName(gkecost_Name);
    setGkePeformanceIName(gkeperformance_Name);
    setGkeMasterIName(gkemaster_Name);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav setData={getDataFromNav} />} />
        <Route
          path="/summary"
          element={
            <SecondPage
              dpData={deploymentData}
              setInstanceNameInApp={getDataFromID}
              dsData={demonsetData}
            />
          }
        />
        <Route
          path="/summary/Least/EksDetail"
          element={
            <EksDetails
              detailForPods={deploymentData}
              instanceNameForDetails={cost_IName}
              masterNodeName={master_IName}
            />
          }
        />
        <Route
          path="/summary/Least/AksDetail"
          element={
            <AksDetails
              detailForPods={deploymentData}
              instanceNameForDetails={akscost_IName}
              masterNodeName={aksmaster_IName}
            />
          }
        />
        <Route
          path="/summary/Least/GkeDetail"
          element={
            <GkeDetails
              detailForPods={deploymentData}
              instanceNameForDetails={gkecost_IName}
              masterNodeName={gkemaster_IName}
            />
          }
        />

        <Route
          path="/summary/Performance/EksDetail"
          element={
            <PerfEksDetail
              detailForPods={deploymentData}
              masterNodeName={master_IName}
              instanceNameForDetails={peformance_IName}
            />
          }
        />
        <Route
          path="/summary/Performance/AksDetail"
          element={
            <PerfAksDetail
              detailForPods={deploymentData}
              masterNodeName={aksmaster_IName}
              instanceNameForDetails={akspeformance_IName}
            />
          }
        />
        <Route
          path="/summary/Performance/GkeDetail"
          element={
            <PerfGkeDetail
              detailForPods={deploymentData}
              masterNodeName={gkemaster_IName}
              instanceNameForDetails={gkepeformance_IName}
            />
          }
        />

        <Route
          path="/summary/Balance/EksDetail"
          element={
            <BalEksDetail
              detailForPods={deploymentData}
              instanceNameForDetails={balance_IName}
              masterNodeName={master_IName}
            />
          }
        />
        <Route
          path="/summary/Balance/AksDetail"
          element={
            <BalAksDetail
              detailForPods={deploymentData}
              instanceNameForDetails={aksbalance_IName}
              masterNodeName={aksmaster_IName}
            />
          }
        />
        <Route
          path="/summary/Balance/GkeDetail"
          element={
            <BalGkeDetail
              detailForPods={deploymentData}
              instanceNameForDetails={gkebalance_IName}
              masterNodeName={gkemaster_IName}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
