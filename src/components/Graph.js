import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
} from "recharts";
import "./Graph.css";

const Graph = (props) => {
  const cost = parseFloat(props.workerCost);
  const Mscost = parseFloat(props.masterCost);
  const akscost = parseFloat(props.aksworkerCost);
  const aksMscost = parseFloat(props.aksmasterCost);
  const gkecost = parseFloat(props.gkeworkerCost);
  const gkeMscost = parseFloat(props.gkemasterCost);
  // Sample data
  const dataLeast = [
    {
      name: "EKS",
      MasterNode: Mscost,
      WorkerNode: cost,
    },
    { name: "AKS", MasterNode: aksMscost, WorkerNode: akscost },
    { name: "GKE", MasterNode: gkeMscost, WorkerNode: gkecost },
  ];

  return (
    <div className="container">
      <div className="barbox" style={{ display: "flex", flexDirection: "row" }}>
        <BarChart width={300} height={250} data={dataLeast} barSize={22}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis
            tick={false}
            label={{ value: "Price $", angle: -90, position: "Left" }}
          />
          <Tooltip
            wrapperStyle={{
              width: "fit-content",
              backgroundColor: "#ccc",
              fontSize: "8px",
            }}
          />
          <Legend
            width={70}
            wrapperStyle={{
              top: 5,
              right: -50,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 2,
              lineHeight: "10px",
              text: "5px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="MasterNode" stackId="a" fill="blue" />
          <Bar dataKey="WorkerNode" stackId="a" fill="grey">
            <LabelList position="top" />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Graph;
