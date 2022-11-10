import React from "react";

import BuySell from "../components/dashboardPage/buysell/BuySell";

import GraphMaker from "../components/dashboardPage/GraphMaker/GraphMaker";

const Dashboard = () => {
  return (
    <div style={{ width: "100%", alignItems: "center" }}>
      <BuySell />
      {/* <GraphMaker product="IBM" height={300} width={550} /> */}
    </div>
  );
};

export default Dashboard;
