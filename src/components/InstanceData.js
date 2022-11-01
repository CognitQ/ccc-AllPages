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

  const selectedName = filterdata
    .filter((Instance) => Instance.OnDemandLinuxpricing_USDperHour == minCost)
    .slice(0, 1)
    .map((d) => {
      return d.InstanceType;
    });

  props.setData(minCost);
  // const noOfInsancesForCost = () => {
  //   if (props.pods > 110) {
  //     return props.pods / 110;
  //   } else {
  //     return 1;
  //   }
  // };

  // const noOfInstancesPerformance = () => {
  //   if (props.pods > 77) {
  //     return props.pods / 77;
  //   } else {
  //     return 1;
  //   }
  // };

  // const bestCost = minCost * noOfInsancesForCost() * 730;
  // const bestpeformance = minCost * noOfInstancesPerformance() * 730;

  return (
    <div>
      <ul>
        {/* {filterdata
          .filter(
            (Instance) => Instance.OnDemandLinuxpricing_USDperHour === minCost
          )
          .slice(0, 1)
          .map((d) => {
            return (
              <li key={d.id}>
                name = {d.InstanceType}, vcpu = {d.vCPUs}, MemoryInGiB =
                {d.MemoryInGiB} cost ={d.OnDemandLinuxpricing_USDperHour}
              </li>
            );
          })} */}
      </ul>
      <Table
        eksCost={minCost}
        eksName={selectedName}
        gkeCost={minCost}
        gkeName={selectedName}
        aksCost={minCost}
        aksName={selectedName}
        ram={props.ram}
      />

      {/* <Table cloudName="AWS" cost={bestperformance} Name={selectedName} /> */}
    </div>
  );
};
