import React from "react";
import { useState, useEffect } from "react";
import { Table } from "./Table";

export const InstanceData = (props) => {
  //code for fetch data
  const [data, fetchData] = useState([]);

  const getData = () => {
    fetch("http://localhost:4000/aws")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const filterdata = data.filter(
    (Idata) => Idata.vCPUs >= props.vcpu && Idata.MemoryInGiB >= props.ram
  );

  const CostOfFilterdata = filterdata.map((c) => {
    return parseFloat(c.OnDemandLinuxpricing_USDperHour);
  });

  const minCost = Math.min(...CostOfFilterdata);

  // const selected = filterdata.map((object) => {
  //   if (object.OnDemandLinuxpricing_USDperHour === minCost) {
  //     return object;
  //   }
  // });

  const selectedPrice = filterdata
    .filter((Instance) => Instance.OnDemandLinuxpricing_USDperHour == minCost)
    .slice(0, 1)
    .map((d) => {
      return d.OnDemandLinuxpricing_USDperHour;
    });

  const selectedName = filterdata
    .filter((Instance) => Instance.OnDemandLinuxpricing_USDperHour == minCost)
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  return (
    <div>
      <div>{minCost}</div>
      <ul>
        {/* {filterdata
          .filter(
            (Instance) => Instance.OnDemandLinuxpricing_USDperHour == minCost
          )
          .slice(0, 1)
          .map((d) => {
            return (
              // <li key={d.id}>
              //   name = {d.InstanceType}, vcpu = {d.vCPUs}, MemoryInGiB =
              //   {d.MemoryInGiB} cost ={d.OnDemandLinuxpricing_USDperHour}
              // </li>

              <Table cloudName="AWS" cost={d.OnDemandLinuxpricing_USDperHour} />
            );
          })} */}
      </ul>

      <Table cloudName="AWS" cost={selectedPrice} Name={selectedName} />
    </div>
  );
};
