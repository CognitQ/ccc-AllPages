import React, { useState } from "react";
import { InputForm } from "./InputForm";
import { Aboutus } from "./Aboutus";
import { Testing } from "./Testing";
// import {Link} from "react-router-dom";

export const Nav = () => {
  const [showHome, setHomeShow] = useState(true); //code for deployment

  const [dataValues, setData] = useState([]);

  const getData = (data) => {
    console.log("coming from nav.js", data);
    setData(data);
  };

  return (
    <div>
       {/* <Nav>
        <div>
          <ul>
            <li>
          <Link to="/">Home</Link></li>
          <li>
          <Link to="/About">Home</Link></li>
          </ul>
        </div>
      </Nav> */}



      <div className="nav">
        <button
          type="button"
          onClick={() => setHomeShow(true)}
          className="btn btn-outline-primary"
        >
          Home
        </button>{" "}
        <button
          type="button"
          onClick={() => setHomeShow(false)}
          className="btn btn-outline-primary"
        >
          About Us
        </button>
      </div>
     

      <div>
        {showHome ? (
          <div className="App">
            <InputForm ondataSubmit={getData} />
          </div>
        ) : (
          <div className="App">
            <Aboutus />
            <Testing data={dataValues} />
          </div>
        )}
      </div>
    </div>
  );
};
