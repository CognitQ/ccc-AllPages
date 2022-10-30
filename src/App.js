import React, { useState } from "react";
import { Nav } from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SecondPage from "./components/SecondPage";
import { DetailPage } from "./components/DetailPage";
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
          path="/second"
          element={<SecondPage dpData={deploymentData} dsData={demonsetData} />}
        />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
