import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeAlert } from "../../actions/alert";
import { getCurrentProfile } from "../../actions/profile";
import setAuthToken from "../../utils/setAuthToken";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { page, alerts } = useSelector((state) => state.alert);
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "NibiruDev - Dashboard";

    if (page !== "dashboard") {
      dispatch(removeAlert());
    }
    
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(getCurrentProfile());
  }, [dispatch, page]);

  return (
    <div className="container">
      <h1 className="large text-primary">Dashboard</h1>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} timeout={10} />
        ))}
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
          </p>

          {profile !== null ? (
            <Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </Fragment>
          ) : (
            <Fragment>
              <p>You have no profile yet</p>
              <Link to="create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
