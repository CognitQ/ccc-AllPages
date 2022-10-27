import React from "react";
import {Nav} from "./components/Nav";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SecondPage from "./components/SecondPage";
import {DetailPage} from "./components/DetailPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>} />
        <Route path="/second" element={<SecondPage/>} />
        <Route path="/detail" element={<DetailPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
