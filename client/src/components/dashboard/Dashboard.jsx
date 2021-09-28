import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "NibiruDev - Dashboard";
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
