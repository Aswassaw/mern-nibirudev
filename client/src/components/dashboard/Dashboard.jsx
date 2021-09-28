import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "NibiruDev - Dashboard";
  }, []);

  // Redirect if logged in
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
