import React, { useState } from "react";
import { Nav } from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SecondPage from "./components/SecondPage";
import { EksDetails } from "./components/EksDetails";
import { AksDetails } from "./components/AksDetails";
import { GkeDetails } from "./components/GkeDetails";
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
        <Route path="/summary/EksDetails" element={<EksDetails />} />
        <Route path="/summary/AksDetails" element={<AksDetails />} />
        <Route path="/summary/GkeDetails" element={<GkeDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
