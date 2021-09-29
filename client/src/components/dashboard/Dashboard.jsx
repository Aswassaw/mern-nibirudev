import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "NibiruDev - Dashboard";

    dispatch(getCurrentProfile());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
