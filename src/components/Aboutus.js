import React from "react";
import {
  Link
} from "react-router-dom";

export const Aboutus = () => {
  return (
    <div>
      <center style={{ marginTop: "20%" }}>Aboutus</center>

      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </nav>
      </div>


    </div>
  );
};
