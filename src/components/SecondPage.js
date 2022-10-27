import React from 'react'
import "./SecondPage.css"
import { navigate, useNavigate } from 'react-router-dom';
import {
    Link
  } from "react-router-dom";

const SecondPage = () => {
    const navigate = useNavigate();

    const gotoDetail = () => {
      navigate('/detail')
    };

    return (
        <div>
             <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/second">SecondPage</Link>
            </li>
          </ul>
        </nav>
      </div>

            <center>
                <table className="table table-striped table-hover table-bordered table">
                    <thead className="tHead">
                        <tr>
                            <th scope="col"  className="tHeading">Least Price</th>
                            <th scope="col">Cost Of Worker Nodes
                                Per month($)</th>
                            <th scope="col">Cost of Master Node
                                Per month($)</th>
                            <th scope="col">Grand Total
                                Per month($)</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">EKS</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td><button className="btn btn-link tButton" onClick={() => gotoDetail()}>show Details </button></td>
                        </tr>
                        <tr>
                            <th scope="row">AKS</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td><button className="btn btn-link" onClick={() => gotoDetail()}>show Details </button></td>
                        </tr>
                        <tr>
                            <th scope="row">GKE</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td><button className="btn btn-link" onClick={() => gotoDetail()}>show Details </button></td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </div>
    )
}

export default SecondPage
