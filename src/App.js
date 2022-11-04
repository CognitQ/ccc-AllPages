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

  const getDataFromNav = (deploymentData, demonsetData) => {
    setDeployementData(deploymentData);
    setDemonsetData(demonsetData);
  };

  const getDataFromID = (cost_Name, balance_Name, performance_Name) => {
    setBalanceIName(balance_Name);
    setCostIName(cost_Name);
    setPeformanceIName(performance_Name);
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
            />
          }
        />
        <Route path="/summary/Least/AksDetail" element={<AksDetails />} />
        <Route path="/summary/Least/GkeDetail" element={<GkeDetails />} />

        <Route
          path="/summary/Performance/EksDetail"
          element={<PerfEksDetail instanceNameForDetails={peformance_IName} />}
        />
        <Route
          path="/summary/Performance/AksDetail"
          element={<PerfAksDetail />}
        />
        <Route
          path="/summary/Performance/GkeDetail"
          element={<PerfGkeDetail />}
        />

        <Route
          path="/summary/Balance/EksDetail"
          element={<BalEksDetail instanceNameForDetails={balance_IName} />}
        />
        <Route path="/summary/Balance/AksDetail" element={<BalAksDetail />} />
        <Route path="/summary/Balance/GkeDetail" element={<BalGkeDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
