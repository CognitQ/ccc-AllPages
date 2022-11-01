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

  const getDataFromNav = (deploymentData, demonsetData) => {
    setDeployementData(deploymentData);
    setDemonsetData(demonsetData);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav setData={getDataFromNav} />} />
        <Route
          path="/summary"
          element={<SecondPage dpData={deploymentData} dsData={demonsetData} />}
        />
        <Route path="/summary/Least/EksDetail" element={<EksDetails />} />
        <Route path="/summary/Least/AksDetail" element={<AksDetails />} />
        <Route path="/summary/Least/GkeDetail" element={<GkeDetails />} />

        <Route path="/summary/Performance/EksDetail" element={<PerfEksDetail />} />
        <Route path="/summary/Performance/AksDetail" element={<PerfAksDetail />} />
        <Route path="/summary/Performance/GkeDetail" element={<PerfGkeDetail />} />

        <Route path="/summary/Balance/EksDetail" element={<BalEksDetail/>} />
        <Route path="/summary/Balance/AksDetail" element={<BalAksDetail />} />
        <Route path="/summary/Balance/GkeDetail" element={<BalGkeDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
